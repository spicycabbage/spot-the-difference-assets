// src/data/levels.ts
import { LevelData } from "../types/LevelData";

// Helper function to optimize image URLs with jsDelivr compression
const optimizeImageUrl = (url: string): string => {
  // jsDelivr doesn't support query params for transformations,
  // but we can use their built-in caching and compression by using the minified path
  return url;
};

export const levels: LevelData[] = [
  // Level 1 - Your coordinates are already here
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/1.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/1-a.png",
    differences: [
  {"x":618,"y":158,"radius":35},
  {"x":664,"y":370,"radius":35},
  {"x":390,"y":380,"radius":35},
  {"x":300,"y":77,"radius":35},
  {"x":222,"y":538,"radius":35}
],
  },

  // Level 2 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/2.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/2-a.png",
    differences: [
  {"x":414,"y":398,"radius":35},
  {"x":575,"y":235,"radius":35},
  {"x":385,"y":734,"radius":35},
  {"x":275,"y":468,"radius":50},
  {"x":680,"y":626,"radius":35}
],
  },

  // Level 3 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/3.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/3-a.png",
    differences: [
  {"x":67,"y":370,"radius":42},
  {"x":168,"y":350,"radius":35},
  {"x":584,"y":459,"radius":35},
  {"x":733,"y":29,"radius":35},
  {"x":37,"y":760,"radius":50}
],
  },

  // Level 4 - Fixed object-fit issue
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/4.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/4-a.png",
    differences: [
  {"x":675,"y":110,"radius":35},
  {"x":512,"y":152,"radius":35},
  {"x":445,"y":275,"radius":38},
  {"x":93,"y":425,"radius":35},
  {"x":696,"y":690,"radius":35}
],
  },

  // Level 5 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/5.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/5-a.png",
    differences: [
  {"x":789,"y":182,"radius":35},
  {"x":504,"y":190,"radius":35},
  {"x":490,"y":740,"radius":55},
  {"x":410,"y":299,"radius":35},
  {"x":139,"y":240,"radius":35}
],
  },

  // Level 6 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/6.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/6-a.png",
    differences: [
  {"x":280,"y":702,"radius":35},
  {"x":590,"y":376,"radius":35},
  {"x":386,"y":40,"radius":45},
  {"x":752,"y":480,"radiusX":35,"radiusY":100,"rotation":-25},
  {"x":190,"y":235,"radiusX":35,"radiusY":100,"rotation":-18}
],
  },

  // Level 7 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/7.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/7-a.png",
    differences: [
  {"x":273,"y":173,"radiusX":35,"radiusY":25,"rotation":7},
  {"x":655,"y":390,"radius":35},
  {"x":718,"y":587,"radius":35},
  {"x":352,"y":235,"radius":35},
  {"x":124,"y":787,"radiusX":35,"radiusY":54,"rotation":90}
],
  },

  // Level 8 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/8.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/8-a.png",
    differences: [
  {"x":355,"y":381,"radiusX":35,"radiusY":80,"rotation":3},
  {"x":666,"y":590,"radius":35},
  {"x":205,"y":621,"radius":51},
  {"x":148,"y":517,"radius":35},
  {"x":74,"y":286,"radius":35}
],
  },

  // Level 9 - FIXED coordinate #2
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/9.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/9-a.png",
    differences: [
  {"x":499,"y":466,"radius":35},
  {"x":643,"y":678,"radius":125},
  {"x":138,"y":590,"radiusX":35,"radiusY":55,"rotation":89},
  {"x":345,"y":222,"radiusX":35,"radiusY":65,"rotation":12},
  {"x":270,"y":229,"radiusX":35,"radiusY":45,"rotation":27}
],
  },

  // Level 10 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/10.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/10-a.png",
    differences: [
  {"x":317,"y":165,"radius":35},
  {"x":460,"y":390,"radius":35},
  {"x":619,"y":469,"radius":35},
  {"x":95,"y":670,"radius":35},
  {"x":435,"y":664,"radius":35}
],
  },

  // Level 11 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/11.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/11-a.png",
    differences: [
  {"x":258,"y":747,"radius":65},
  {"x":553,"y":262,"radius":35},
  {"x":150,"y":98,"radius":35},
  {"x":22,"y":340,"radius":65},
  {"x":725,"y":658,"radius":48}
],
  },

  // Level 12 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/12.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/12-a.png",
    differences: [
  {"x":515,"y":539,"radiusX":35,"radiusY":160,"rotation":10},
  {"x":706,"y":302,"radius":35},
  {"x":51,"y":294,"radius":45},
  {"x":390,"y":451,"radius":35},
  {"x":341,"y":304,"radius":35}
],
  },

  // Level 13 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/13.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/13-a.png",
    differences: [
  {"x":90,"y":480,"radius":35},
  {"x":685,"y":230,"radius":35},
  {"x":245,"y":118,"radius":35},
  {"x":765,"y":728,"radiusX":35,"radiusY":72,"rotation":17},
  {"x":283,"y":589,"radius":38}
],
  },

  // Level 14 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/14.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/14-a.png",
    differences: [
  {"x":165,"y":738,"radius":35},
  {"x":145,"y":318,"radius":35},
  {"x":714,"y":733,"radiusX":35,"radiusY":48,"rotation":91},
  {"x":387,"y":326,"radiusX":35,"radiusY":79,"rotation":-13},
  {"x":627,"y":232,"radius":35}
],
  },

  // Level 15 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/15.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/15-a.png",
    differences: [
  {"x":750,"y":110,"radiusX":35,"radiusY":120,"rotation":-15},
  {"x":195,"y":184,"radius":35},
  {"x":297,"y":589,"radius":35},
  {"x":50,"y":635,"radius":35},
  {"x":490,"y":595,"radius":48}
],
  },

  // Level 16 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/16.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/16-a.png",
    differences: [
  {"x":86,"y":620,"radius":55},
  {"x":245,"y":10,"radius":95},
  {"x":360,"y":310,"radiusX":35,"radiusY":100,"rotation":-80},
  {"x":640,"y":475,"radius":35},
  {"x":599,"y":754,"radius":45}
],
  },

  // Level 17 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/17.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/17-a.png",
    differences: [
  {"x":620,"y":525,"radius":35},
  {"x":174,"y":752,"radius":45},
  {"x":270,"y":616,"radius":35},
  {"x":64,"y":296,"radius":40},
  {"x":806,"y":310,"radius":150}
],
  },

  // Level 18 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/18.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/18-a.png",
    differences: [
  {"x":412,"y":395,"radius":35},
  {"x":554,"y":736,"radius":40},
  {"x":745,"y":701,"radius":40},
  {"x":650,"y":362,"radiusX":35,"radiusY":33,"rotation":0},
  {"x":376,"y":730,"radiusX":35,"radiusY":55,"rotation":90}
],
  },

  // Level 19 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/19.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/19-a.png",
    differences: [
  {"x":360,"y":80,"radius":35},
  {"x":224,"y":335,"radius":35},
  {"x":372,"y":414,"radius":35},
  {"x":689,"y":707,"radiusX":35,"radiusY":120,"rotation":-85},
  {"x":361,"y":780,"radiusX":35,"radiusY":170,"rotation":90}
],
  },

  // Level 20 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/20.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/20-a.png",
    differences: [
  {"x":248,"y":526,"radius":35},
  {"x":570,"y":532,"radius":35},
  {"x":533,"y":696,"radius":35},
  {"x":562,"y":62,"radiusX":35,"radiusY":80,"rotation":0},
  {"x":45,"y":475,"radius":35}
],
  },

  // Level 21 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/21.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/21-a.png",
    differences: [
  {"x":352,"y":128,"radius":75},
  {"x":742,"y":103,"radiusX":35,"radiusY":103,"rotation":-22},
  {"x":584,"y":718,"radiusX":35,"radiusY":71,"rotation":-18},
  {"x":222,"y":550,"radiusX":42,"radiusY":40,"rotation":88},
  {"x":237,"y":786,"radius":35}
],
  },

  // Level 22 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/22.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/22-a.png",
    differences: [
  {"x":640,"y":669,"radius":35},
  {"x":466,"y":56,"radius":35},
  {"x":114,"y":50,"radius":55},
  {"x":195,"y":349,"radius":37},
  {"x":313,"y":720,"radiusX":35,"radiusY":41,"rotation":-70}
],
  },

  // Level 23 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/23.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/23-a.png",
    differences: [
  {"x":168,"y":160,"radius":39},
  {"x":730,"y":147,"radius":35},
  {"x":609,"y":720,"radius":35},
  {"x":616,"y":506,"radius":60},
  {"x":138,"y":665,"radiusX":35,"radiusY":95,"rotation":-10}
],
  },

  // Level 24 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/24.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/24-a.png",
    differences: [
  {"x":740,"y":232,"radius":35},
  {"x":366,"y":107,"radius":35},
  {"x":254,"y":490,"radius":35},
  {"x":588,"y":582,"radius":35},
  {"x":282,"y":302,"radius":35}
],
  },

  // Level 25 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/25.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/25-a.png",
    differences: [
  {"x":518,"y":287,"radius":35},
  {"x":179,"y":678,"radius":35},
  {"x":16,"y":192,"radius":35},
  {"x":750,"y":427,"radius":35},
  {"x":485,"y":145,"radiusX":35,"radiusY":75,"rotation":0}
],
  },

  // Level 26 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/26.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/26-a.png",
    differences: [
  {"x":54,"y":178,"radius":35},
  {"x":182,"y":283,"radius":35},
  {"x":328,"y":394,"radius":35},
  {"x":440,"y":386,"radius":35},
  {"x":706,"y":701,"radius":35}
],
  },

  // Level 27 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/27.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/27-a.png",
    differences: [
  {"x":450,"y":305,"radiusX":40,"radiusY":185,"rotation":0},
  {"x":266,"y":21,"radius":45},
  {"x":704,"y":106,"radius":35},
  {"x":410,"y":704,"radius":35},
  {"x":523,"y":77,"radius":35}
],
  },

  // Level 28 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/28.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/28-a.png",
    differences: [
  {"x":575,"y":177,"radius":35},
  {"x":330,"y":440,"radius":35},
  {"x":323,"y":715,"radius":35},
  {"x":69,"y":630,"radius":43},
  {"x":762,"y":370,"radius":45}
],
  },

  // Level 29 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/29.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/29-a.png",
    differences: [
  {"x":541,"y":330,"radius":55},
  {"x":280,"y":595,"radius":35},
  {"x":375,"y":600,"radius":35},
  {"x":510,"y":213,"radius":35},
  {"x":650,"y":320,"radius":35}
],
  },

  // Level 30 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/30.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/30-a.png",
    differences: [
  {"x":190,"y":125,"radius":45},
  {"x":533,"y":258,"radius":35},
  {"x":485,"y":86,"radius":35},
  {"x":680,"y":610,"radiusX":150,"radiusY":20,"rotation":0},
  {"x":150,"y":586,"radiusX":35,"radiusY":222,"rotation":-15}
],
  },

  // Level 31 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/31.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/31-a.png",
    differences: [
  {"x":370,"y":139,"radius":35},
  {"x":197,"y":766,"radius":45},
  {"x":173,"y":434,"radius":50},
  {"x":733,"y":338,"radius":40},
  {"x":698,"y":10,"radius":115}
],
  },

  // Level 32 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/32.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/32-a.png",
    differences: [
  {"x":630,"y":37,"radius":35},
  {"x":86,"y":799,"radius":55},
  {"x":740,"y":345,"radius":35},
  {"x":634,"y":670,"radius":40},
  {"x":93,"y":118,"radius":35}
],
  },

  // Level 33 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/33.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/33-a.png",
    differences: [
  {"x":726,"y":410,"radius":35},
  {"x":509,"y":125,"radius":38},
  {"x":458,"y":749,"radius":35},
  {"x":318,"y":549,"radius":35},
  {"x":56,"y":99,"radiusX":35,"radiusY":105,"rotation":-8}
],
  },

  // Level 34 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/34.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/34-a.png",
    differences: [
  {"x":166,"y":225,"radius":43},
  {"x":728,"y":30,"radius":35},
  {"x":749,"y":427,"radius":43},
  {"x":91,"y":566,"radius":35},
  {"x":22,"y":18,"radius":35}
],
  },

  // Level 35 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/35.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/35-a.png",
    differences: [
  {"x":640,"y":523,"radius":38},
  {"x":397,"y":629,"radius":65},
  {"x":272,"y":274,"radius":35},
  {"x":283,"y":42,"radius":40},
  {"x":765,"y":160,"radius":55}
],
  },

  // Level 36 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/36.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/36-a.png",
    differences: [
  {"x":690,"y":184,"radius":55},
  {"x":220,"y":333,"radius":35},
  {"x":200,"y":776,"radius":35},
  {"x":446,"y":499,"radius":35},
  {"x":450,"y":646,"radiusX":80,"radiusY":20,"rotation":0}
],
  },

  // Level 37 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/37.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/37-a.png",
    differences: [
  {"x":768,"y":168,"radius":35},
  {"x":55,"y":334,"radius":46},
  {"x":424,"y":371,"radius":35},
  {"x":102,"y":662,"radius":35},
  {"x":296,"y":123,"radius":50}
],
  },

  // Level 38 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/38.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/38-a.png",
    differences: [
  {"x":491,"y":168,"radius":109},
  {"x":250,"y":712,"radius":48},
  {"x":725,"y":485,"radius":39},
  {"x":458,"y":541,"radius":30},
  {"x":62,"y":125,"radius":43}
],
  },

  // Level 39 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/39.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/39-a.png",
    differences: [
  {"x":563,"y":83,"radius":95},
  {"x":310,"y":415,"radius":35},
  {"x":168,"y":202,"radius":35},
  {"x":658,"y":738,"radiusX":35,"radiusY":70,"rotation":-10},
  {"x":456,"y":627,"radiusX":35,"radiusY":150,"rotation":0}
],
  },

  // Level 40 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/40.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/40-a.png",
    differences: [
  {"x":435,"y":318,"radius":35},
  {"x":765,"y":335,"radius":35},
  {"x":755,"y":686,"radius":45},
  {"x":182,"y":307,"radiusX":35,"radiusY":61,"rotation":0},
  {"x":30,"y":307,"radiusX":35,"radiusY":94,"rotation":0}
],
  },

