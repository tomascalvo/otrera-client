const flip = (polygon, xOffset = 0) => {
  return polygon.map((coords) => {
    return [333 - coords[0] + xOffset, coords[1]];
  });
};

const skull = {
  anterior: [
    [169.5, 3], // crown
    [184, 5],
    [198, 12],
    [205, 30],
    [205, 60], // zygomatic arch
    [200, 80], // masseter
    [196, 91],
    [179, 106],
    [169.5, 107], // chin
    [160, 106],
    [144, 92],
    [141, 80], // masseter
    [137, 60], // zygomatic arch
    [138, 30],
    [144, 12],
    [158, 5],
  ],
  posterior: [
    [169.5, 3], // crown
    [184, 5],
    [198, 12],
    [205, 30],
    [205, 60], // zygomatic arch
    [200, 80], // masseter
    [196, 89],
    [180, 83],
    [169.5, 83], // spine
    [163.25, 82],
    [143, 89],
    [141, 80], // masseter
    [137, 60], // zygomatic arch
    [138, 30],
    [144, 12],
    [158, 5],
  ],
};

const hand = flip([
    [35, 413], // wrist anterior
    [56, 412], // wrist posterior
    [60, 434],
  
    [57, 450],
    [59, 472],
    [57.5, 475], // pinky
    [54, 472],
    [53, 455],
  
    [51, 453],
  
    [48, 455],
    [45, 485],
    [43, 487], // ring
    [41, 485],
    [43, 460],
  
    [41, 458],
  
    [38, 460],
    [32, 490],
    [30, 492], // middle
    [28, 490],
    [32, 460],
  
    [31, 456],
  
    [28, 455],
    [21, 484],
    [18, 485], // pointer
    [16, 483],
    [21, 455],
  
    [20, 448],
    [17, 454],
    [13, 455], // thumb
    [11, 453],
    [22, 428],
  ]);

const foot = [
    [89, 751], 
    [105, 752], // ankle
    [110, 765], //
    [107, 774], // heel
    [100, 775], // arch
    [93, 790],
    [85, 795], 
    [80, 797], // big toe
    [59, 793], 
    [55, 785], // pinky toe
    [67, 775],
    [74, 772],
  ];

const neck = {
  anterior: [
    [146, 97], // top left
    [160, 110],
    [179, 110],
    [194, 97], // top right
    [194, 120],
    [190, 130],
    [179, 145], // bottom right
    [162, 145], // bottom left
    [150, 130],
    [146, 120],
  ],
  posterior: [
    [144, 91], // top left
    [156, 85],
    [182, 85],
    [194, 91], // top right
    [195, 122],
    [143, 122],
  ],
};

const shoulder = {
  anterior: [
    [72, 160],
    [80, 153],
    [91, 150], // top
    [115, 151],
    [101, 185],
    [92, 210],
    [80, 211], // bottom
    [69, 210],
    [65, 190],
    [69, 170],
  ],
  posterior: [
    [91, 150], // top
    [110, 159],
    [123, 170],
    [105, 195],
    [92, 205],
    [67, 215], // bottom
    [65, 190],
    [69, 170],
    [72, 160],
    [80, 153],
  ],
};

const trapezius = {
  anterior: [
    [91, 149], // shoulder (left)
    [130, 131],
    [144, 121], // top
    [158, 145], // collarbone (left)
    [120, 149],
  ],
  posterior: [
    [159, 85],
    [169, 86],
    [166, 312],
    [138, 220],
    [125, 169],
    [110, 157],
    [93, 149],
    [125, 135],
    [145, 123],
  ],
};

const rhomboids = flip(
  [
    [213, 173], // top
    [229, 197],
    [242, 208],
    [239, 225],
    [220, 226],
    [201, 220],
  ],
  3
);

const latissimusDorsi = {
  anterior: [
    [99, 225], // top
    [105, 235],
    [108, 238],
    [109, 275], // bottom
    [102, 249],
  ],
  posterior: [
    [97, 225], // top
    [117, 226],
    [137, 222],
    [166, 315], // top spine
    [166, 372], // bottom spine
    [145, 360],
    [117, 348],
    [112, 305], // hip point
    [110, 275],
    [102, 250],
  ],
};

const chest = flip(
  [
    [118, 151], // top left
    [168, 145], // sternum top
    [168, 238], // sternum bottom
    [150, 240],
    [130, 241],
    [108, 232],
    [100, 220],
    [95, 210], // bottom arm
    [103, 185], // top arm
  ],
  5
);

