function cardCreate() {
    for (let index = 0; index < cityTitle.length; index++) {
        //variables for cards
        const title = cityTitle[index];
        const picURL = cityPic[index];
        var picSrc;

        // random citys have the full address
        if (picURL.startsWith("http")) {
            picSrc = picURL;
        }
        // search citys have the relative
        else {
            picSrc = baseURL + picURL;
        }

        //outer div column
        var cityDiv = $("<div>");
        cityDiv.attr("class", "col-md cityDiv");

        //inner city div
        var cityCard = $("<div>");
        cityCard.attr("class", "card cityCard");

        //generates city card image
        var cityImage = $("<img>");
        cityImage.attr("class", "card-img-top");
        cityImage.attr("src", picSrc);
        cityImage.attr("city-id", cityId[index]);
        cityImage.on("click", cityDeets);

        //adds image element to card
        cityCard.append(cityImage);

        //city card body
        var cardBody = $("<div>");
        cardBody.attr("class", "card-body");

        //generates card text aka title of city
        var p = $("<p>").text(title);
        p.attr("class", "card-text");

        //adds card text (city title) to the card body
        cardBody.append(p);
        //adds card body to the city card
        cityCard.append(cardBody);
        //adds 
        cityDiv.append(cityCard);
        //the whole card enchilada
        randomcitysDiv.append(cityDiv);
    }
}
// cardCreate();