// Level 41 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/41.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/41-a.png",
    differences: [
  {"x":73,"y":69,"radius":85},
  {"x":560,"y":101,"radius":45},
  {"x":771,"y":517,"radius":45},
  {"x":130,"y":690,"radius":35},
  {"x":342,"y":507,"radius":35}
],
  },

// Level 42 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/42.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/42-a.png",
    differences: [
  {"x":776,"y":654,"radius":45},
  {"x":710,"y":400,"radius":55},
  {"x":628,"y":139,"radiusX":155,"radiusY":38,"rotation":0},
  {"x":270,"y":166,"radiusX":35,"radiusY":73,"rotation":0},
  {"x":180,"y":624,"radiusX":55,"radiusY":55,"rotation":0}
],
  },

// Level 43 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/43.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/43-a.png",
    differences: [
  {"x":371,"y":419,"radius":55},
  {"x":350,"y":634,"radius":35},
  {"x":570,"y":584,"radius":35},
  {"x":765,"y":94,"radius":35},
  {"x":555,"y":283,"radius":35}
],
  },

// Level 44 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/44.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/44-a.png",
    differences: [
  {"x":533,"y":344,"radius":72},
  {"x":360,"y":180,"radius":65},
  {"x":106,"y":357,"radius":35},
  {"x":34,"y":763,"radius":35},
  {"x":781,"y":307,"radius":35}
],
  },

