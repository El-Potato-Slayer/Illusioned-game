const CST = {
  scenes: {
    menu: 'menu',
    intro: 'intro',
    firstLevel: 'firstLevel',
    secondLevel: 'secondLevel',
    thirdLevel: 'thirdLevel',
    fourthLevel: 'fourthLevel',
    leaderBoard: 'leaderBoard'
  },
  firstLevel: {
    sky: './assets/bg-1/background.png',
    cloud: './assets/bg-1/layers/2.png',
    ground: './assets/bg-1/ground.png',
    background1: './assets/bg-1/layers/3.png',
    background2: './assets/bg-1/layers/4.png',
    buildingCoordinates: {x: 1800, y: 760},
    platforms: [
      {
        x: 680,
        y: 940,
      },
      {
        x: 1360,
        y: 940,
      },
      {
        x: 2040,
        y: 940,
      },
      {
        x: 3200,
        y: 940,
        width: 200
      },
      {
        x: 3300,
        y: 570,
        width: 200,
        scale: 0.6
      },
      {
        x: 3700,
        y: 740,
        width: 100,
        scale: 0.6
      },
      {
        x: 3800,
        y: 500,
        width: 100,
        scale: 0.6
      },
      {
        x: 4200,
        y: 500,
        width: 100,
        scale: 0.6
      },
      {
        x: 4530,
        y: 600,
        width: 100,
        scale: 0.6
      },
      {
        x: 3600,
        y: 940,
        width: 100
      },
      {
        x: 3800,
        y: 940,
        width: 60
      },
      {
        x: 1000,
        y: 740,
        width: 600,
        scale: 0.6 
      },
      {
        x: 1150,
        y: 570,
        width: 400,
        scale: 0.6 
      },
    ],
    crates: [

    ],
    water: [
      {
        x: 2900,
        y: 900
      },
      {
        x: 3400,
        y: 900
      },
      {
        x: 3900,
        y: 900
      },
      {
        x: 4370,
        y: 900
      },
      {
        x: 4840,
        y: 900
      },
    ]
  },
  secondLevel: {
    sky: './assets/bg-2/layers/1.png',
    ground: './assets/bg-2/ground.png',
    background1: './assets/bg-2/layers/2.png',
    background2: './assets/bg-2/layers/3.png',
    background3: './assets/bg-2/layers/4.png',
    buildingCoordinates: {x: 1800, y: 820},
    platforms: [
      {
        x: 960,
        y: 940,
      },
      {
        x: 2880,
        y: 940,
      },
      {
        x: 5300,
        y: 940,
      },
      {
        x: 2700,
        y: 400,
        scale: 0.2,
        rotation: 35,
        friction: 0.0
      },
      {
        x: 3200,
        y: 400,
        scale: 0.2,
        rotation: -25,
      },
      {
        x: 3700,
        y: 424,
        scale: 0.2,
        rotation: -19,
      },
      {
        x: 4300,
        y: 424,
        scale: 0.2,
        width: 100
      },
      {
        x: 4750,
        y: 424,
        scale: 0.2,
        width: 50
      },
      {
        x: 5100,
        y: 450,
        scale: 0.2,
        width: 70,
        rotation: 9
      },
      {
        x: 5400,
        y: 600,
        scale: 0.2,
        width: 40,
      },
      // {
      //   x: 2040,
      //   y: 940,
      // },
      // {
      //   x: 3200,
      //   y: 940,
      //   width: 200
      // },
    ],
    water: [
      {
        x: 4090,
        y:900
      }
    ]
  },
  thirdLevel: {
    sky: './assets/bg-3/layers/1.png',
    cloud: './assets/bg-3/layers/2.png',
    ground: './assets/bg-3/ground.png',
    background1: './assets/bg-3/layers/2.png',
    background2: './assets/bg-3/layers/3.png',
    background3: './assets/bg-3/layers/4.png',
    buildingCoordinates: {x: 1800, y: 820},
    platforms: [
      {
        x: 960,
        y: 940,
      },
      {
        x: 2880,
        y: 940,
      }
    ],
    water: [
    ]
  }
};

export default CST;