const CST = {
  scenes: {
    menu: 'menu',
    intro: 'intro',
    firstLevel: 'firstLevel',
    incomplete: 'incomplete',
    nameInput: 'nameInput',
    leaderBoard: 'leaderBoard',
  },
  firstLevel: {
    sky: './assets/bg-1/background.png',
    cloud: './assets/bg-1/layers/2.png',
    ground: './assets/bg-1/ground.png',
    background1: './assets/bg-1/layers/3.png',
    background2: './assets/bg-1/layers/4.png',
    buildingCoordinates: { x: 1800, y: 800 },
    backgroundMusic: './assets/sounds/level1.mp3',
    platforms: [
      {
        x: 680,
        y: 980,
      },
      {
        x: 1360,
        y: 980,
      },
      {
        x: 2040,
        y: 980,
      },
      {
        x: 3200,
        y: 980,
        width: 200,
      },
      {
        x: 3300,
        y: 610,
        width: 200,
        scale: 0.6,
      },
      {
        x: 3700,
        y: 780,
        width: 100,
        scale: 0.6,
      },
      {
        x: 3800,
        y: 540,
        width: 100,
        scale: 0.6,
      },
      {
        x: 4200,
        y: 540,
        width: 100,
        scale: 0.6,
      },
      {
        x: 4530,
        y: 640,
        width: 100,
        scale: 0.6,
      },
      {
        x: 3600,
        y: 980,
        width: 100,
      },
      {
        x: 3800,
        y: 980,
        width: 60,
      },
      {
        x: 1000,
        y: 780,
        width: 600,
        scale: 0.6,
      },
      {
        x: 1150,
        y: 610,
        width: 400,
        scale: 0.6,
      },
    ],
    crates: [

    ],
    water: [
      {
        x: 2900,
        y: 940,
      },
      {
        x: 3400,
        y: 940,
      },
      {
        x: 3900,
        y: 940,
      },
      {
        x: 4370,
        y: 940,
      },
      {
        x: 4840,
        y: 940,
      },
    ],
  },
  secondLevel: {
    sky: './assets/bg-2/layers/1.png',
    ground: './assets/bg-2/ground.png',
    background1: './assets/bg-2/layers/2.png',
    background2: './assets/bg-2/layers/3.png',
    background3: './assets/bg-2/layers/4.png',
    buildingCoordinates: { x: 1800, y: 860 },
    backgroundMusic: './assets/sounds/level2.mp3',
    platforms: [
      {
        x: 960,
        y: 980,
      },
      {
        x: 2880,
        y: 980,
      },
      {
        x: 5300,
        y: 980,
      },
      {
        x: 2700,
        y: 440,
        scale: 0.2,
        rotation: 35,
        friction: 0.0,
      },
      {
        x: 3200,
        y: 440,
        scale: 0.2,
        rotation: -25,
      },
      {
        x: 3700,
        y: 464,
        scale: 0.2,
        rotation: -19,
      },
      {
        x: 4300,
        y: 464,
        scale: 0.2,
        width: 100,
      },
      {
        x: 4750,
        y: 464,
        scale: 0.2,
        width: 50,
      },
      {
        x: 5100,
        y: 490,
        scale: 0.2,
        width: 70,
        rotation: 9,
      },
      {
        x: 5400,
        y: 640,
        scale: 0.2,
        width: 40,
      },
    ],
    water: [
      {
        x: 4090,
        y: 940,
      },
    ],
  },
  thirdLevel: {
    sky: './assets/bg-3/layers/1.png',
    cloud: './assets/bg-3/layers/2.png',
    ground: './assets/bg-3/ground.png',
    background1: './assets/bg-3/layers/2.png',
    background2: './assets/bg-3/layers/3.png',
    background3: './assets/bg-3/layers/4.png',
    buildingCoordinates: { x: 1800, y: 860 },
    backgroundMusic: './assets/sounds/level3.mp3',
    platforms: [
      {
        x: 960,
        y: 980,
      },
      {
        x: 2880,
        y: 980,
      },
    ],
    water: [
    ],
  },
};

export default CST;