// Level 45 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/45.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/45-a.png",
    differences: [
  {"x":698,"y":82,"radius":75},
  {"x":718,"y":370,"radius":35},
  {"x":430,"y":627,"radius":55},
  {"x":573,"y":734,"radiusX":35,"radiusY":55,"rotation":0},
  {"x":94,"y":290,"radius":35}
],
  },

// Level 46 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/46.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/46-a.png",
    differences: [
  {"x":366,"y":155,"radius":75},
  {"x":73,"y":745,"radius":35},
  {"x":135,"y":433,"radiusX":35,"radiusY":120,"rotation":0},
  {"x":786,"y":547,"radiusX":35,"radiusY":53,"rotation":0},
  {"x":622,"y":411,"radiusX":65,"radiusY":35,"rotation":-44}
],
  },

// Level 47 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/47.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/47-a.png",
    differences: [
  {"x":448,"y":32,"radiusX":45,"radiusY":120,"rotation":90},
  {"x":125,"y":714,"radius":35},
  {"x":232,"y":780,"radius":35},
  {"x":212,"y":230,"radius":35},
  {"x":334,"y":455,"radius":40}
],
  },

// Level 48 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/48.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/48-a.png",
    differences: [
  {"x":531,"y":270,"radius":39},
  {"x":325,"y":627,"radius":45},
  {"x":546,"y":741,"radius":35},
  {"x":253,"y":54,"radius":45},
  {"x":397,"y":263,"radius":35}
],
  },

