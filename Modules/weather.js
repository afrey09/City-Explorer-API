'Use Strict';

const axios = require('axios');

async function getWeather(req,response,next){
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
}

class Forecast {
  constructor(dayObj) {
    this.date = dayObj.valid_date;
    this.description = dayObj.weather.description;
  }
}

module.exports = getWeather;
