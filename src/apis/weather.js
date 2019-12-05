const WEATHER_API_KEY = process.env.WEATHER_API_KEY;


export function findWeather(coordinates, date) {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();


    const cors = "https://cors-anywhere.herokuapp.com/";
    let url = `${cors}https://api.darksky.net/forecast/${WEATHER_API_KEY}/${coordinates},${date}T00:00:00`;

    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      }
      else {
        reject(Error(request.statusText));
      }
    };
    request.open("GET", url, true);
    request.send();
  });
}


/*

lat and lon format = 47.6062,-122.3321

date format = 2019-12-04

TEST STRING https://api.darksky.net/forecast/8fe27ceba498ffad445a0d2847fa57e6/47.6062,-122.3321,2019-12-10T00:00:00

https://api.darksky.net/forecast/[key]/[latitude],[longitude]/[YYYY]-[MM]-[DD]T[HH]:[MM]:[SS][timezone]

old
${cors}https://api.darksky.net/forecast/${WEATHER_API_KEY}/${coordinates},${unixTime}?date=${date}`;

*/