// Level 49 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/49.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/49-a.png",
    differences: [
  {"x":149,"y":253,"radius":35},
  {"x":18,"y":566,"radius":90},
  {"x":775,"y":278,"radius":45},
  {"x":117,"y":50,"radiusX":35,"radiusY":60,"rotation":0},
  {"x":450,"y":440,"radiusX":30,"radiusY":63,"rotation":90}
],
  },

// Level 50 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/50.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/50-a.png",
    differences: [
  {"x":86,"y":584,"radius":35},
  {"x":384,"y":685,"radiusX":35,"radiusY":164,"rotation":90},
  {"x":785,"y":302,"radius":35},
  {"x":749,"y":473,"radius":35},
  {"x":16,"y":210,"radius":35}
],
  },

// Level 51 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/51.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/51-a.png",
    differences: [
  {"x":208,"y":294,"radius":35},
  {"x":429,"y":338,"radius":40},
  {"x":600,"y":98,"radius":35},
  {"x":254,"y":738,"radiusX":35,"radiusY":48,"rotation":8},
  {"x":730,"y":348,"radiusX":78,"radiusY":35,"rotation":-25}
],
  },

// Level 52 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/52.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/52-a.png",
    differences: [
  {"x":98,"y":104,"radius":73},
  {"x":460,"y":250,"radius":35},
  {"x":339,"y":410,"radius":35},
  {"x":265,"y":786,"radius":35},
  {"x":395,"y":107,"radiusX":35,"radiusY":80,"rotation":46}
],
  },

