//id: MArCeCR5F1Ppp3vvnkUo

export default async function getWeather() {
  const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games`, {
    method: "post",
    headers: {
      'Accept': 'application:json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "name": "idk"
    })
  });

  const weather = await response.json();
  console.log(weather);

  // if (response.status !== 200) {
  //   throw new Error('Data cannot be fetched');
  // }

  // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2c3727ba2570a1fd7f92097742a63699`);

  // if (response.status !== 200) {
  //   throw new Error('Data cannot be fetched');
  // }

  // const weather = await response.json();
  // return weather;
}
