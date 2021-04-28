import * as Phaser from 'phaser';
import CST from '../CST';

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.scenes.intro,
    });
    this.text = null;
    this.cursors = null;
    this.introMusic = null;
    this.skipped = false;
  }

  preload() {
    this.load.image('house', './assets/intro/house.png');
    this.load.video('intro', './assets/videos/black.mp4', 'canplay', false, false);
  }

  create() {
    this.cameras.main.fadeIn(1000);
    const vid = this.add.video(680, 350, 'intro');
    vid.play(true);
    vid.scale = 0.7;

    this.text = this.add.text(460, 20, 'Press spacebar to skip', { fontSize: '32px', fill: '#ffffff' });
    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on('keydown-SPACE', () => this.startFirstLevel());

    this.input.keyboard.addCapture('SPACE');

    setTimeout(() => this.startFirstLevel(), 58000);
  }

  startFirstLevel() {
    if (!this.skipped) {
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.scene.start(CST.scenes.firstLevel, 'firstLevel');
      });
    }
    this.skipped = true;
  }
}