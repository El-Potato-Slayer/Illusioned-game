import { CST } from '../CST';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.scenes.menu,
    });
  }

  init() {

  }

  preload() {
    this.load.image('menu_bg', './assets/menu/menu_bg.jpg');
    this.load.image('play_btn', './assets/menu/play.png');
    this.load.audio('menu_music', './assets/menu/song.mp3');
  }

  create() {
    this.add.image(0, 0, 'menu_bg').setOrigin(0);
    this.sound.play('menu_music', {
      loop: true,
      fadeIn: 4000,
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
      // playBtn.setTint(0x000000)
      this.scene.start(CST.scenes.firstLevel);
    });
  }

  update() {

  }
}