import $ from 'jquery';

export class BusinessSearch {
  constructor(location, term) {
    this.location = location;
    this.term = term;
  }
  callBuisinessInfo() {
    const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${this.location}&term=${this.term}`;
    
    $.ajax({
      url: url,
      headers: {
        'Authorization':`Bearer ${process.env.apiKey}`,
      },
      method: 'GET',
      dataType: 'json',
      success: function(data){
        // Grab the results from the API JSON return
        const totalResults = data.businesses;
        // If our results are greater than 0, continue
        if (totalResults.length > 0){
          // Itirate through the JSON array of 'businesses'
          $.each(totalResults, function(i, item) {
            // Store each business's object in a variable
            const id = item.id;
            const url = item.url;
            const alias = item.categories[0].title;
            const phone = item.display_phone;
            const name = item.name;
            const rating = item.rating;
            const reviewCount = item.review_count;
            const address = item.location.address1;
            const city = item.location.city;
            const state = item.location.state;
            // Append our result into our page
            $('#business-info').append(`
              <div id="${id}">
                <a href="${url}"><p>${name}</p></a>
                Rate: ${rating}/5  with ${reviewCount} Reviews<br>Category: ${alias}<br>
                ${address}, ${city}, ${state}<br>
                ${phone}<hr>
              </div>`);
          });
        } else {
          // If our results are 0; display a no result message.
          $('#business-info').append('<h5>We discovered no results!</h5>');
        }
      },
      error: function(error){
        throw new Error("Oops, we got an error!");
      }
    });
  } 
}