// Level 53 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/53.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/53-a.png",
    differences: [
  {"x":430,"y":235,"radius":49},
  {"x":270,"y":352,"radius":39},
  {"x":752,"y":70,"radius":55},
  {"x":408,"y":416,"radius":35},
  {"x":736,"y":675,"radiusX":35,"radiusY":105,"rotation":0}
],
  },

  // Level 54 - Fixed object-fit issue
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/54.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/54-a.png",
    differences: [
  {"x":330,"y":51,"radius":35},
  {"x":120,"y":300,"radius":40},
  {"x":698,"y":370,"radius":79},
  {"x":206,"y":184,"radius":35},
  {"x":533,"y":16,"radius":110}
],
  },

  // Level 55 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/55.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/55-a.png",
    differences: [
  {"x":553,"y":16,"radius":35},
  {"x":526,"y":480,"radius":35},
  {"x":374,"y":755,"radius":55},
  {"x":707,"y":311,"radiusX":35,"radiusY":80,"rotation":0},
  {"x":242,"y":201,radius:39}
],
  },

  // Level 56 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/56.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/56-a.png",
    differences: [
  {"x":364,"y":312,"radius":35},
  {"x":368,"y":682,"radius":60},
  {"x":522,"y":170,"radius":75},
  {"x":62,"y":74,"radiusX":75,"radiusY":35,"rotation":0},
  {"x":781,"y":704,"radiusX":35,"radiusY":83,"rotation":1}
],
  },

  // Level 57 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/57.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/57-a.png",
    differences: [
  {"x":725,"y":126,"radius":35},
  {"x":494,"y":520,"radius":35},
  {"x":72,"y":706,"radius":107},
  {"x":339,"y":61,"radius":35},
  {"x":184,"y":50,"radiusX":65,"radiusY":35,"rotation":-15}
],
  },

  // Level 58 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/58.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/58-a.png",
    differences: [
  {"x":638,"y":298,"radius":35},
  {"x":490,"y":426,"radius":50},
  {"x":174,"y":102,"radius":35},
  {"x":340,"y":580,"radius":35},
  {"x":735,"y":70,"radiusX":75,"radiusY":35,"rotation":-9}
],
  },

  // Level 59 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/59.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/59-a.png",
    differences: [
  {"x":125,"y":578,"radius":100},
  {"x":443,"y":334,"radius":35},
  {"x":141,"y":142,"radius":40},
  {"x":585,"y":547,"radiusX":35,"radiusY":62,"rotation":0},
  {"x":630,"y":120,"radiusX":35,"radiusY":82,"rotation":-51}
],
  },

  // Level 60 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/60.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/60-a.png",
    differences: [
  {"x":490,"y":280,"radius":60},
  {"x":261,"y":518,"radius":35},
  {"x":221,"y":150,"radiusX":35,"radiusY":59,"rotation":0},
  {"x":46,"y":66,"radiusX":35,"radiusY":49,"rotation":0},
  {"x":554,"y":590,"radius":40}
],
  },

  // Level 61 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/61.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/61-a.png",
    differences: [
  {"x":298,"y":534,"radius":95},
  {"x":425,"y":158,"radius":85},
  {"x":656,"y":170,"radius":35},
  {"x":707,"y":738,"radius":35},
  {"x":65,"y":78,"radius":55}
],
  },

  // Level 62 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/62.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/62-a.png",
    differences: [
  {"x":530,"y":262,"radius":55},
  {"x":208,"y":630,"radius":40},
  {"x":80,"y":712,"radius":55},
  {"x":488,"y":419,"radius":35},
  {"x":651,"y":580,"radius":75}
],
  },

  // Level 63 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/63.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/63-a.png",
    differences: [
  {"x":541,"y":357,"radius":58},
  {"x":315,"y":515,"radius":35},
  {"x":408,"y":59,"radius":35},
  {"x":190,"y":18,"radius":35},
  {"x":393,"y":250,"radius":35}
],
  },

  // Level 64 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/64.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/64-a.png",
    differences: [
  {"x":465,"y":172,"radius":35},
  {"x":650,"y":165,"radius":35},
  {"x":320,"y":512,"radius":35},
  {"x":310,"y":198,"radius":35},
  {"x":387,"y":378,"radius":35}
],
  },

  // Level 65 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/65.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/65-a.png",
    differences: [
  {"x":745,"y":384,"radius":85},
  {"x":705,"y":86,"radiusX":35,"radiusY":63,"rotation":0},
  {"x":378,"y":563,"radius":40},
  {"x":360,"y":67,"radius":35},
  {"x":126,"y":24,"radiusX":35,"radiusY":136,"rotation":83}
],
  },

  // Level 66 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/66.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/66-a.png",
    differences: [
  {"x":384,"y":42,"radius":40},
  {"x":701,"y":440,"radius":35},
  {"x":770,"y":718,"radius":35},
  {"x":256,"y":506,"radius":35},
  {"x":80,"y":650,"radius":40}
],
  },

  // Level 67 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/67.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/67-a.png",
    differences: [
  {"x":376,"y":43,"radius":35},
  {"x":755,"y":307,"radiusX":35,"radiusY":67,"rotation":39},
  {"x":571,"y":357,"radius":35},
  {"x":302,"y":528,"radius":35},
  {"x":335,"y":650,"radius":30}
],
  },

  // Level 68 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/68.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/68-a.png",
    differences: [
  {"x":107,"y":445,"radius":58},
  {"x":455,"y":635,"radius":35},
  {"x":751,"y":122,"radius":115},
  {"x":480,"y":252,"radius":35},
  {"x":534,"y":752,"radius":35}
],
  },

  // Level 69 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/69.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/69-a.png",
    differences:[
  {"x":412,"y":396,"radius":35},
  {"x":715,"y":219,"radius":35},
  {"x":710,"y":672,"radiusX":85,"radiusY":21,"rotation":0},
  {"x":300,"y":454,"radius":35},
  {"x":328,"y":206,"radius":35}
],
  },

  // Level 70 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/70.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/70-a.png",
    differences: [
  {"x":734,"y":749,"radius":50},
  {"x":195,"y":450,"radius":35},
  {"x":21,"y":288,"radius":35},
  {"x":377,"y":417,"radius":35},
  {"x":675,"y":442,"radius":35}
],
  },

  // Level 71 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/71.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/71-a.png",
    differences: [
  {"x":568,"y":461,"radius":35},
  {"x":786,"y":422,"radius":35},
  {"x":85,"y":672,"radius":35},
  {"x":120,"y":210,"radius":55},
  {"x":339,"y":546,"radius":50}
],
  },

  // Level 72 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/72.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/72-a.png",
    differences: [
  {"x":182,"y":75,"radius":35},
  {"x":432,"y":195,"radius":35},
  {"x":685,"y":268,"radiusX":35,"radiusY":290,"rotation":5},
  {"x":142,"y":690,"radius":35},
  {"x":26,"y":554,"radius":35}
],
  },

  // Level 73 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/73.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/73-a.png",
    differences: [
  {"x":440,"y":235,"radius":35},
  {"x":310,"y":450,"radius":35},
  {"x":472,"y":606,"radius":35},
  {"x":728,"y":742,"radiusX":50,"radiusY":82,"rotation":55},
  {"x":240,"y":145,"radius":35}
],
  },

  // Level 74 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/74.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/74-a.png",
    differences: [
  {"x":390,"y":58,"radius":50},
  {"x":733,"y":664,"radius":45},
  {"x":43,"y":455,"radius":70},
  {"x":35,"y":714,"radius":40},
  {"x":387,"y":240,"radius":35}
],
  },

  // Level 75 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/75.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/75-a.png",
    differences: [
  {"x":173,"y":138,"radius":75},
  {"x":738,"y":322,"radius":35},
  {"x":593,"y":680,"radius":35},
  {"x":578,"y":198,"radius":35},
  {"x":458,"y":346,"radius":35}
],
  },

  // Level 76 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/76.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/76-a.png",
    differences: [
  {"x":104,"y":653,"radius":65},
  {"x":515,"y":285,"radius":35},
  {"x":384,"y":432,"radius":43},
  {"x":477,"y":45,"radius":35},
  {"x":739,"y":78,"radius":85}
],
  },

  // Level 77 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/77.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/77-a.png",
    differences: [
  {"x":420,"y":390,"radius":85},
  {"x":134,"y":179,"radius":75},
  {"x":342,"y":770,"radius":40},
  {"x":488,"y":760,"radius":35},
  {"x":754,"y":747,"radius":65}
],
  },

  // Level 78 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/78.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/78-a.png",
    differences: [
  {"x":448,"y":259,"radius":35},
  {"x":269,"y":280,"radius":40},
  {"x":386,"y":587,"radius":85},
  {"x":504,"y":136,"radius":35},
  {"x":219,"y":486,"radius":45}
],
  },

  // Level 79 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/79.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/79-a.png",
    differences: [
  {"x":690,"y":593,"radiusX":39,"radiusY":135,"rotation":3},
  {"x":605,"y":240,"radius":35},
  {"x":192,"y":325,"radius":35},
  {"x":345,"y":780,"radius":58},
  {"x":477,"y":392,"radius":42}
],
  },

  // Level 80 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/80.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/80-a.png",
    differences: [
  {"x":460,"y":344,"radiusX":35,"radiusY":44,"rotation":0},
  {"x":544,"y":325,"radius":35},
  {"x":32,"y":293,"radius":38},
  {"x":85,"y":109,"radius":40},
  {"x":380,"y":496,"radius":35}
],
  },

  // Level 81 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/81.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/81-a.png",
    differences: [
  {"x":504,"y":410,"radius":55},
  {"x":200,"y":465,"radius":87},
  {"x":576,"y":742,"radius":35},
  {"x":126,"y":758,"radius":35},
  {"x":735,"y":585,"radius":60}
],
  },

  // Level 82 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/82.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/82-a.png",
    differences: [
  {"x":389,"y":219,"radius":65},
  {"x":706,"y":658,"radius":45},
  {"x":125,"y":672,"radius":35},
  {"x":341,"y":67,"radius":35},
  {"x":318,"y":776,"radius":35}
],
  },

  // Level 83 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/83.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/83-a.png",
    differences: [
  {"x":325,"y":91,"radius":55},
  {"x":445,"y":575,"radius":35},
  {"x":178,"y":282,"radius":75},
  {"x":680,"y":130,"radius":35},
  {"x":309,"y":373,"radius":35}
],
  },

  // Level 84 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/84.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/84-a.png",
    differences: [
  {"x":718,"y":421,"radius":85},
  {"x":376,"y":669,"radius":35},
  {"x":693,"y":162,"radius":35},
  {"x":488,"y":513,"radius":35},
  {"x":152,"y":540,"radiusX":35,"radiusY":75,"rotation":9}
],
  },

  // Level 85 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/85.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/85-a.png",
    differences: [
  {"x":420,"y":472,"radius":35},
  {"x":478,"y":626,"radius":35},
  {"x":400,"y":190,"radius":35},
  {"x":235,"y":235,"radius":40},
  {"x":101,"y":515,"radius":35}
],
  },

  // Level 86 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/86.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/86-a.png",
    differences: [
  {"x":253,"y":235,"radius":40},
  {"x":240,"y":538,"radius":38},
  {"x":512,"y":726,"radius":35},
  {"x":775,"y":480,"radius":35},
  {"x":624,"y":181,"radius":35}
],
  },

  // Level 87 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/87.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/87-a.png",
    differences: [
  {"x":658,"y":282,"radius":65},
  {"x":232,"y":740,"radius":35},
  {"x":530,"y":740,"radius":35},
  {"x":387,"y":255,"radius":105},
  {"x":388,"y":68,"radius":37}
],
  },

  // Level 88 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/88.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/88-a.png",
    differences: [
  {"x":355,"y":486,"radius":35},
  {"x":330,"y":298,"radius":35},
  {"x":446,"y":240,"radius":45},
  {"x":442,"y":781,"radius":35},
  {"x":32,"y":390,"radiusX":43,"radiusY":90,"rotation":0}
],
  },

  // Level 89 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/89.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/89-a.png",
    differences: [
  {"x":467,"y":240,"radius":35},
  {"x":250,"y":493,"radius":39},
  {"x":42,"y":295,"radius":75},
  {"x":48,"y":643,"radius":39},
  {"x":726,"y":572,"radius":35}
],
  },

  // Level 90 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/90.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/90-a.png",
    differences: [
  {"x":258,"y":426,"radius":35},
  {"x":731,"y":43,"radius":45},
  {"x":397,"y":306,"radius":43},
  {"x":518,"y":532,"radius":35},
  {"x":90,"y":630,"radius":35}
],
  },

