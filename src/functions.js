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

  static convertFetchedScoreToTime(scores) {
    const arr = [];
    scores.forEach(scorePair => {
      const minutes = Math.floor(scorePair.score / 60);
      const seconds = scorePair.score % 60;
      if (minutes < 10 && seconds < 10) {
        arr.push(`0${minutes}:0${seconds}`);
      } else if (minutes < 10 && seconds >= 10) {
        arr.push(`0${minutes}:${seconds}`);
      } else if (minutes >= 10 && seconds < 10) {
        arr.push(`${minutes}:0${seconds}`);
      } else {
        arr.push(`${minutes}:${seconds}`);
      }
    });

    return arr;
  }

  static sortScores(scores) {
    const arr = [];
    for (let i = 0; i < scores.length; i += 1) {
      if (!Number.isNaN(Number(scores[i].score))) {
        arr.push(scores[i]);
        if (arr.length >= 10) {
          break;
        }
      }
    }
    return arr.sort((a, b) => a.score - b.score);
  }

  static calculateSum(a, b) {
    return a + b
  }

  static calculateDifference(a, b) {
    return a - b
  }
}