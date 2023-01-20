'Use Strict';

const axios = require('axios');

let cache = {};

async function getMovie(req, res, next) {
  try {
    let searchQuery = req.query.searchQuery;

    // *** CREATE KEY ***
    let key = `${searchQuery}Movie`; // ** key=moviePhoto cache[moviePhoto]
    // Cache = { key: }

    // *** IF IT EXISTS AND IT IS IN A VALID TIME - SEND THAT DATA ***
    if (cache[key] && (Date.now() - cache[key].timeStamp) < 300000) {

      // console.log('Cache was hit, images are present');
      res.status(200).send(cache[key].data);

    } else {


      let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&include_adult=false&query=${searchQuery}`;
      let movieResults = await axios.get(url);
      let groomedMovieData = movieResults.data.results.map(cityObj => new Movies(cityObj));



      //*** Cache the results from the API call **
      cache[key] = {
        data: groomedMovieData,
        timeStamp: Date.now()
      };
      res.status(200).send(groomedMovieData);
    }
  } catch (error) {
    next(error);
  }
}


class Movies {
  constructor(cityObj) {
    this.title = cityObj.original_title;
    this.overview = cityObj.overview;
  }
}

module.exports = getMovie;
