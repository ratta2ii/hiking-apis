const API_KEY = process.env.API_KEY;

export function findTrails(){
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();

    const endPoint = "https://www.hikingproject.com/data/get-trails?";
    let url = `${endPoint}lat=47.6062&lon=-122.3321&maxDistance=10&key=${API_KEY}&maxResults=3`;

    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      }
      else {
        reject(Error(request.statusText));
      }
    };
    request.open("GET", url, true);
    request.send();
  });
}







// Add this back &sort=distance

// maxDistance - Max distance, in miles, from lat, lon. Default: 30. Max: 200.

// maxResults - Max number of trails to return. Default: 10. Max: 500.

// sort - Values can be 'quality', 'distance'. Default: quality.

// minLength - Min trail length, in miles. Default: 0 (no minimum).

// minStars - Min star rating, 0-4. Default: 0.


// let url = `https://www.hikingproject.com/data/get-trails?lat=47.6062&lon=-122.3321&maxDistance=10&key=${API_KEY}&maxResults=100&sort=distance`;


// let test = `https://www.hikingproject.com/data/get-trails?lat=47.6062&lon=-122.3321&maxDistance=10&key=200647098-0a0b56802af2813b7718381cda690066&maxResults=100&sort=distance`;
