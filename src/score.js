// id: MArCeCR5F1Ppp3vvnkUo
// new ID: 7wAPFFVEriRN3ORR1W5D
export default async function postScore(name, points) {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/MArCeCR5F1Ppp3vvnkUo/scores/', {
    method: 'post',
    headers: {
      Accept: 'application:json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: name,
      score: points,
    }),
  });

  const scores = await response.json();
  return scores;
}

export async function getScores() {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/MArCeCR5F1Ppp3vvnkUo/scores/');


  const scores = await response.json();
  // console.log(scores);
  return scores;
  // if (response.status !== 200) {
  //   throw new Error('Data cannot be fetched');
  // }
}
