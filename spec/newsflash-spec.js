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

import { WeatherService } from '../src/weather-service';
// import { BusinessSearch } from '../src/yelp-api';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles.css';

let weatherService = new WeatherService();
  //TDD 
  //return valid city (entered by user) pertinent info //no way to viably access the input
describe('city', function() {
//   it('should return city', function() {
//     var city = $('#location').val();
//     console.log(city, weatherService.city);
//     expect(weatherService.city).toEqual("city");
//   });

//   //valid GET request at given endpoint (each API)
  it("valid GET request at given endpoint (each API)", function(){
    //method test: declare promise and call
    let promise = weatherService.getWeatherByCity("chicago");
    return promise.then(function(response){ //in a test environ w/async, must do a return callback;
      const body = JSON.parse(response);
      expect(body.name.toLowerCase()).toEqual("chicago"); 
    })

  });
//   //isValid json obj information retreived at status 200
//   it("isValid json obj information retreived at status 200", function(){
//     //method test
//     expect(message).toEqual("Hello");
//   });
//   // given the city, does it return the news
//   it("given the city, does it return the news", function(){
//     //method test
//     expect(message).toEqual("Hello");
//   });
//   // - given the city, does it return the restaurants
//   it("given the city, does it return the restaurants", function(){
//     //method test
//     expect(message).toEqual("Hello");
//   });
//   // - given the city, does it return the weather 
//   it("given the city, does it return the weather", function(){
//     let cityWeather = weatherService.getWeatherByCity()
//     //method test
//     expect(weatherService.getWeatherByCity(city)).toEqual("38 C");
//   });
//   // - given the city, does it return the map
//   it("given the city, does it return the map", function(){
//     //method test
//     expect(message).toEqual("Hello");
//   });
//   // - given the city, does it return city specific pics
//   it("given the city, does it return city specific pics", function(){
//     //method test
//     expect(message).toEqual("Hello");
//   });
});



