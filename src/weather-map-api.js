import $ from 'jquery';
export const getWeatherMapApi = function(coords){
  const options = {
    key: process.env.WEATHER_MAP_API_KEY,
    lat: coords.lat,
    lon: coords.lon,
    zoom: 12,
  };
  const weathermap = windyInit(options, windyAPI => {

    const { overlays, store } = windyAPI;
    overlays.temp.setMetric('°F');
    store.set('overlay', 'temp');
    console.log(overlays.temp.metric);
    console.log(windyAPI);
    console.log(map);
  });
  $(".play-pause").css('display', 'none !important');
  return weathermap;
}
