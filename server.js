'use strict'

console.log('First server');

//**** REQUIRES ****
const express = require('express');
require('dotenv').config();
const cors = require('cors');



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
app.get('/', (request, response)=>{
  response.status(200).send('Welcome to my server');
});



//**** SERVER START **
app.listen(PORT, ()=>console.log(`We are running on port: ${PORT}`));