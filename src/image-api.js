// Wikipedia API call ref: https://stackoverflow.com/questions/23952045/wikipedia-api-cross-origin-requests
import $ from 'jquery';

export class ImageApi {
  constructor(city) {
    this.city = city;
  }

  getImageApi() {
    const url = `http://en.wikipedia.org/w/api.php?action=query&titles=${this.city}&prop=pageimages&format=json&origin=*`;
    let promise = new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      request.onload = function() {
        if(this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open('GET', url);
      request.send();
    });
    promise.then(function(response){
      const body = JSON.parse(response);
      const pages = body.query.pages;
      // get pageid
      let pageid = [];
      for(let id in pages) {
        pageid.push(id);
      }
      const cityImage = pages[pageid[0]].thumbnail.source;
      $("body").append(`<img src=${cityImage} id="city-image">`);
    });
  }
}