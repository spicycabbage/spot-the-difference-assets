import React, { useState } from "react";
import { GAME_CONFIG } from "../utils/gameConfig";

interface Props {
  imageUrl: string;
}

interface Dot {
  x: number;
  y: number;
  radius?: number;     // For circles
  radiusX?: number;    // For ellipses - X radius  
  radiusY?: number;    // For ellipses - Y radius
  rotation?: number;   // For ellipses - rotation angle in degrees
}

const DifferenceMarker: React.FC<Props> = ({ imageUrl }) => {
  const [dots, setDots] = useState<Dot[]>([]);
  const [mode, setMode] = useState<'circle' | 'ellipse'>('circle');
  const [ellipseSize, setEllipseSize] = useState({ radiusX: 35, radiusY: 25 });
  const [rotation, setRotation] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    
    // Scale coordinates from display to base coordinates using config
    const { x: scaledX, y: scaledY } = GAME_CONFIG.toBaseCoords(x, y);
    
    let newDot: Dot;
    if (mode === 'circle') {
      newDot = { x: scaledX, y: scaledY, radius: 50 };
    } else {
      newDot = { 
        x: scaledX, 
        y: scaledY, 
        radiusX: ellipseSize.radiusX, 
        radiusY: ellipseSize.radiusY,
        rotation: rotation
      };
    }
    
    setDots((prev) => [...prev, newDot]);
    
    console.log(`Added ${mode} difference at display (${x}, ${y}) -> scaled (${scaledX}, ${scaledY})`);
  };

  const clearDots = () => setDots([]);
  const undoLast = () => setDots(prev => prev.slice(0, -1));
  
  const copyJSON = () => {
    // Format JSON with each coordinate object on a single line
    const formattedJson = '[\n' + 
      dots.map(dot => '  ' + JSON.stringify(dot)).join(',\n') + 
      '\n]';
    navigator.clipboard.writeText(formattedJson);
    alert(`Copied ${dots.length} differences to clipboard!\n\nPaste this into your levels.ts file.`);
  };

  const displayStyle = (dot: Dot, index: number) => {
    // Handle both circle and ellipse display
    const isEllipse = dot.radiusX !== undefined && dot.radiusY !== undefined;
    // Account for mobile container shift - fine-tuned positioning
    const mobileOffsetX = window.innerWidth <= 768 ? -2 : 0;
    // Account for mobile container vertical shift  
    const mobileOffsetY = window.innerWidth <= 768 ? -2 : 0;
    
    if (isEllipse) {
      const displayRadiusX = dot.radiusX! / GAME_CONFIG.scaleX;
      const displayRadiusY = dot.radiusY! / GAME_CONFIG.scaleY;
      const { x: displayX, y: displayY } = GAME_CONFIG.toDisplayCoords(dot.x, dot.y);
      return {
        top: displayY - displayRadiusY + mobileOffsetY,
        left: displayX - displayRadiusX + mobileOffsetX,
        width: displayRadiusX * 2,
        height: displayRadiusY * 2,
        borderRadius: '50%',
        transform: dot.rotation ? `rotate(${dot.rotation}deg)` : undefined,
        transformOrigin: 'center center'
      };
    } else {
      // Circle (backward compatibility) - use consistent scaling to maintain circular shape
      const radius = dot.radius || 50;
      const displayRadius = radius / GAME_CONFIG.scaleX; // Use X scaling for both dimensions to keep circles round
      const { x: displayX, y: displayY } = GAME_CONFIG.toDisplayCoords(dot.x, dot.y);
      return {
        top: displayY - displayRadius + mobileOffsetY,
        left: displayX - displayRadius + mobileOffsetX,
        width: displayRadius * 2,
        height: displayRadius * 2,
        borderRadius: '50%',
      };
    }
  };

  return (
    <div className="p-4">
      {/* Mode Toggle */}
      <div className="mb-4 p-3 bg-gray-100 rounded">
        <div className="flex items-center gap-4 mb-3">
          <label className="font-semibold">Shape Mode:</label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="mode"
              value="circle"
              checked={mode === 'circle'}
              onChange={(e) => setMode('circle')}
            />
            🔵 Circle
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="mode"
              value="ellipse"
              checked={mode === 'ellipse'}
              onChange={(e) => setMode('ellipse')}
            />
            🔵 Ellipse
          </label>
        </div>
        
        {mode === 'ellipse' && (
          <div className="space-y-3">
            <div className="flex items-center gap-4 text-sm">
              <label className="flex items-center gap-2">
                Width:
                <input
                  type="range"
                  min="15"
                  max="80"
                  value={ellipseSize.radiusX}
                  onChange={(e) => setEllipseSize(prev => ({ ...prev, radiusX: parseInt(e.target.value) }))}
                  className="w-20"
                />
                <span className="w-8 text-xs">{ellipseSize.radiusX}</span>
              </label>
              <label className="flex items-center gap-2">
                Height:
                <input
                  type="range"
                  min="15"
                  max="80"
                  value={ellipseSize.radiusY}
                  onChange={(e) => setEllipseSize(prev => ({ ...prev, radiusY: parseInt(e.target.value) }))}
                  className="w-20"
                />
                <span className="w-8 text-xs">{ellipseSize.radiusY}</span>
              </label>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <label className="flex items-center gap-2">
                🔄 Rotation:
                <input
                  type="range"
                  min="0"
                  max="180"
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  className="w-32"
                />
                <span className="w-12 text-xs">{rotation}°</span>
              </label>
              <button 
                onClick={() => setRotation(0)}
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        className="relative inline-block"
        onClick={handleClick}
        style={{ cursor: "crosshair" }}
      >
        <img 
          src={imageUrl} 
          alt="markable" 
          style={{ 
            width: `${GAME_CONFIG.DISPLAY_WIDTH}px`, 
            height: `${GAME_CONFIG.DISPLAY_HEIGHT}px`,
            objectFit: 'cover'
          }}
          draggable={false}
        />
        {dots.map((dot, index) => (
          <div
            key={index}
            className="absolute border-3 border-red-500 bg-red-200 bg-opacity-50 flex items-center justify-center text-white font-bold text-sm"
            style={displayStyle(dot, index)}
          >
            {index + 1}
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        <div className="text-sm text-gray-600">
          Differences marked: <span className="font-bold">{dots.length}/5</span>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <button 
            onClick={copyJSON} 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            disabled={dots.length === 0}
          >
            📋 Copy JSON ({dots.length} differences)
          </button>
          <button 
            onClick={undoLast} 
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
            disabled={dots.length === 0}
          >
            ↶ Undo Last
          </button>
          <button 
            onClick={clearDots} 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            disabled={dots.length === 0}
          >
            🗑️ Clear All
          </button>
        </div>

        {dots.length > 0 && (
          <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
            <div className="font-semibold mb-2">Marked Coordinates:</div>
            {dots.map((dot, index) => (
              <div key={index} className="text-xs font-mono">
                {index + 1}. x: {dot.x}, y: {dot.y}
                {dot.radius !== undefined && `, radius: ${dot.radius}`}
                {dot.radiusX !== undefined && dot.radiusY !== undefined && 
                  `, radiusX: ${dot.radiusX}, radiusY: ${dot.radiusY}`
                }
                {dot.rotation !== undefined && dot.rotation !== 0 && 
                  `, rotation: ${dot.rotation}`
                }
              </div>
            ))}
          </div>
        )}

        {dots.length === 5 && (
          <div className="mt-2 p-3 bg-green-100 border border-green-300 rounded">
            <div className="text-green-800 font-semibold">✅ All 5 differences marked!</div>
            <div className="text-green-700 text-sm">Click "Copy JSON" to get the coordinates for levels.ts</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DifferenceMarker;
