import * as Phaser from 'phaser';
import CST from '../CST';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.scenes.menu,
    });
    this.menuSong = null;
  }

  preload() {
    this.load.image('menu_bg', './assets/menu/menu_bg.jpg');
    this.load.image('play_btn', './assets/menu/play.png');
    this.load.image('leaderboard_btn', './assets/menu/leaderboard.png');
    this.load.audio('menu_music', './assets/menu/song.mp3');
  }

  create() {
    this.add.image(0, 0, 'menu_bg').setOrigin(0);
    this.menuSong = this.sound.add('menu_music', {
      loop: true,
      volume: 0,
    });
    this.menuSong.play();
    this.tweens.add({
      targets: this.menuSong,
      volume: 0.2,
      duration: 3000,
    });

    const playBtn = this.createButton(this.renderer.width / 2, this.renderer.height / 2 - 30, 'play_btn', CST.scenes.intro);
    playBtn.setScale(0.5);
    const leaderBoardBtn = this.createButton(this.renderer.width / 2, this.renderer.height / 2 + 100, 'leaderboard_btn', CST.scenes.leaderBoard);
    leaderBoardBtn.setScale(0.5);
  }

  createButton(x, y, btnKey, scene) {
    const btn = this.add.image(x, y, btnKey);
    btn.setInteractive();
    btn.on('pointerover', () => {
      btn.setTint(0xA80D10);
    });
    btn.on('pointerout', () => {
      btn.setTint(0xFFFFFF);
    });
    btn.on('pointerdown', () => {
      btn.setTint(0xA80D10);
      // musicTween.stop();
      this.tweens.add({
        targets: this.menuSong,
        volume: 0,
        duration: 2000,
      });
      this.menuSong.stop();
      this.cameras.main.fadeOut(2000, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.scene.start(scene);
      });
    });
    return btn;
  }
}