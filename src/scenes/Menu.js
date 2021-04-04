import * as Phaser from 'phaser';
import CST from '../CST';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.scenes.menu,
    });
    this.menuSong = null;
  }

  // init() {

  // }

  preload() {
    this.load.image('menu_bg', './assets/menu/menu_bg.jpg');
    this.load.image('play_btn', './assets/menu/play.png');
    this.load.audio('menu_music', './assets/menu/song.mp3');
  }

  create() {
    this.add.image(0, 0, 'menu_bg').setOrigin(0);
    this.menuSong = this.sound.add('menu_music', {
      loop: true,
      volume: 0,
    });
    this.menuSong.play();
    const musicFadeIn = this.tweens.add({
      targets: this.menuSong,
      volume: 0.5,
      duration: 3000,
    });


    const playBtn = this.add.image(680, 350, 'play_btn');
    playBtn.setInteractive();
    playBtn.on('pointerover', () => {
      playBtn.setTint(0xA80D10);
    });
    playBtn.on('pointerout', () => {
      playBtn.setTint(0xFFFFFF);
    });
    playBtn.on('pointerdown', () => {
      playBtn.setTint(0xA80D10);
      musicFadeIn.stop();
      this.tweens.add({
        targets: this.menuSong,
        volume: 0,
        duration: 2000,
      });
      this.menuSong.stop();
      this.cameras.main.fadeOut(2000, 0, 0, 0);
    });
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start(CST.scenes.intro);
    });
  }
}