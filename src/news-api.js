/* Setup Instructions:
* include at top of main js:
* import { getNewsApi } from './news-api.js';
*
* parent function must include async
*
* function call must include await
* ex: console.log(await getNewsApi("seattle"));
*/
/* api structure:
* apiData.value[i].image.thumbnail.contentUrl //image
* apiData.value[i].name                       //title of article
* apiData.value[i].url                        //url of article
* apiData.value[i].description                //summary of article
* apiData.value[i].datePublished              //date article published
*/
export const getNewsApi = function(city){
  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://api.cognitive.microsoft.com/bing/v7.0/news/search?&q=${city}`;
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    }
    request.open("GET", url, true);
    request.setRequestHeader("Ocp-Apim-Subscription-Key", process.env.NEWS_API_KEY);
    request.send();
  });

  let apiData = promise.then(async function(response) {
    return JSON.parse(response);
  }, function(error) {
    console.log(error);
  });
  return apiData;
}
