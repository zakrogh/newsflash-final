//GeoCoords: api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}; params(lat/lon)
//city only: api.openweathermap.org/data/2.5/weather?q={city name}
//city/country: api.openweathermap.org/data/2.5/weather?q={city name},{country code}; params(q city name and country code divided by comma, use ISO 3166 country codes)
//for maps by station: https://samples.openweathermap.org/data/3.0/stations?appid=

export class WeatherService {
  getWeatherByCoords(lat, lon) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      //https://openweathermap.org/current
      //const weather_url = `http://api.openweathermap.org/data/2.5/weather?q=${city},US&units=imperial&appid=${process.env.USER_KEY}`;
      const geo_coords = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.USER_KEY}`
      // const city_url = `http://api.openweathermap.org/data/2.5/weather?q=${city.name}`
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", geo_coords, true);
      request.send();
    });
  }

  /* STATIONS: REQ.BODY //geo_coords(lat/long)
  {
    station_id,
    "external_id": "SF_TEST001",
    "name": "San Francisco Test Station",
    "latitude": 37.76,
    "longitude": -122.43,
    "altitude": 150
}
  */


}
