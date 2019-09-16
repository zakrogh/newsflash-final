/*
  TDD:
    Test -
    - return valid city (entered by user) pertinent info
    - valid GET request at given endpoint (each API)
    - isValid json obj information retreived at status 200
    - given the city, does it return the news
    - given the city, does it return the restaurants
    - given the city, does it return the weather 
    - given the city, does it return the map
    - given the city, does it return city specific pics
*/

import { hello } from '../src/main';
import { WeatherService } from '../src/weather-service';
//import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

describe('hello', function() {
  it('should return hello', function() {
    var message = hello();
    expect(message).toEqual("Hello");
  });
  let weatherService = new WeatherService();
  //TDD 
  //return valid city (entered by user) pertinent info
  it("return valid city (entered by user) pertinent info", function(){
    //method test
      expect(weatherService.getWeatherByCity(city)[0]).toEqual("The complement to the object.response.");  
  });
  //valid GET request at given endpoint (each API)
  it("valid GET request at given endpoint (each API)", function(){
    //method test
    expect(message).toEqual("Hello");
  });
  //isValid json obj information retreived at status 200
  it("isValid json obj information retreived at status 200", function(){
    //method test
    expect(message).toEqual("Hello");
  });
  // given the city, does it return the news
  it("given the city, does it return the news", function(){
    //method test
    expect(message).toEqual("Hello");
  });
  // - given the city, does it return the restaurants
  it("given the city, does it return the restaurants", function(){
    //method test
    expect(message).toEqual("Hello");
  });
  // - given the city, does it return the weather 
  it("given the city, does it return the weather", function(){
    let cityWeather = weatherService.getWeatherByCity()
    //method test
    expect(weatherService.getWeatherByCity(city)).toEqual("38 C");
  });
  // - given the city, does it return the map
  it("given the city, does it return the map", function(){
    //method test
    expect(message).toEqual("Hello");
  });
  // - given the city, does it return city specific pics
  it("given the city, does it return city specific pics", function(){
    //method test
    expect(message).toEqual("Hello");
  });
});



