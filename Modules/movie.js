'Use Strict';

const axios = require('axios');

async function getMovie (req,res,next) {
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

}

class Movies {
  constructor(cityObj) {
    this.title=cityObj.original_title;
    this.overview=cityObj.overview;
  }
}

module.exports = getMovie;
