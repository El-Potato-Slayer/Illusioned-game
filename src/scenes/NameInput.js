import CST from '../CST';
import postScore, { getScores } from '../score';

export default class NameInput extends Phaser.Scene {
  
  constructor(){
    super({
      key: CST.scenes.nameInput,
    });
    this.score = null;
  }
  init(score) {
    const form = document.getElementById('form-wrapper')
    form.classList.remove('hidden')
    this.score = score
  }

  preload(){
    this.load.image('menu_bg', './assets/menu/menu_bg.jpg');
  }
  
  create() {
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
      postScore(name, this.score)

    }
  }

  
}