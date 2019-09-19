//GeoCoords: api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}; params(lat/lon)

export class WeatherService {
  getWeatherByCoords(lat, lon) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const geo_coords = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.USER_KEY}`
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
