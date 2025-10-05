// Centralized game configuration
export const GAME_CONFIG = {
  // Base coordinate system (what's stored in levels.ts)
  BASE_WIDTH: 800,
  BASE_HEIGHT: 800,
  
  // Display dimensions - responsive based on viewport
  get DISPLAY_WIDTH() {
    // Mobile landscape: EXACT ORIGINAL VALUES (DO NOT CHANGE!)
    if (window.innerWidth < 768 && window.innerWidth > window.innerHeight) {
      // Account for 50px black borders on each side: (1000/2722 ≈ 0.367) where 2722 = 2622 + 100
      const gameImageWidth = window.innerWidth * 0.367;
      return gameImageWidth;
    }
    // Mobile portrait: EXACT ORIGINAL VALUES (DO NOT CHANGE!)
    if (window.innerWidth < 768) {
      const availableHeight = window.innerHeight - 48;
      const maxWidth = window.innerWidth * 0.48;
      const maxByHeight = availableHeight * 0.90;
      return Math.min(maxWidth, maxByHeight);
    }
    return 500; // Desktop unchanged
  },
  get DISPLAY_HEIGHT() {
    // Mobile landscape: EXACT ORIGINAL VALUES (DO NOT CHANGE!)
    if (window.innerWidth < 768 && window.innerWidth > window.innerHeight) {
      // Game image height is ~83% of screen height (1000/1206 ≈ 0.83)
      const gameImageHeight = window.innerHeight * 0.83;
      return gameImageHeight;
    }
    // Mobile portrait: EXACT ORIGINAL VALUES (DO NOT CHANGE!)
    if (window.innerWidth < 768) {
      const availableHeight = window.innerHeight - 48;
      const maxWidth = window.innerWidth * 0.47;
      const maxByHeight = availableHeight * 0.90;
      return Math.min(maxWidth, maxByHeight);
    }
    return 500; // Desktop unchanged
  },
  
  // Calculate scale factors
  get scaleX() {
    return this.BASE_WIDTH / this.DISPLAY_WIDTH;
  },
  
  get scaleY() {
    return this.BASE_HEIGHT / this.DISPLAY_HEIGHT;
  },
  
  // Convert display coordinates to base coordinates
  toBaseCoords(displayX: number, displayY: number) {
    return {
      x: Math.round(displayX * this.scaleX),
      y: Math.round(displayY * this.scaleY)
    };
  },
  
  // Convert base coordinates to display coordinates
  toDisplayCoords(baseX: number, baseY: number) {
    return {
      x: baseX / this.scaleX,
      y: baseY / this.scaleY
    };
  }
}; 