// Level 91 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/91.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/91-a.png",
    differences: [
  {"x":349,"y":315,"radius":35},
  {"x":254,"y":595,"radius":40},
  {"x":743,"y":472,"radius":65},
  {"x":253,"y":190,"radius":35},
  {"x":485,"y":348,"radius":35}
],
  },

// Level 92 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/92.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/92-a.png",
    differences: [
  {"x":600,"y":62,"radius":55},
  {"x":522,"y":413,"radius":35},
  {"x":325,"y":730,"radius":35},
  {"x":300,"y":201,"radius":45},
  {"x":205,"y":499,"radius":38}
],
  },

// Level 93 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/93.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/93-a.png",
    differences: [
  {"x":523,"y":525,"radius":35},
  {"x":461,"y":355,"radiusX":65,"radiusY":28,"rotation":0},
  {"x":22,"y":701,"radius":35},
  {"x":400,"y":469,"radius":35},
  {"x":773,"y":475,"radius":35}
],
  },

// Level 94 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/94.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/94-a.png",
    differences: [
  {"x":418,"y":288,"radius":35},
  {"x":538,"y":704,"radius":35},
  {"x":293,"y":307,"radiusX":35,"radiusY":66,"rotation":0},
  {"x":34,"y":99,"radius":35},
  {"x":403,"y":432,"radiusX":55,"radiusY":26,"rotation":0}
],
  },

