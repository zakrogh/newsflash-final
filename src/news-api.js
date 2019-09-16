const getNewsApi = function(city){
  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://content.guardianapis.com/search?api-key=6761e014-564e-455a-bd12-fd368a4859e2&section=us-news&show-fields=trailText,thumbnail&q=` + city;
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
    content = JSON.parse(response);
    return content.response;
  }, function(error) {
    console.log(error);
  });
  return apiData;
}
