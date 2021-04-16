import CST from '../CST';
import postScore, { getScores } from '../score';

export default class NameInput extends Phaser.Scene {
  
  constructor(){
    super({
      key: CST.scenes.nameInput,
    });
    this.score = null;
    this.form = null
  }
  init(score) {
    this.form = document.getElementById('form-wrapper')
    this.form.classList.remove('hidden')
    this.score = score
  }

  preload(){
    this.load.image('menu_bg', './assets/menu/menu_bg.jpg');
  }
  
  create() {
    this.cameras.main.fadeIn(1000)
    this.add.image(0, 0, 'menu_bg').setOrigin(0);
    const btn = document.getElementById('submit')
    let arr = []
    // getScores().then(data => {
    //   arr = data.result;
    //   console.log(this.sortScores(arr));
    //   this.scene.start(CST.scenes.leaderBoard, this.sortScores(arr))
    // })
    btn.onclick = () => {
      const name = document.getElementById('name').value
      postScore(name, this.score).then(() => {
        this.form.classList.add('hidden')
        this.cameras.main.fadeOut(1000)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
          this.scene.start(CST.scenes.leaderBoard)
        });
      })
    }
  }

  
}