'use strict';

console.log('First server');

//**** REQUIRES ****
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getWeather = require('./Modules/weather.js');
const getMovie = require('./Modules/movie.js');

//*** FOR LAB - DON'T FORGET TO REQUIRE YOUR START JSON FILE *** 
//let data = require('./data/weather.json');



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


app.get('/weather', getWeather);

app.get('/movies', getMovie);





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
