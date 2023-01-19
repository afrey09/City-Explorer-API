'use strict'

console.log('First server');

//**** REQUIRES ****
const axios = require('axios');
const express = require('express');
require('dotenv').config();
const cors = require('cors');

//*** FOR LAB - DON'T FORGET TO REQUIRE YOUR START JSON FILE *** 
let data = require('./data/weather.json');



//**** Once express is in we need to use it - per express docs *
//*** app === server **
const app = express();

//**** MIDDLEWARE **
//**** cors is middleware - acts as a security guard that allows us to share resources across the internet *** 
app.use(cors());


//** DEFINE A PORT FOR MY SERVER TO RUN ON *** 
const PORT = process.env.PORT || 3002;


//**** ENDPOINTS ***

// **** Base endpoint - proof of life for server
// *** 1st argument - endpoint in quotes
//*** 2nd argument - callback which will execute when someone hit that point ***

//**** Callback function - 2 parameters: Request, response (req,res) */
app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server');
});

app.get('/hello', (request, response) => {
  console.log(request.query);

  let firstName = request.query.firstName;
  let lastName = request.query.lastName;

  response.status(200).send(`Hello ${firstName} ${lastName}! Welcome to my server!`);
});





app.get('/weather', async (req, res, next) => {
  try {
    let lat = req.query.lat;
    let lon = req.query.lon;
    let searchQuery = req.query.searchQuery;

    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=5&units=I`;

    let weatherResults = await axios.get(url);
    console.log('weather results', weatherResults.data);

    //TODO groom the data

    //let groomedData = weatherResults.data.results.map(dayObj => new Weather(dayObj));

    

  

    //TODO use a class to minify the bulky data
    let weatherData = weatherResults.data.data.map(dayObj => new Forecast(dayObj));

    res.status(200).send(weatherData);


  } catch (error) {
    next(error);
  }
});

app.get('/movies', async (req, res, next) => {
  try {

    let searchQuery = req.query.searchQuery;

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&include_adult=false&query=${searchQuery}`;

    let movieResults = await axios.get(url);

    //TODO groom the data

    let groomedMovieData = movieResults.data.results.map(cityObj => new Movies(cityObj));

    res.status(200).send(groomedMovieData);
  } catch (error) {
    next(error);
  }
});
//**** FORECAST CLASS TO GROOM BULKY DATA */

class Forecast {
  constructor(dayObj) {
    this.date = dayObj.valid_date;
    this.description = dayObj.weather.description;
  }
}
class Movies {
  constructor(cityObj) {
    this.name=cityObj.original_title;
    this.description=cityObj.overview;
  }
}

//**** CATCH ALL ENDPOINT - NEEDS TO BE YOUR LAST DEFINED ENDPOINT **** 

app.get('*', (request, response) => {
  response.status(404).send('This page does not exist');
});

//**** ERROR HANDLING - PLUG & PLAY FROM EXPRESS DOCS - SHOULD ALSO LIVE AT BOTTOM OF PAGE ****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


//**** SERVER START **
app.listen(PORT, () => console.log(`We are running on port: ${PORT}`));