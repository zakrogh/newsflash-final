export const getCoordinates = function(city){
  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${process.env.GEOCODE_API_KEY}`;
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
    let content = await JSON.parse(response);
    return content;
  }, function(error) {
    console.log(error);
  });
  return apiData;
}
