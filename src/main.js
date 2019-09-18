import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import { BusinessSearch } from './yelp-api';
import { getNewsApi } from './news-api';
import { WeatherService } from './weather-service';

const gatherNews = async function(city){
  let newsData = await getNewsApi(city);
  console.log(newsData);
  return newsData;
}
const gatherWeather = function(city){
  let weatherService = new WeatherService();  // create instance of WeatherService class
  let promise = weatherService.getWeatherByCity(city);  // call the instance method and pass in user input for the weather

  promise.then(function(response) {
    const body = JSON.parse(response);
    $('.cityweather').append(`The humidity in ${city} is ${body.main.humidity}%<br>`);
    $('.cityweather').append(`The temperature in Farenheit is ${body.main.temp} degrees revealing the main forecast as '${ body.weather[0].main}' whose description is ${body.weather[0].description}.<br>`) //${bbody.weather[0]}.`);

  }, function(error) {
    $('.cityweather').text(`There was an error processing your request: ${error.message}`);
  });
}
const displayNews = function(newsData){
  console.log(newsData);
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

$(document).ready(function(){
  $("#city-input").submit(async function(event){
    $(".card-body").text("");
    let city = $("#city-name").val();
    event.preventDefault();
    const businessSearch = new BusinessSearch(city, "restaurants");
    businessSearch.callBusinessInfo();
    let newsData = await gatherNews(city);
    displayNews(newsData)
    gatherWeather(city);
  });
});
