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
* apiData.results[i].fields.thumbnail   //thumbnail picture of news story
* apiData.results[i].webUrl             //url link of news story
* apiData.results[i].webTitle           //title of news story
* apiData.results[i].fields.trailText   //brief summary of news story
* apiData.results[i].webPublicationDate //date of news story, suggest .slice(0, 10) to cut out time of day
*/
export const getNewsApi = function(city){
  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://content.guardianapis.com/search?api-key=${process.env.NEWS_API_KEY}&section=us-news&show-fields=trailText,thumbnail&q=` + city;
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    }
    request.open("GET", url, true);
    request.send();
  });

  let apiData = promise.then(async function(response) {
    let content = JSON.parse(response);
    return content.response;
  }, function(error) {
    console.log(error);
  });
  return apiData;
}
