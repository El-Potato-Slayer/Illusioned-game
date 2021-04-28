import * as Phaser from 'phaser';
import IntroScene from './scenes/IntroScene';
import LeaderBoard from './scenes/Leaderboard';
import FirstLevel from './scenes/LevelOne';
import Incomplete from './scenes/Incomplete';
import MenuScene from './scenes/Menu';
import NameInput from './scenes/NameInput';
// const Phaser = require('phaser');

const game = new Phaser.Game({
  type: Phaser.AUTO,
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    width: 1360,
    height: 682,
  },
  physics: {
    default: 'matter',
    matter: {
    },
  },
  scene: [
    MenuScene,
    IntroScene,
    FirstLevel,
    Incomplete,
    NameInput,
    LeaderBoard,
  ],
});

export default game;