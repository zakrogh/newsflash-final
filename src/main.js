import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import { BusinessSearch } from './yelp-api';
import { getNewsApi } from './news-api';
import { WeatherService } from './weather-service';

const gatherNews = async function(city){
  let newsData = await getNewsApi(city);
  return newsData;
}
const gatherWeather = function(city){
  let weatherService = new WeatherService();  // create instance of WeatherService class
  let promise = weatherService.getWeatherByCity(city);  // call the instance method and pass in user input for the weather

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
  if(!newsData.results){
    $(".citynews").text("Error loading news.");
  }else{
    for(let i = 0; i < newsData.results.length;i++){
      $(".citynews").append("<img src='" + newsData.results[i].fields.thumbnail + "'><br>");
      $(".citynews").append("<strong><a href='" + newsData.results[i].webUrl + "'>" + newsData.results[i].webTitle + "</a></strong><br>");
      $(".citynews").append("<p>" + newsData.results[i].fields.trailText + "</p><br>");
      //slice the time of day off the date string
      $(".citynews").append(newsData.results[i].webPublicationDate.slice(0, 10) + "<hr>");
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
    event.preventDefault();
    const restaurantSearch = new BusinessSearch(city, "restaurants");
    const cafeSearch = new BusinessSearch(city, "cafes");
    const barSearch = new BusinessSearch(city, "bars");
    restaurantSearch.callBusinessInfo();
    cafeSearch.callBusinessInfo();
    barSearch.callBusinessInfo();
    let newsData = await gatherNews(city);
    displayNews(newsData)
    let weatherBody = await gatherWeather(city);
    displayMap(weatherBody.coord);
  });
});
