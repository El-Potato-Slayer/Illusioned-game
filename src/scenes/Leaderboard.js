import CST from '../CST';

export default class LeaderBoard extends Phaser.Scene {
  
  constructor(){
    super({
      key: CST.scenes.leaderBoard,
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
    btn.onclick = () => {
      const name = document.getElementById('name').value
      const o = this.findHighestScore(['1:45', '2:24', '4:18', '6:21'], '2:21')
      console.log(o);
    }
  }

  findHighestScore(scores, newScore){
    // [
    //  '1:45',
    //  '2:24',
    //  '4:18',
    //  '6:21',
    //]
    let insertScore = []
    scores.forEach(score => {
      const minutes = score.split(':')[0]
      const seconds = score.split(':')[1]
      const newScoreMinutes = newScore.split(':')[0]
      const newScoreSeconds = newScore.split(':')[1]
      if (minutes > newScoreMinutes) {
        insertScore[0] = newScoreMinutes
      }
      if (seconds > newScoreSeconds) {
        insertScore[1] = newScoreSeconds
      }
    });
    
    return insertScore
  }
}