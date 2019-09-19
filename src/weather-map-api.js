import $ from 'jquery';
export const getWeatherMapApi = function(coords){
  const options = {
    key: process.env.WEATHER_MAP_API_KEY,
    lat: coords.lat,
    lon: coords.lon,
    zoom: 7,
  };
  const weathermap = windyInit(options, windyAPI => {
    const { overlays, store } = windyAPI;
    overlays.temp.setMetric('°F');
    store.set('overlay', 'clouds');
  });
  return weathermap;
}
