export const getImageApi = (city) => {
  let promise = new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest();
    const url = `https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?image_type=photo&q=${city}&key=${process.env.IMAGE_API_KEY}&safesearch=true&orientation=horizontal&per_page=3`;
    request.onload = function() {
      if(this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    }
    request.open("GET", url, true);
    request.send();
  });
  let imageApi = promise.then(async function(response){
    return JSON.parse(response);
  }, function(error){
    console.log(error);
  });
  return imageApi;
};