const serratusAnterior = [
  [226, 238], // top
  [226, 286], // bottom
  [209, 245],
];

const abdomen = [
  [206, 245], // top left
  [225, 290],
  [225, 305], // left waist
  [229, 335],
  [228, 340], // left hip
  [214, 385],
  [199, 400],
  [173, 420], // bottom left
  [160, 420], // bottom right
  [135, 400],
  [118, 385],
  [102, 340], // right hip
  [103, 335],
  [112, 303], // right waist
  [112, 290],
  [131, 245], // top right
  [168.5, 240], // top
];

const biceps = [
  [244, 213], // top
  [268, 213],
  [270, 248],
  [265, 282],
  [245, 284], // bottom
  [238, 245],
];

const triceps = flip(
  [
    [244, 208], // top
    [268, 217],
    [270, 248],
    [265, 282],
    [245, 284], // bottom
    [238, 245],
  ],
  2
);

const forearm = [
  [244, 286], // top
  [266, 284],
  [272, 295],
  [278, 315],
  [279, 328],
  [291, 410], // bottom
  [275, 409],
  [247, 330],
  [242, 303],
];

const abductor = {
  anterior: flip(
    [
      [230, 343], // top
      [240, 404], // bottom
      [217, 384],
    ],
    -2
  ),
  posterior: flip(
    [
      [219, 330], // top
      [230, 345],
      [242, 415], // bottom
      [228, 375],
      [206, 354],
      [217, 351],
    ],
    -2
  ),
};

const gluteus = [
  [126, 355], // top
  [155, 375],
  [165, 395],
  [163, 425],
  [158, 440],
  [145, 448],
  [128, 452],
  [103, 462],
  [95, 474],
  [89, 440],
  [96, 400],
  [105, 375],
];

const quadriceps = flip(
  [
    [115, 385], // top
    [134, 440],
    [139, 475],
    [137, 500],
    [135, 535],
    [128, 560],
    [115, 573], // bottom
    [95, 575], // bottom
    [93, 545],
    [90, 530],
    [85, 485],
    [88, 435],
    [91, 408],
  ],
  -1
);

const adductor = flip([
  [164, 443],
  [152, 480],
  [145, 500],
  [135, 435],
  [118, 387], // top right
  [130, 398],
  [160, 423],
]);

const hamstring = [
  [87, 445], // top
  [95, 478],
  [103, 465],
  [125, 455],
  [145, 450],
  [163, 445],
  [145, 500],
  [124, 585], // bottom
  [113, 570],
  [105, 550],
  [100, 565],
  [92, 578],
  [86, 500],
  [86, 463],
];

const lowerLeg = {
  anterior: [
    [119, 575], // top
    [120, 595],
    [124, 630],
    [123, 650],
    [120, 660],
    [107, 725],
    [105, 749], // bottom
    [90, 748],
    [93, 725],
    [85, 635],
    [90, 603],
    [96, 578],
  ],
  posterior: [
    [100, 570], // top
    [105, 575],
    [111, 570],
    [120, 590],
    [124, 630],
    [123, 650],
    [120, 660],
    [107, 725],
    [105, 749], // bottom
    [90, 748],
    [93, 725],
    [85, 635],
    [88, 603],
    [91, 583],
  ],
};

const flattenCoords = function (coords) {
  const merged = [].concat.apply([], coords);
  return merged;
};

const flattenAll = function (polygonObj) {
  Object.keys(polygonObj).forEach((key) => {
    const polygon = polygonObj[key];
    if (Array.isArray(polygon)) {
      if (!Array.isArray(polygon[0])) {
        return;
      } else {
        polygonObj[key] = flattenCoords(polygon);
      }
    } else {
      Object.keys(polygon).forEach((subkey) => {
        polygonObj[key][subkey] = flattenCoords(polygon[subkey]);
      });
    }
  });
  return polygonObj;
};

const musclePolygons = {
  skull,
  hand,
  foot,
  neck,
  shoulder,
  trapezius,
  latissimusDorsi,
  rhomboids,
  chest,
  serratusAnterior,
  abdomen,
  biceps,
  triceps,
  forearm,
  abductor,
  adductor,
  gluteus,
  quadriceps,
  hamstring,
  lowerLeg,
};

const flattenedPolygons = flattenAll(musclePolygons);

export default flattenedPolygons;
