import React, { useState, useEffect } from "react";
import { LevelData, Difference } from "../types/LevelData";
import { GAME_CONFIG } from "../utils/gameConfig";

type Props = {
  level: LevelData;
  found: number[];
  onFind: (index: number) => void;
  onWrongClick: () => void;
  timeLeft: number;
  isPaused: boolean;
};

const ImageComparison: React.FC<Props> = ({ level, found, onFind, onWrongClick, timeLeft, isPaused }) => {
  const [showDebugMode, setShowDebugMode] = useState(false);
  const [revealAll, setRevealAll] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({ left: false, right: false });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Reset image loaded state when level changes
  useEffect(() => {
    setImagesLoaded({ left: false, right: false });
  }, [level]);

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
  
  const totalTime = 60; // 1 minute
  const progress = timeLeft / totalTime;
  
  // Keyboard shortcuts for development - DISABLED
  // useEffect(() => {
  //   const handleKeyPress = (e: KeyboardEvent) => {
  //     if (e.key === 'D' || e.key === 'd') {
  //       setShowDebugMode(prev => !prev);
  //     }
  //     if (e.key === 'R' || e.key === 'r') {
  //       setRevealAll(prev => !prev);
  //     }
  //     if (e.key === 'H' || e.key === 'h') {
  //       // Find and reveal next unfound difference
  //       const unfound = level.differences.findIndex((_, i) => !found.includes(i));
  //       if (unfound !== -1) {
  //         onFind(unfound);
  //       }
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyPress);
  //   return () => window.removeEventListener('keydown', handleKeyPress);
  // }, [found, level.differences, onFind]);
  
  const isClickInDifference = (diff: Difference, scaledX: number, scaledY: number): boolean => {
    // Check if it's an ellipse or circle
    if (diff.radiusX !== undefined && diff.radiusY !== undefined) {
      const rotation = diff.rotation || 0;
      
      if (rotation === 0) {
        // No rotation - simple ellipse formula
        const dx = (scaledX - diff.x) / diff.radiusX;
        const dy = (scaledY - diff.y) / diff.radiusY;
        return (dx * dx + dy * dy) <= 1;
      } else {
        // Rotated ellipse - rotate click point by negative angle around ellipse center
        const angleRad = (-rotation * Math.PI) / 180; // Convert to radians and negate
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        
        // Translate click point relative to ellipse center
        const dx = scaledX - diff.x;
        const dy = scaledY - diff.y;
        
        // Rotate click point by negative angle
        const rotatedX = dx * cos - dy * sin;
        const rotatedY = dx * sin + dy * cos;
        
        // Check if rotated point is inside axis-aligned ellipse
        const normalizedX = rotatedX / diff.radiusX;
        const normalizedY = rotatedY / diff.radiusY;
        return (normalizedX * normalizedX + normalizedY * normalizedY) <= 1;
      }
    } else {
      // Circle (backward compatibility)
      const radius = diff.radius || 50;
      const dist = Math.sqrt((diff.x - scaledX) ** 2 + (diff.y - scaledY) ** 2);
      return dist <= radius;
    }
  };

  const getDifferenceStyle = (diff: Difference) => {
    // Account for mobile container shift - fine-tuned positioning
    const mobileOffsetX = isMobile ? -2 : 0;
    // Account for mobile container vertical shift
    const mobileOffsetY = isMobile ? -2 : 0;
    
    if (diff.radiusX !== undefined && diff.radiusY !== undefined) {
      // Ellipse
      const { x: displayX, y: displayY } = GAME_CONFIG.toDisplayCoords(diff.x, diff.y);
      const displayRadiusX = diff.radiusX / GAME_CONFIG.scaleX;
      const displayRadiusY = diff.radiusY / GAME_CONFIG.scaleY;
      const style = {
        left: displayX - displayRadiusX + mobileOffsetX,
        top: displayY - displayRadiusY + mobileOffsetY,
        width: displayRadiusX * 2,
        height: displayRadiusY * 2,
        borderRadius: '50%'
      };
      
      // Add rotation if specified
      if (diff.rotation && diff.rotation !== 0) {
        return {
          ...style,
          transform: `rotate(${diff.rotation}deg)`,
          transformOrigin: 'center center'
        };
      }
      
      return style;
    } else {
      // Circle (backward compatibility) - use consistent scaling to maintain circular shape
      const radius = diff.radius || 50;
      const displayRadius = radius / GAME_CONFIG.scaleX; // Use X scaling for both dimensions to keep circles round
      const { x: displayX, y: displayY } = GAME_CONFIG.toDisplayCoords(diff.x, diff.y);
      return {
        left: displayX - displayRadius + mobileOffsetX,
        top: displayY - displayRadius + mobileOffsetY,
        width: displayRadius * 2,
        height: displayRadius * 2,
        borderRadius: '50%'
      };
    }
  };
  
  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    // Don't process clicks if game is paused
    if (isPaused) {
      // console.log('Game is paused, ignoring click');
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Account for mobile layout offsets to match visual markers
    if (isMobile) {
      // The mobile layout has 88px total left offset (80px margin + 8px padding)
      // But we need to subtract this from click coordinates since the rect.left already includes the container position
      // The 5px offset in DifferenceMarker is to compensate for additional mobile layout shifts
      x = x - 5; // Match the mobile offset used in DifferenceMarker.tsx
    }

    // Convert click coordinates to original image coordinates using config
    const { x: scaledX, y: scaledY } = GAME_CONFIG.toBaseCoords(x, y);

    console.log(`Mobile click - Raw: (${e.clientX - rect.left}, ${y}) -> Adjusted: (${x}, ${y}) -> Scaled: (${scaledX}, ${scaledY})`);
    console.log(`Display size: ${GAME_CONFIG.DISPLAY_WIDTH}x${GAME_CONFIG.DISPLAY_HEIGHT}, Scale: ${GAME_CONFIG.scaleX}x${GAME_CONFIG.scaleY}`);

    // Find if the click matches a difference
    let foundAnyDifference = false;
    
    level.differences.forEach((diff: Difference, i: number) => {
      const isInside = isClickInDifference(diff, scaledX, scaledY);
      // Debug info for development (commented out for production)
      // const shapeInfo = diff.radiusX !== undefined && diff.radiusY !== undefined 
      //   ? `ellipse (${diff.radiusX}x${diff.radiusY}${diff.rotation ? ` @ ${diff.rotation}°` : ''})`
      //   : `circle (r=${diff.radius || 35})`;
      // console.log(`Difference ${i} at (${diff.x}, ${diff.y}), ${shapeInfo}, inside: ${isInside}`);
      
      if (isInside && !found.includes(i)) {
        console.log(`Found difference ${i}! Calling onFind...`);
        onFind(i);
        foundAnyDifference = true;
      } else if (isInside && found.includes(i)) {
        // Already found this difference, don't count as wrong
        foundAnyDifference = true;
      }
    });

    // If no difference was found, it's a wrong click
    if (!foundAnyDifference) {
      // console.log('Wrong click - no difference found at this location');
      onWrongClick();
    }
  };
  
  return (
    <div style={{ 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'transparent',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: '0px',
      margin: '0px'
    }}>
      
      {/* Development Controls - hidden for clean mobile UI */}
      {false && process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '10px',
          borderRadius: '8px',
          fontSize: '12px',
          zIndex: 1000,
          fontFamily: 'monospace'
        }}>
          <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>🔧 DEV TOOLS</div>
          <div>Press 'D' - Debug Mode: {showDebugMode ? '✅' : '❌'}</div>
          <div>Press 'R' - Reveal All: {revealAll ? '✅' : '❌'}</div>
          <div>Press 'H' - Hint (reveal next)</div>
          <div style={{ marginTop: '8px', fontSize: '10px', opacity: 0.8 }}>
            Found: {found.length}/5 differences
          </div>
          <div style={{ marginTop: '4px', fontSize: '10px', color: '#fbbf24' }}>
            💡 Use Coordinate Marker to fix bad coordinates
          </div>
        </div>
      )}
      
      {/* Game Container */}
      <div style={{ 
        maxWidth: isMobile ? 'none' : '1280px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '0px',
        width: '100%'
      }}>
        
        {/* Images Section */}
        <div style={{ 
          display: 'flex',
          justifyContent: 'flex-start', // LEFT ALIGN - no center
          alignItems: 'center',
                  gap: isMobile && windowSize.width > windowSize.height ? '0px' :
        isMobile ? '4px' : '0px',
        width: '100%',
        height: isMobile && windowSize.width > windowSize.height ? `${windowSize.height * 0.83}px` : 'auto',
          position: 'relative'
        }}>
        
          {/* Left Image */}
          <div style={{ 
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0,
            backgroundColor: '#1f2937'
          }}>
            {!imagesLoaded.left && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${GAME_CONFIG.DISPLAY_WIDTH}px`,
                height: `${GAME_CONFIG.DISPLAY_HEIGHT}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1f2937',
                color: '#9ca3af',
                fontSize: '14px',
                zIndex: 1
              }}>
                Loading...
              </div>
            )}
            <img 
              src={level.imageLeft} 
              alt="Original" 
              style={{ 
                width: `${GAME_CONFIG.DISPLAY_WIDTH}px`, 
                height: `${GAME_CONFIG.DISPLAY_HEIGHT}px`, 
                objectFit: 'cover', 
                cursor: 'crosshair',
                display: 'block',
                opacity: imagesLoaded.left ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }}
              onLoad={() => setImagesLoaded(prev => ({ ...prev, left: true }))}
              onClick={handleImageClick}
          />
          
          {/* Show red circles/ellipses for found differences on left image */}
          {level.differences.map((diff: Difference, i: number) =>
            (found.includes(i) || revealAll) ? (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  border: '3px solid #ef4444',
                  backgroundColor: revealAll && !found.includes(i) 
                    ? 'rgba(255, 255, 0, 0.5)' // Yellow for revealed but not found
                    : 'rgba(239, 68, 68, 0.3)', // Red for found
                  pointerEvents: 'none',
                  ...getDifferenceStyle(diff),
                  animation: revealAll && !found.includes(i) ? 'pulse 1s infinite' : undefined
                }}
              />
            ) : null
          )}
          
          {/* Enhanced Debug Mode - Show all differences with numbers */}
          {showDebugMode && level.differences.map((diff: Difference, i: number) =>
            !found.includes(i) && !revealAll ? (
              <div
                key={`debug-left-${i}`}
                style={{
                  position: 'absolute',
                  border: '3px solid #3b82f6',
                  backgroundColor: 'rgba(59, 130, 246, 0.4)',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  color: 'white',
                  textShadow: '1px 1px 2px black',
                  animation: 'pulse 2s infinite',
                  ...getDifferenceStyle(diff)
                }}
                title={`Difference ${i + 1} at (${diff.x}, ${diff.y})`}
              >
                {i + 1}
              </div>
            ) : null
          )}
        </div>

          {/* Simple Timer Bar */}
          <div style={{ 
            width: '24px',
            height: `${GAME_CONFIG.DISPLAY_HEIGHT + 1}px`,
            backgroundColor: '#374151',
            position: 'relative',
            borderRadius: '0px',
            flexShrink: 0
          }}>
            {/* Timer fill */}
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              height: `${progress * 100}%`,
              backgroundColor: progress > 0.25 ? '#10b981' : '#ef4444',
              transition: 'height 0.3s ease, background-color 0.5s ease'
            }} />
            
            {/* Timer text */}
            <div style={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(-90deg)',
              fontSize: '11px',
              fontWeight: '600',
              color: 'white',
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              whiteSpace: 'nowrap'
            }}>
              {Math.ceil(timeLeft)}s
            </div>
          </div>

          {/* Right Image */}
          <div style={{ 
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0,
            backgroundColor: '#1f2937'
          }}>
            {!imagesLoaded.right && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${GAME_CONFIG.DISPLAY_WIDTH}px`,
                height: `${GAME_CONFIG.DISPLAY_HEIGHT}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1f2937',
                color: '#9ca3af',
                fontSize: '14px',
                zIndex: 1
              }}>
                Loading...
              </div>
            )}
            <img
              src={level.imageRight}
              alt="Altered"
              style={{ 
                width: `${GAME_CONFIG.DISPLAY_WIDTH}px`, 
                height: `${GAME_CONFIG.DISPLAY_HEIGHT}px`, 
                objectFit: 'cover', 
                cursor: 'crosshair',
                display: 'block',
                opacity: imagesLoaded.right ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }}
              onLoad={() => setImagesLoaded(prev => ({ ...prev, right: true }))}
              onClick={handleImageClick}
          />
          
          {/* Show red circles/ellipses for found differences on right image */}
          {level.differences.map((diff: Difference, i: number) =>
            (found.includes(i) || revealAll) ? (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  border: '3px solid #ef4444',
                  backgroundColor: revealAll && !found.includes(i) 
                    ? 'rgba(255, 255, 0, 0.5)' // Yellow for revealed but not found
                    : 'rgba(239, 68, 68, 0.3)', // Red for found
                  pointerEvents: 'none',
                  ...getDifferenceStyle(diff),
                  animation: revealAll && !found.includes(i) ? 'pulse 1s infinite' : undefined
                }}
              />
            ) : null
          )}
          
          {/* Enhanced Debug Mode - Show all differences with numbers */}
          {showDebugMode && level.differences.map((diff: Difference, i: number) =>
            !found.includes(i) && !revealAll ? (
              <div
                key={`debug-right-${i}`}
                style={{
                  position: 'absolute',
                  border: '3px solid #3b82f6',
                  backgroundColor: 'rgba(59, 130, 246, 0.4)',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  color: 'white',
                  textShadow: '1px 1px 2px black',
                  animation: 'pulse 2s infinite',
                  ...getDifferenceStyle(diff)
                }}
                title={`Difference ${i + 1} at (${diff.x}, ${diff.y})`}
              >
                {i + 1}
              </div>
            ) : null
          )}
        </div>
        </div> {/* End Images Section */}
        
      </div> {/* End Game Container */}
    </div>
  );
};

export default ImageComparison;