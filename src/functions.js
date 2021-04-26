export default class HelperFunctions {
  static convertScoreToTime(score) {
    let timedScore = '';
    const minutes = Math.floor(score / 60);
    const seconds = score % 60;
    if (minutes < 10 && seconds < 10) {
      timedScore = `0${minutes}:0${seconds}`;
    } else if (minutes < 10 && seconds >= 10) {
      timedScore = `0${minutes}:${seconds}`;
    } else if (minutes >= 10 && seconds < 10) {
      timedScore = `${minutes}:0${seconds}`;
    } else {
      timedScore = `${minutes}:${seconds}`;
    }
    return timedScore;
  }
}