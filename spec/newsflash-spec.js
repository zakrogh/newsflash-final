/*
  TDD:
    Test - http://api.openweathermap.org/data/2.5/weather?zip="+Postal Code+",us&appid="+key+"&units=imperial
    - return valid city (entered by user) pertinent info
    - valid GET request at given endpoint (each API)
    - isValid json obj information retreived at status 200ß
    - given the city, does it return the news
    - given the city, does it return the restaurants
    - given the city, does it return the weather 
    - given the city, does it return the map
    - given the city, does it return city specific pics
*/

import { BusinessSearch } from '../src/yelp-api';
import { getNewsApi } from '../src/news-api';
import { WeatherService } from '../src/weather-service';

let weatherService = new WeatherService();
let businessSearch = new BusinessSearch(city, "restaurants"); 

//  TDD 
describe('city', function() {
//  WEATHER TEST // - 
//  return valid city (entered by user) pertinent info //no way to viably access the input

//valid GET request at given endpoint (each API)
  it("valid GET request at given endpoint (each API)", function(){
    //method test: declare promise and call
    let promise = weatherService.getWeatherByCity("chicago");
    return promise.then(function(response){ //in a test environment w/async, must do a return callback;
      const body = JSON.parse(response);
      expect(body.name.toLowerCase()).toEqual("chicago"); 
    });
  });
// Since weather/JSON will change, this test is built to fail and/or manually input (for now) as it only works when info is gotten on the FE then plugged in test environment and immediately run.
  it("valid weather description from JSON response", function(){
    let promise = weatherService.getWeatherByCity("chicago");
    return promise.then(function(response){
      const body = JSON.parse(response);
      expect(body.weather[0].description).toEqual("few clouds");
    })
  });
  //GET weather description each day will have a diff description: Test for "JSON response:str"
  it("Is typeof str? valid weather descriptor from JSON.res", function(){
    let promise = weatherService.getWeatherByCity("city");
    return promise.then(function(response){
      const body = JSON.parse(response);
      expect(typeof body.weather[0].description).toEqual("string");
    })
  });
  //
//   //isValid json obj information retreived at status 200
//   it("isValid json obj information retreived at status 200", function(){
//     //method test
//     expect(message).toEqual("Hello");
//   });

//Due to weather changing so rapidly/drastically:  - Given city gotten does it return weather in correct JSON req.res format
  it("Given city, is weather req.res valid from given endpoint temp: isNum? ", function(){
      //method test: 
      let promise = weatherService.getWeatherByCity("chicago");
      return promise.then(function(response){ //in a test environ w/async, must do a return callback;
      const body = JSON.parse(response);
      expect(typeof body.main.temp).toEqual("number"); 
    });
  });
//  NEWS TEST // - 
 it("given the city, does it return the news", function(){
    //method test
    let promise = getNewsApi("chicago");
    return promise.then(function(newsData){  //aka response
    expect(typeof newsData.results[0]).toEqual("string"); 
  });
});
// given the city, does it return the news
  it("valid req.res from given news Img from endpoint: isStr ", function(){
    //method test: 
      let promise = getNewsApi("chicago");
      return promise.then(function(newsData){  // response IMG is a 'str'
      expect(typeof newsData.results[0].fields.thumbnail).toEqual("string"); 
    });
  });

// BUSINESS TEST // - 
// Biz test; given the city, does it return the restaurants
  it("given the city, does it return the restaurants", function(){
    //method test: 
    let promise = businessSearch.callBusinessInfo("chicago", "restaurant");
    return promise.then(function(response){ //in a test environ w/async, must do a return callback;
      const item = JSON.parse(response);
      expect(typeof item.categories[0].title).toEqual("string"); 
    });
  });
  // MAP TEST // - 
  // Map test; 
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
  // 

});



