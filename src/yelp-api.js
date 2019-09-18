import $ from 'jquery';

export class BusinessSearch {
  constructor(location, term) {
    this.location = location;
    this.term = term;
  }

  callBusinessInfo() {
    const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${this.location}&term=${this.term}`;
    let promise = new Promise(function(resolve, reject) {
      const  request = new XMLHttpRequest();
      request.onload = function() {
        if(this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open('GET', url);
      request.setRequestHeader('Authorization', `Bearer ${process.env.apiKey}`);
      request.send();
    });
    // Variable to point out BusinessSearch class
    let self = this;
    promise.then(function(response) {
      let body = JSON.parse(response);
      const totalResults = body.businesses;
        // If our results are greater than 0, continue
        if (totalResults.length > 0){
          self.renderInfo(totalResults);
        } else {
          $('#business-info').append('<h5>We discovered no results!</h5>');
        }
      return body.response;
    }, function(error) {
      console.log(error);
    });
  }

  // Loop through the totalResults, store the values in variables then render.
  renderInfo(totalResults) {
    let self = this;
    $.each(totalResults, function(i, item) {
      // Store each business's object in a variable
      const id = item.id;
      const image = item.image_url;
      const link = item.url;
      const alias = item.categories[0].title;
      const phone = item.display_phone;
      const businessName = item.name;
      const rating = item.rating;
      const reviewCount = item.review_count;
      const address = item.location.address1;
      const city = item.location.city;
      const state = item.location.state;
      $(`#${self.term}`).append(
        `<div id="${id}" class="business-container">
          <a href="${link}" class="business-link">${businessName}</a>
          <img class="business-image" src=${image}>
          Rate: ${rating}/5  with ${reviewCount} Reviews<br>Category: ${alias}<br>
          ${address}, ${city}, ${state}<br>
          ${phone}
        </div><hr>`
      );
    });
  }
}