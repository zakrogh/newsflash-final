import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { WeatherService } from './weather-service';// https://openweathermap.org/current
export default function init(){
$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

      
    let weatherService = new WeatherService();  // create instance of WeatherService class
    let promise = weatherService.getWeatherByCity(city);  // call the instance method and pass in user input for the weather
    
    promise.then(function(response) {
      const body = JSON.parse(response);//
      $(".modal").show();
      $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in Farenheit is ${body.main.temp} degrees revealing the main forecast as ${ body.weather[0].main} whose description is ${body.weather[0].description}.`) //${bbody.weather[0]}.`);
      
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
  $(".close").click(function(){ 
    $(".modal").hide();
      console.log("click e occurred")});
});
}