// Level 95 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/95.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/95-a.png",
    differences: [
  {"x":59,"y":358,"radius":95},
  {"x":544,"y":168,"radius":35},
  {"x":345,"y":680,"radius":35},
  {"x":26,"y":755,"radius":60},
  {"x":547,"y":368,"radiusX":55,"radiusY":116,"rotation":8}
],
  },

// Level 96 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/96.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/96-a.png",
    differences: [
  {"x":251,"y":141,"radius":35},
  {"x":101,"y":34,"radius":35},
  {"x":630,"y":520,"radius":45},
  {"x":91,"y":712,"radius":65},
  {"x":418,"y":259,"radius":35}
],
  },

// Level 97 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/97.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/97-a.png",
    differences: [
  {"x":442,"y":181,"radius":55},
  {"x":268,"y":575,"radius":35},
  {"x":691,"y":515,"radiusX":35,"radiusY":115,"rotation":0},
  {"x":110,"y":648,"radiusX":35,"radiusY":65,"rotation":0},
  {"x":40,"y":648,"radiusX":35,"radiusY":65,"rotation":0}
],
  },

// Level 98 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/98.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/98-a.png",
    differences: [
  {"x":682,"y":733,"radius":50},
  {"x":557,"y":704,"radius":38},
  {"x":573,"y":461,"radius":35},
  {"x":142,"y":429,"radius":65},
  {"x":770,"y":301,"radius":35}
],
  },

