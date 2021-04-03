import FirstLevel from './scenes/LevelOne';
import MenuScene from './scenes/Menu';
import Phaser from 'phaser'

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 1360,
  height: 700,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [
    MenuScene,
    FirstLevel,
  ],
});