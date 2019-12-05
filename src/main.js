import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { findTrails } from './apis/trails';
import { findWeather } from './apis/weather';
//import { findCampgrounds } from './apis/camping';
//import { findDistance } from './apis/distance';


$(document).ready(function() {

  $("#find-trails").click(function () {

    let dateInput = $("input#date-input").val();
    let maxHikeDistance = $("input#trail-distance").val();

    findTrails()
      .then((response) => {

        $("#display-results").empty();
        const body = JSON.parse(response);
        const trails = body.trails;

        for (let i in trails){
          if (trails[i].length < maxHikeDistance) {

            let trailCoordinates = `${trails[i].latitude},${trails[i].longitude}`;


            /* Dark Sky Weather API. Trail coordinates, and the dateInput variable are used as arguments to find weather for that area on a particular date chosen by the user. */

            findWeather(trailCoordinates, dateInput)
              .then((response) => {

                let weatherBody = JSON.parse(response);
                let weatherSummary = weatherBody.daily.data[0].summary;
                let temperature = weatherBody.daily.data[0].temperatureHigh;
                temperature = parseInt(temperature);
              
                $("#display-results").append(`<ul><li>${trails[i].name}</li><li>${trails[i].location}</li><li>${trails[i].length} mile hike</li><li>${weatherSummary}</li><li>${temperature} degree high this day.</li></ul>`);
              },
              function(error) {
                $("#display-results").empty().append(`<h5>There was an error processing your request: ${error.message}</h5>`);
              });
          }

        }
      },
      function(error) {
        $("#display-results").empty().append(`<h5>There was an error processing your request: ${error.message}</h5>`);
      });

  });

});











// <li>${trails[i].latitude}</li><li>${trails[i].longitude}</li>
// let trailCoordinates = `${trails[i].latitude},${trails[i].longitude}`;





// findCampgrounds(trails[i].latitude, trails[i].longitude)
// .then((response) => {
//   const body = JSON.parse(response);
//   let campgrounds = body.campgrounds;
// },
// function(error) {
//   console.error(`I am the error message: ${error.message}`);
// });





// findDistance(trailCoordinates);
// .then((response) => {

//   let distanceBody = JSON.parse(response);
//   let distance = distanceBody.rows[0].elements[0].distance.text;
//   let duration = distanceBody.rows[0].elements[0].duration.text;
// },
// function(error) {
//   console.error(`I am the error message: ${error.message}`);
// });