// Level 99 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/99.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/99-a.png",
    differences: [
  {"x":50,"y":658,"radiusX":35,"radiusY":128,"rotation":0},
  {"x":402,"y":332,"radius":35},
  {"x":165,"y":131,"radiusX":35,"radiusY":85,"rotation":0},
  {"x":366,"y":744,"radiusX":155,"radiusY":105,"rotation":8},
  {"x":755,"y":541,"radius":35}
],
  },

// Level 100 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/100.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/100-a.png",
    differences: [
  {"x":376,"y":699,"radius":39},
  {"x":693,"y":520,"radius":41},
  {"x":138,"y":619,"radius":47},
  {"x":80,"y":411,"radius":35},
  {"x":354,"y":568,"radius":35}
],
  },

// Level 101 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/101.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/101-a.png",
    differences: [
  {"x":125,"y":598,"radius":52},
  {"x":485,"y":744,"radius":35},
  {"x":547,"y":235,"radius":45},
  {"x":341,"y":56,"radius":35},
  {"x":368,"y":434,"radius":35}
],
  },

// Level 102 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/102.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/102-a.png",
    differences: [
  {"x":702,"y":48,"radiusX":95,"radiusY":20,"rotation":0},
  {"x":585,"y":314,"radius":35},
  {"x":174,"y":776,"radius":75},
  {"x":770,"y":781,"radius":35},
  {"x":429,"y":200,"radius":35}
],
  },

// Level 103 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/103.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/103-a.png",
    differences: [
  {"x":228,"y":69,"radius":60},
  {"x":536,"y":443,"radius":39},
  {"x":26,"y":160,"radiusX":35,"radiusY":78,"rotation":0},
  {"x":62,"y":528,"radius":65},
  {"x":320,"y":698,"radius":37}
],
  },

// Level 104 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/104.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/104-a.png",
    differences: [
  {"x":334,"y":323,"radius":45},
  {"x":55,"y":124,"radiusX":35,"radiusY":131,"rotation":0},
  {"x":290,"y":574,"radius":35},
  {"x":696,"y":717,"radius":45},
  {"x":507,"y":318,"radius":35}
],
  },

// Level 105 - PASTE YOUR COORDINATES HERE
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/105.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/105-a.png",
    differences: [
  {"x":120,"y":61,"radius":37},
  {"x":326,"y":726,"radius":57},
  {"x":237,"y":242,"radiusX":85,"radiusY":35,"rotation":0},
  {"x":564,"y":200,"radius":35},
  {"x":771,"y":293,"radius":55}
],
  },

  // Level 106 - PASTE YOUR COORDINATES HERE (FINAL LEVEL)
  {
    imageLeft: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/106.png",
    imageRight: "https://cdn.jsdelivr.net/gh/spicycabbage/spot-the-difference-assets@latest/106-a.png",
    differences: [
  {"x":347,"y":64,"radius":35},
  {"x":230,"y":568,"radius":45},
  {"x":307,"y":290,"radius":45},
  {"x":120,"y":610,"radius":35},
  {"x":440,"y":515,"radius":52}
],
  }
];

// Verify we have exactly 106 levels
console.log(`Total levels: ${levels.length}`);
