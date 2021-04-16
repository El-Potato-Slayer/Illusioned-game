import CST from '../CST';
import postScore, { getScores } from '../score';

export default class LeaderBoard extends Phaser.Scene {
  
  constructor(){
    super({
      key: CST.scenes.leaderBoard,
    });
    this.scores = null;
  }

  init() {
  }

  preload(){
    this.load.video('credits', './assets/videos/credits.mp4', 'loadeddata', false, true);
    this.load.audio('music', './assets/menu/song.mp3')
  }
  
  create() {

    this.cameras.main.setAlpha(0);
    const vid = this.add.video(680, 350, 'credits');
    vid.play(true);
    vid.setPaused(false);
    vid.scale = 0.65;
    const audio = this.sound.add('music', {loop: true,volume:0.2})
    audio.play()
    this.add.text(220, 55, 'Leaderboard', {
      fontFamily: 'New Tegomin',
      fontSize: '40px',
      fill: '#ffffff' 
    })
    const nameText = this.add.text(200, 150, '    Name\n\n', {
      fontFamily: 'New Tegomin',
      fontSize: '30px',
      fill: '#ffffff' 
    })
    const scoreText = this.add.text(400, 150, 'Time\n\n', {
      fontFamily: 'New Tegomin',
      fontSize: '30px',
      fill: '#ffffff' 
    })
    getScores().then(data => {
      const temp = data.result
      this.scores = this.sortScores(temp); 
      // console.log(temp.sort((a, b) => a.score - b.score));
      const timedScores = this.convertScoreToTime(this.scores)

      for (let i = 0; i < this.scores.length; i++) {
        nameText.text += `${i+1}.\t${this.scores[i].user}\n`   
        scoreText.text += `${timedScores[i]}\n`      
      }
      this.cameras.main.setAlpha(1);
      this.cameras.main.fadeIn(3000);
    })
    const btn = this.add.text(260, 580, 'Back to menu', {
      fontFamily: 'New Tegomin',
      fontSize: '30px',
      fill: '#ffffff'
    })
    btn.setInteractive()
    btn.on('pointerover', () => {
      btn.setTint(0xA80D10);
    });
    btn.on('pointerout', () => {
      btn.setTint(0xFFFFFF);
    });
    btn.on('pointerdown', () => {
      btn.setTint(0xA80D10);
      // musicFadeIn.stop();
      this.tweens.add({
        targets: audio,
        volume: 0,
        duration: 2000,
      });
      audio.stop();
      this.cameras.main.fadeOut(2000, 0, 0, 0);
      this.scene.start(CST.scenes.menu)
    });
  }

  sortScores(scores){
    const arr = []
    for (let i = 0; i < scores.length; i++) {
      if (!isNaN(scores[i].score)) {
        arr.push(scores[i])
        console.log(scores[i]);
      }
    }
    return arr.sort((a, b) => a.score - b.score)
  }

  convertScoreToTime(scores){
    const arr = []
    scores.forEach(scorePair => {
      const minutes = Math.floor(scorePair.score / 60)
      const seconds = scorePair.score % 60
      if (minutes < 10 && seconds < 10) {
        arr.push(`0${minutes}:0${seconds}`)
      } else if (minutes < 10 && seconds >= 10) {
        arr.push(`0${minutes}:${seconds}`)
      } else if (minutes >= 10 && seconds < 10) {
        arr.push(`${minutes}:0${seconds}`)
      } else {
        arr.push(`${minutes}:${seconds}`)
      }
    });

    return arr
  }
}