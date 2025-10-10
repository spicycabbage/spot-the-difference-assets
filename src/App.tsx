import React, { useState, useEffect, useRef, useCallback } from "react";
import { levels } from "./data/levels";
import ImageComparison from "./components/ImageComparison";
import PowerupBar from "./components/PowerupBar";

import PauseOverlay from "./components/PauseOverlay";
import PackageSelector from "./components/PackageSelector";
import DifferenceMarker from "./components/DifferenceMarker";
import { GAME_CONFIG } from "./utils/gameConfig";
import { safeAudioManager } from "./utils/SafeAudioManager";
import { preloadImagesInBackground } from "./utils/preloadImage";

type PowerupState = {
  time: number;
  hints: number;
  skips: number;
};

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [foundDifferences, setFoundDifferences] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute
  const [isPaused, setPaused] = useState(false);
  
  const [showStore, setShowStore] = useState(false);
  const [gameState, setGameState] = useState<'playing' | 'completed' | 'failed'>('playing');
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const isMobile = windowSize.width <= 768;
  
  // Debug logging for pause state - disabled for clean mobile experience
  // useEffect(() => {
  //   console.log('Pause state changed:', isPaused);
  // }, [isPaused]);

  // Play boom sound when game fails
  useEffect(() => {
    if (gameState === 'failed') {
      safeAudioManager.playAudio('boom');
    }
  }, [gameState]);
  // Load powerups from localStorage or use defaults
  const [powerups, setPowerups] = useState<PowerupState>(() => {
    const saved = localStorage.getItem('gamePowerups');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load saved powerups:', e);
      }
    }
    return {
      time: 3,
      hints: 2,
      skips: 1
    };
  });

  // Check for payment success on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    if (sessionId) {
      // Claim powerups from backend using session ID
      const API_URL = process.env.REACT_APP_PAYMENT_SERVER_URL || 'http://localhost:3001';
      fetch(`${API_URL}/claim-powerups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId })
      })
        .then(res => res.json())
        .then(data => {
          if (data.powerups) {
            setPowerups(prev => ({
              time: prev.time + data.powerups.time,
              hints: prev.hints + data.powerups.hints,
              skips: prev.skips + data.powerups.skips
            }));
            alert(`🎉 Payment successful! You received:\n⏰ +${data.powerups.time} Time Boosts\n💡 +${data.powerups.hints} Hints\n⏭️ +${data.powerups.skips} Skips`);
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        })
        .catch(err => console.error('Failed to claim powerups:', err));
    }

    const paymentStatus = urlParams.get('payment');
    if (paymentStatus === 'success') {
      const packageType = urlParams.get('package');

      // Legacy payment success handling (kept for backwards compatibility)
      let powerupsToAdd = { time: 0, hints: 0, skips: 0 };

      switch(packageType) {
        case 'casual':
          powerupsToAdd = { time: 5, hints: 2, skips: 0 };
          break;
        case 'super':
          powerupsToAdd = { time: 25, hints: 15, skips: 1 };
          break;
        case 'leader':
          powerupsToAdd = { time: 100, hints: 80, skips: 7 };
          break;
      }

      // Add to existing powerups
      setPowerups((prev: PowerupState) => ({
        time: prev.time + powerupsToAdd.time,
        hints: prev.hints + powerupsToAdd.hints,
        skips: prev.skips + powerupsToAdd.skips
      }));

      // Show success message
      alert(`Payment successful! Added: ${powerupsToAdd.time} Time Boosts, ${powerupsToAdd.hints} Hints, ${powerupsToAdd.skips} Skips`);

      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (paymentStatus === 'cancel') {
      alert('Payment was cancelled.');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [setPowerups]);

  // Save powerups whenever they change
  useEffect(() => {
    localStorage.setItem('gamePowerups', JSON.stringify(powerups));
  }, [powerups]);

  // Preload upcoming levels for faster loading
  useEffect(() => {
    if (!gameStarted) return;

    // Preload next 3 levels in background
    const levelsToPreload = [];
    for (let i = 1; i <= 3; i++) {
      const nextLevel = currentLevel + i;
      if (nextLevel < levels.length) {
        levelsToPreload.push(levels[nextLevel].imageLeft);
        levelsToPreload.push(levels[nextLevel].imageRight);
      }
    }

    if (levelsToPreload.length > 0) {
      console.log(`Preloading ${levelsToPreload.length} images for upcoming levels...`);
      preloadImagesInBackground(levelsToPreload);
    }
  }, [currentLevel, gameStarted]);

  const [useMarkerTool, setUseMarkerTool] = useState(false); // Disabled - coordinates complete // Toggle between marker and game
  // Load total score from localStorage
  const [totalScore, setTotalScore] = useState(() => {
    const saved = localStorage.getItem('totalScore');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Save score whenever it changes
  useEffect(() => {
    localStorage.setItem('totalScore', totalScore.toString());
  }, [totalScore]);
  const [lastLevelScore, setLastLevelScore] = useState({ differences: 0, timeBonus: 0, total: 0 });

  // Audio refs for SafeAudioManager
  const audioRef = useRef<HTMLAudioElement>(null);
  const successAudioRef = useRef<HTMLAudioElement>(null);
  const boomAudioRef = useRef<HTMLAudioElement>(null);
  const wrongAudioRef = useRef<HTMLAudioElement>(null);

  // Register audio elements with SafeAudioManager
  useEffect(() => {
    // Add a small delay to ensure audio elements are loaded
    const registerAudio = () => {
      console.log('Registering audio elements...');
      if (successAudioRef.current) {
        safeAudioManager.registerAudio('success', successAudioRef.current);
        console.log('Registered success audio');
      }
      if (boomAudioRef.current) {
        safeAudioManager.registerAudio('boom', boomAudioRef.current);
        console.log('Registered boom audio');
      }
      if (wrongAudioRef.current) {
        safeAudioManager.registerAudio('wrong', wrongAudioRef.current);
        console.log('Registered wrong audio');
      }
      if (audioRef.current) {
        safeAudioManager.registerAudio('beep', audioRef.current);
        console.log('Registered beep audio');
      }
      console.log('Audio manager status:', safeAudioManager.getStatus());
    };

    // Register immediately and also after a short delay
    registerAudio();
    setTimeout(registerAudio, 100);
  }, []);

  const nextLevel = useCallback(() => {
    if (currentLevel < levels.length - 1) {
      // Calculate level score: 10 points per difference + 1 point per second left
      const differencePoints = foundDifferences.length * 10;
      const timeBonus = timeLeft;
      const levelScore = differencePoints + timeBonus;
      
      // console.log(`Level completed! Differences: ${foundDifferences.length} × 10 = ${differencePoints}, Time bonus: ${timeBonus}, Total level score: ${levelScore}`);
      
      // Store level score breakdown for modal display
      setLastLevelScore({
        differences: differencePoints,
        timeBonus: timeBonus,
        total: levelScore
      });
      
      setTotalScore(prev => prev + levelScore);
      setCurrentLevel(prev => prev + 1);
      setFoundDifferences([]);
      setTimeLeft(60);
      setGameState('playing');
    }
  }, [currentLevel, foundDifferences.length, timeLeft]);

  // Timer logic
  useEffect(() => {
    if (isPaused || gameState !== 'playing' || showStore || useMarkerTool) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('failed');
          return 0;
        }

        // Beep twice when 5 seconds left
        if (prev === 6) {
          safeAudioManager.playAudio('beep');
          setTimeout(() => {
            safeAudioManager.playAudio('beep');
          }, 200);
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, gameState, showStore, useMarkerTool]);

  // Check for level completion
  useEffect(() => {
    if (foundDifferences.length === 5 && gameState === 'playing') {
      setGameState('completed');
      setTimeout(() => {
        nextLevel();
      }, 2000);
    }
  }, [foundDifferences, gameState, nextLevel]);

  const handleDifferenceFound = (index: number) => {
    if (!foundDifferences.includes(index)) {
      setFoundDifferences(prev => [...prev, index]);
      // Play success sound - use direct audio as fallback
      console.log('Playing success sound for difference found');
      if (successAudioRef.current) {
        successAudioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
    }
  };

  const handleWrongClick = () => {
    // Subtract 5 seconds from timer (minimum 0)
    setTimeLeft(prev => Math.max(0, prev - 5));
    // Play wrong sound - use direct audio as fallback
    console.log('Playing wrong sound for incorrect click');
    if (wrongAudioRef.current) {
      wrongAudioRef.current.play().catch(e => console.log('Wrong audio play failed:', e));
    }
  };



  const addTime = () => {
    if (powerups.time > 0) {
      setTimeLeft(prev => Math.min(prev + 15, 60));
      setPowerups((prev: PowerupState) => ({ ...prev, time: prev.time - 1 }));
    }
  };

  const useHint = () => {
    if (powerups.hints > 0 && foundDifferences.length < 5) {
      // Find next unfound difference
      const unfound = levels[currentLevel].differences.findIndex((_, i) => !foundDifferences.includes(i));
      if (unfound !== -1) {
        handleDifferenceFound(unfound);
        setPowerups((prev: PowerupState) => ({ ...prev, hints: prev.hints - 1 }));
      }
    }
  };

  const skipLevel = () => {
    if (powerups.skips > 0) {
      setPowerups((prev: PowerupState) => ({ ...prev, skips: prev.skips - 1 }));
      nextLevel();
    }
  };

  const restartLevel = () => {
    setFoundDifferences([]);
    setTimeLeft(60);
    setGameState('playing');
    setCurrentLevel(0); // Reset to level 1 (index 0)
    setTotalScore(0); // Reset total score to 0
    setLastLevelScore({ differences: 0, timeBonus: 0, total: 0 }); // Reset level score
  };

  const handleStorePurchaseComplete = (purchasedPowerups: { time: number; hints: number; skips: number }) => {
    setPowerups((prev: PowerupState) => ({
      time: prev.time + purchasedPowerups.time,
      hints: prev.hints + purchasedPowerups.hints,
      skips: prev.skips + purchasedPowerups.skips
    }));
    
    // Show success message
    // console.log('Powerups purchased successfully:', purchasedPowerups);
  };

  // Start game (audio initializes on user interaction)
  const startGame = () => {
    setGameStarted(true);
  };

  const level = levels[currentLevel];

  // Coordinate Marker Tool View - DISABLED (coordinates complete)
  // Uncomment this entire section to re-enable the marker tool
  /*
  if (useMarkerTool) {
    return (
      <div className="min-h-screen bg-gray-100">
        <button
          onClick={() => setUseMarkerTool(!useMarkerTool)}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 10001,
            padding: '12px 20px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          🎮 Game Mode
        </button>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Coordinate Marker Tool - Level {currentLevel + 1}</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentLevel(Math.max(0, currentLevel - 1))}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={currentLevel === 0}
              >
                ← Previous Level
              </button>
              <button
                onClick={() => setCurrentLevel(Math.min(levels.length - 1, currentLevel + 1))}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={currentLevel === levels.length - 1}
              >
                Next Level →
              </button>
            </div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '40px'
          }}>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-center">Original Image</h3>
              <DifferenceMarker imageUrl={level.imageLeft} existingCoordinates={level.differences} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-center">Modified Image (Mark differences here)</h3>
              <DifferenceMarker imageUrl={level.imageRight} existingCoordinates={level.differences} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  */

  return (
    <>
    <div className="min-h-screen bg-white relative">
              {/* Toggle Switch - DISABLED (coordinates complete) - uncomment to re-enable */}
        {/* 
        <button
          onClick={() => setUseMarkerTool(!useMarkerTool)}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 10001,
            padding: '12px 20px',
            backgroundColor: useMarkerTool ? '#10b981' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {useMarkerTool ? '🎮 Game Mode' : '🔧 Marker Tool'}
        </button>
        */}
      <audio ref={audioRef} src="/beep.mp3" preload="auto" />
      <audio ref={successAudioRef} src="/success.mp3" preload="auto" />
      <audio ref={boomAudioRef} src="/boom.mp3" preload="auto" />
      <audio ref={wrongAudioRef} src="/wrong.mp3" preload="auto" />
      
      {/* Temporary audio test button */}
      {/* Start Game Overlay */}
      {!gameStarted && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10000,
          gap: '20px'
        }}>
          <h1 style={{
            color: 'white',
            fontSize: isMobile ? '32px' : '48px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            🔍 Spot the Difference 🔍
          </h1>
          <button
            onClick={startGame}
            style={{
              padding: isMobile ? '16px 48px' : '20px 60px',
              fontSize: isMobile ? '24px' : '32px',
              fontWeight: 'bold',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 8px 16px rgba(16, 185, 129, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.backgroundColor = '#059669';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = '#10b981';
            }}
          >
            START GAME
          </button>
        </div>
      )}

      {/* Switch to marker tool button - hidden for clean UI */}
      {false && process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setUseMarkerTool(true)}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            🎯 Coordinate Marker
          </button>
        </div>
      )}



      {/* Main game container - NO SCROLLING */}
      <div 
        style={{ 
          height: '100dvh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: isMobile ? '8px' : '16px',
          paddingRight: isMobile ? '8px' : '16px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >


        <div style={{ 
          width: '100%',
          maxWidth: isMobile ? '100%' : '1024px',
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0px',
          boxShadow: isMobile ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.1)',
          borderRadius: isMobile ? '0px' : '12px',
          overflow: 'hidden',
          margin: '0 auto',
          marginLeft: isMobile ? '80px' : 'auto' // Restored: 80px shift as requested
        }}>
          {/* Images - EXACT SAME POSITION AS BEFORE */}
          <ImageComparison
            level={level}
            found={foundDifferences}
            onFind={handleDifferenceFound}
            onWrongClick={handleWrongClick}
            timeLeft={timeLeft}
            isPaused={isPaused || showStore}
          />



          {/* Mobile: Black info bar at bottom */}
          {isMobile && (
            <div style={{
              backgroundColor: '#1f2937',
              color: 'white',
              padding: '2px 8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '12px',
              width: `${GAME_CONFIG.DISPLAY_WIDTH * 2 + 6}px`, // Game width + 6px extension on right
              fontSize: '10px',
              borderRadius: '0 0 6px 6px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginLeft: '0px' // Stays aligned with game images (container already shifted)
            }}>
              <span style={{ fontWeight: '600' }}>Lvl {currentLevel + 1}</span>
              <span style={{ color: '#10b981', fontWeight: '600' }}>{totalScore}</span>
              <span style={{ color: '#f59e0b', fontWeight: '600' }}>{foundDifferences.length}/5</span>
              <span style={{ 
                color: timeLeft <= 10 ? '#ef4444' : '#ffffff',
                fontWeight: '600'
              }}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          )}

          {/* PowerupBar - only desktop, mobile uses left-side buttons */}
          {!isMobile && (
            <PowerupBar
              onPause={() => setPaused(true)}
              onAddTime={addTime}
              onHint={useHint}
              onSkip={skipLevel}
                              onMarketplace={() => setShowStore(true)}
              powerups={powerups}
              disabled={gameState !== 'playing'}
              currentLevel={currentLevel + 1}
              timeLeft={timeLeft}
              totalScore={totalScore}
              currentLevelScore={foundDifferences.length * 10 + timeLeft}
              foundDifferences={foundDifferences.length}
            />
          )}

          {/* Mobile: Fixed powerup buttons on left */}
          {isMobile && (
            <PowerupBar
              onPause={() => setPaused(true)}
              onAddTime={addTime}
              onHint={useHint}
              onSkip={skipLevel}
                              onMarketplace={() => setShowStore(true)}
              powerups={powerups}
              disabled={gameState !== 'playing'}
              currentLevel={currentLevel + 1}
              timeLeft={timeLeft}
              totalScore={totalScore}
              currentLevelScore={foundDifferences.length * 10 + timeLeft}
              foundDifferences={foundDifferences.length}
            />
          )}
        </div>
      </div>

      {/* PROPER FULL SCREEN MODALS */}
      {gameState === 'completed' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center',
            maxWidth: '90%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#16a34a', marginBottom: '16px' }}>Level Complete! 🎉</h2>
            <p style={{ fontSize: '18px' }}>Moving to next level...</p>
          </div>
        </div>
      )}

      {gameState === 'failed' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center',
            maxWidth: '90%',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#dc2626', marginBottom: '16px' }}>GAME OVER ⏰</h2>
            <p style={{ fontSize: '18px', marginBottom: '24px' }}>Time's up! Better luck next time.</p>
            <button
              onClick={restartLevel}
              style={{
                padding: '12px 24px',
                fontSize: '18px',
                backgroundColor: '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                minHeight: '44px'
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Pause Overlay */}
      {isPaused && <PauseOverlay onResume={() => setPaused(false)} />}
    </div>
    
    {/* Package Selector - Outside main container for proper modal overlay */}
    {showStore && (
      <PackageSelector
        onClose={() => setShowStore(false)}
        onPurchaseComplete={handleStorePurchaseComplete}
        currentPowerups={powerups}
      />
    )}
    </>
  );
}

export default App;