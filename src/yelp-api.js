import $ from 'jquery';

export class BusinessSearch {
  callBuisinessInfo(location, term) {
    const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}`;
    // var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=by-chloe&location=boston";
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
        console.log({totalResults});
        // If our results are greater than 0, continue
        if (totalResults.length > 0){
          // Itirate through the JSON array of 'businesses' which was returned by the API
          $.each(data.businesses, function(i, item) {
            // Store each business's object in a variable
            const id = item.id;
            const alias = item.categories[0].title;
            const phone = item.display_phone;
            const name = item.name;
            const rating = item.rating;
            const reviewCount = item.review_count;
            const address = item.location.address1;
            const city = item.location.city;
            const state = item.location.state;
            // Append our result into our page
            $('#business-info').append(`<div id="${id}"><b>${name}</b><br>Rate: ${rating}/5 ${reviewCount} Reviews<br>Category: ${alias}<br>${address}, ${city}, ${state}<br>${phone}</div>`);
          });
        } else {
          // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
          $('#business-info').append('<h5>We discovered no results!</h5>');
        }
      }
    });
  } 
}