import CST from '../CST';

export default class Incomplete extends Phaser.Scene {
  
  constructor(){
    super({
      key: CST.scenes.incomplete,
    });
    this.score = null;
  }

  init(score) {
    this.score = score
  }

  preload(){
    this.load.audio('error', './assets/sounds/error.mp3')
  }
  
  create() {
    const error = this.sound.add('error').play()
    const text = this.add.text(400,300, "I ran out of time, so I couldn't finish the story\n\n¯\\_(ツ)_/¯", {
      fontFamily: 'Arial',
      fontSize: '30px',
      fill: '#ffffff',
      align: 'center'
    })
    setTimeout(() => {
      this.input.keyboard.clearCaptures()
      this.input.keyboard.resetKeys()
      this.cameras.main.fadeOut(1000)
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.scene.start(CST.scenes.nameInput, this.score)
      });
    }, 5000)
  }
}