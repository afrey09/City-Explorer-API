'Use Strict';

const axios = require('axios');

let cache = {};

async function getWeather(req, response, next) {

  try {
    let lat = req.query.lat;
    let lon = req.query.lon;

    //*** CREATE KEY ***
    let key = `${lat}${lon}Weather`;

    if (cache[key] && (Date.now() - cache[key].timeStamp) < 300000) {
      response.status(200).send(cache[key].data);

    } else {

      //*** IF IT EXISTS AND IT IS IN A VALID TIME - SEND THAT DATA *

      let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=5&units=I`;
      let weatherResults = await axios.get(url);
      let weatherData = weatherResults.data.data.map(dayObj => new Forecast(dayObj));


      //*** Cache the results from the API call **
      cache[key] = {
        data: weatherData,
        timeStamp: Date.now()
      };
      response.status(200).send(weatherData);

    }
  } catch (error) {
    next(error);
  }
}

class Forecast {
  constructor(dayObj) {
    this.date = dayObj.valid_date;
    this.description = dayObj.weather.description;
  }
}

module.exports = getWeather;

