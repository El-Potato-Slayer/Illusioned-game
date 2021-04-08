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
  }

  preload() {
    this.load.image('house', './assets/intro/house.png');
    this.load.video('intro', './assets/intro/intro.mp4', 'loadeddata', false, true);
    this.load.audio('intro_music', './assets/intro/intro.mp3');
  }

  create() {
    this.cameras.main.fadeIn(1000);
    this.introMusic = this.sound.add('intro_music');
    this.introMusic.play();
    const vid = this.add.video(680, 350, 'intro');
    vid.play(true);
    vid.setPaused(false);

    this.text = this.add.text(460, 20, 'Press spacebar to skip', { fontSize: '32px', fill: '#ffffff' });
    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on('keydown-SPACE', () => this.startFirstLevel());

    this.input.keyboard.addCapture('SPACE');

    setTimeout(() => this.startFirstLevel(), 58000)
  }

  startFirstLevel() {
    this.cameras.main.fadeOut(1000, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start(CST.scenes.firstLevel, 'firstLevel');
      this.introMusic.stop();
    });
  }
}