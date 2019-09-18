import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import { BusinessSearch } from './yelp-api';
import { getNewsApi } from './news-api';
import { WeatherService } from './weather-service';
import { getCoordinates } from './geo-coordinates';

const gatherWeather = function(city, lat, lon){
  let weatherService = new WeatherService();  // create instance of WeatherService class
  let promise = weatherService.getWeatherByCoords(lat, lon);  // call the instance method and pass in user input for the weather

  let weatherinfo = promise.then(async function(response) {
    const body = await JSON.parse(response);
    $('.cityweather').append(`The humidity in ${city} is ${body.main.humidity}%<br>`);
    $('.cityweather').append(`The temperature in Farenheit is ${body.main.temp} degrees revealing the main forecast as '${ body.weather[0].main}' whose description is ${body.weather[0].description}.<br>`) //${bbody.weather[0]}.`);
    return body;
  }, function(error) {
    $('.cityweather').text(`There was an error processing your request: ${error.message}`);
  });
  return weatherinfo;
}
const displayNews = function(newsData){
  if(!newsData.value){
    $(".citynews").text("Error loading news.");
  }else{
    for(let i = 0; i < newsData.value.length;i++){
      //not every article has an image
      if(newsData.value[i].image)
        $(".citynews").append("<img src='" + newsData.value[i].image.thumbnail.contentUrl + "'><br>");
      $(".citynews").append("<strong><a href='" + newsData.value[i].url + "'>" + newsData.value[i].name + "</a></strong><br>");
      $(".citynews").append("<p>" + newsData.value[i].description + "</p><br>");
      //slice the time of day off the date string
      $(".citynews").append(newsData.value[i].datePublished.slice(0, 10) + "<hr>");
    }
  }
}
const displayMap = function(coords){
  let maplat = coords.lat;
  let maplon = coords.lon;
  var platform = new H.service.Platform({
    'apikey' : process.env.MAP_API_KEY
  });
  var defaultLayers = platform.createDefaultLayers();
  var map = new H.Map(
    document.getElementById('map'), defaultLayers.vector.normal.map,
    {
      zoom: 12,
      center: { lat: maplat, lng: maplon}
  });
}
$(document).ready(function(){
  $("#city-input").submit(async function(event){
    event.preventDefault();
    $(".card-body").text("");
    $(".citymap").append('<div id="map"></div>');
    let city = $("#city-name").val();
    let coords = await getCoordinates(city);
    const restaurantSearch = new BusinessSearch(city, "restaurants");
    const cafeSearch = new BusinessSearch(city, "cafes");
    const barSearch = new BusinessSearch(city, "bars");
    restaurantSearch.callBusinessInfo();
    cafeSearch.callBusinessInfo();
    barSearch.callBusinessInfo();
    let newsData = await getNewsApi(city);
    displayNews(newsData);
    let weatherBody = await gatherWeather(city, coords.results[0].geometry.lat, coords.results[0].geometry.lng);
    displayMap(weatherBody.coord);
  });
});
