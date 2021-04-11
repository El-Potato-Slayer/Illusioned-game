// import * as Phaser from 'phaser';
import IntroScene from './scenes/IntroScene';
import FirstLevel from './scenes/LevelOne';
import MenuScene from './scenes/Menu';
// const Phaser = require('phaser');

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 1360,
  height: 760,
  physics: {
    default: 'matter',
    matter: {
      // gravity: { y: 3 },
      // debug: true,
      // matterBody: {
      //   frictionAir: 1
      // }
    },
  },
  scene: [
    // MenuScene,
    IntroScene,
    FirstLevel,
  ],
});