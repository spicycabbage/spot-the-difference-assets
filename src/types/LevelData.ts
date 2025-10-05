export type Difference = {
    x: number;
    y: number;
    radius?: number;        // For circles (backward compatibility)
    radiusX?: number;       // For ellipses - X radius
    radiusY?: number;       // For ellipses - Y radius
    rotation?: number;      // For ellipses - rotation angle in degrees (0-360)
  };
  
  export type LevelData = {
    imageLeft: string;
    imageRight: string;
    differences: Difference[];
  };
  