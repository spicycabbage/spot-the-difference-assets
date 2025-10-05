import React from "react";

// Import powerup icons
import timeBoostIcon from "../assets/icons/time-boost.png";
import hintIcon from "../assets/icons/hint.png";
import skipIcon from "../assets/icons/skip.png";
import pauseIcon from "../assets/icons/pause.png";
import storeIcon from "../assets/icons/store.png";

type PowerupBarProps = {
  onPause: () => void;

  onAddTime: () => void;
  onHint: () => void;
  onSkip: () => void;
  onMarketplace: () => void;
  powerups: {
    time: number;
    hints: number;
    skips: number;
  };
  disabled: boolean;
  currentLevel: number;
  timeLeft: number;
  totalScore: number;
  currentLevelScore: number;
  foundDifferences: number;
};

const PowerupBar: React.FC<PowerupBarProps> = ({ 
  onPause, 
  onAddTime,
  onHint, 
  onSkip, 
  onMarketplace,
  powerups,
  disabled,
  currentLevel,
  timeLeft,
  totalScore,
  currentLevelScore,
  foundDifferences
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Mobile layout: Only powerup buttons in right space (NO BLACK BAR)
  if (window.innerWidth <= 768) {
    return (
      <>
        {/* Mobile: Powerup buttons in LEFT WHITE SPACE - NOT COVERING GAME */}
        <div style={{
          position: 'fixed',
          left: '24px', // Restored: 24px to match 80px container shift
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          zIndex: 1000,
          width: '48px' // Smaller buttons
        }}>
          {/* Pause Button */}
          <button 
            onClick={onPause}
            disabled={disabled}
            style={{
              padding: '8px',
              backgroundColor: '#d97706',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <img src={pauseIcon} alt="Pause" style={{ width: '20px', height: '20px' }} />
          </button>

          {/* Time Button */}
          <button 
            onClick={onAddTime}
            disabled={disabled || timeLeft >= 60 || powerups.time === 0}
            style={{
              padding: '8px',
              backgroundColor: '#d97706',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: (disabled || timeLeft >= 60 || powerups.time === 0) ? 'not-allowed' : 'pointer',
              opacity: (disabled || timeLeft >= 60 || powerups.time === 0) ? 0.5 : 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              position: 'relative'
            }}
          >
            <img src={timeBoostIcon} alt="Time" style={{ width: '20px', height: '20px' }} />
            <span style={{ 
              fontSize: '14px', 
              fontWeight: '600',
              marginTop: '2px'
            }}>{powerups.time}</span>
          </button>

          {/* Hint Button */}
          <button 
            onClick={onHint}
            disabled={disabled || powerups.hints === 0}
            style={{
              padding: '8px',
              backgroundColor: '#d97706',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: (disabled || powerups.hints === 0) ? 'not-allowed' : 'pointer',
              opacity: (disabled || powerups.hints === 0) ? 0.5 : 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <img src={hintIcon} alt="Hint" style={{ width: '20px', height: '20px' }} />
            <span style={{ 
              fontSize: '14px', 
              fontWeight: '600',
              marginTop: '2px'
            }}>{powerups.hints}</span>
          </button>

          {/* Skip Button */}
          <button 
            onClick={onSkip}
            disabled={disabled || powerups.skips === 0}
            style={{
              padding: '8px',
              backgroundColor: '#d97706',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: (disabled || powerups.skips === 0) ? 'not-allowed' : 'pointer',
              opacity: (disabled || powerups.skips === 0) ? 0.5 : 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <img src={skipIcon} alt="Skip" style={{ width: '20px', height: '20px' }} />
            <span style={{ 
              fontSize: '14px', 
              fontWeight: '600',
              marginTop: '2px'
            }}>{powerups.skips}</span>
          </button>

          {/* Shop Button */}
          <button 
            onClick={onMarketplace}
            style={{
              padding: '12px',
              backgroundColor: '#d97706',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <img src={storeIcon} alt="Shop" style={{ width: '24px', height: '24px' }} />
          </button>
        </div>
      </>
    );
  }

  // Desktop layout: Original horizontal layout
  return (
    <div style={{
      backgroundColor: '#1f2937',
      color: 'white',
      padding: '12px 16px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      height: '80px',
      borderRadius: '0px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      width: '100%',
      marginTop: '-4px'
    }}>
      {/* Pause Button */}
      <button 
        onClick={onPause}
        disabled={disabled}
        style={{
          padding: '10px 16px',
          backgroundColor: '#d97706',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <img src={pauseIcon} alt="Pause" style={{ width: '16px', height: '16px' }} />
        Pause
      </button>

      {/* Level Display */}
      <div style={{ fontSize: '14px', color: 'white' }}>
        Level {currentLevel}
      </div>

      {/* Score Display */}
      <div style={{ 
        fontSize: '14px', 
        color: '#10b981',
        fontWeight: '600',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        lineHeight: '1.2'
      }}>
        <div style={{ fontSize: '12px', color: '#94a3b8' }}>Points</div>
        <div>{totalScore + currentLevelScore}</div>
      </div>

      {/* Current Level Progress */}
      <div style={{ 
        fontSize: '14px', 
        color: '#f59e0b',
        fontWeight: '600',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        lineHeight: '1.2'
      }}>
        <div style={{ fontSize: '12px', color: '#94a3b8' }}>Found</div>
        <div>{foundDifferences}/5</div>
      </div>

      {/* Timer Display */}
      <div style={{ fontSize: '14px', color: 'white' }}>
        🕐 {formatTime(timeLeft)}
      </div>

      {/* Time Button */}
      <button 
        onClick={onAddTime}
        disabled={disabled || timeLeft >= 60 || powerups.time === 0}
        style={{
          padding: '10px 16px',
          backgroundColor: '#d97706',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: (disabled || timeLeft >= 60 || powerups.time === 0) ? 'not-allowed' : 'pointer',
          opacity: (disabled || timeLeft >= 60 || powerups.time === 0) ? 0.5 : 1,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <img src={timeBoostIcon} alt="Time Boost" style={{ width: '16px', height: '16px' }} />
        Time ({powerups.time})
      </button>

      {/* Hint Button */}
      <button 
        onClick={onHint}
        disabled={disabled || powerups.hints === 0}
        style={{
          padding: '10px 16px',
          backgroundColor: '#d97706',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: (disabled || powerups.hints === 0) ? 'not-allowed' : 'pointer',
          opacity: (disabled || powerups.hints === 0) ? 0.5 : 1,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <img src={hintIcon} alt="Hint" style={{ width: '16px', height: '16px' }} />
        Hint ({powerups.hints})
      </button>

      {/* Skip Button */}
      <button 
        onClick={onSkip}
        disabled={disabled || powerups.skips === 0}
        style={{
          padding: '10px 16px',
          backgroundColor: '#d97706',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: (disabled || powerups.skips === 0) ? 'not-allowed' : 'pointer',
          opacity: (disabled || powerups.skips === 0) ? 0.5 : 1,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <img src={skipIcon} alt="Skip" style={{ width: '16px', height: '16px' }} />
        Skip ({powerups.skips})
      </button>

      {/* Shop Button */}
      <button 
        onClick={onMarketplace}
        style={{
          padding: '10px 16px',
          backgroundColor: '#d97706',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <img src={storeIcon} alt="Shop" style={{ width: '16px', height: '16px' }} />
        Shop
      </button>
    </div>
  );
};

export default PowerupBar;