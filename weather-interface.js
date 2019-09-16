// https://openweathermap.org/current

import { WeatherService } from './../js/weather-service.js';
// UI LOGIC BEGIN
$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

      
    let weatherService = new WeatherService();  // create instance of WeatherService class
    let promise = weatherService.getWeatherByCity(city);  // call the instance method and pass in user input for the weather
    
    promise.then(function(response) {
      const body = JSON.parse(response);//
      $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`); //change to f/c
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });

  //


// UI LOGIC END

});