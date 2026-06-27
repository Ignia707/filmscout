// Controllers

const searchTerm = require('../models/searchTerm');


// API end point - to get movies
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;
const API_OPTIONS = {
    method : 'GET',
    headers  : {
        accept : 'application/json',
        Authorization : `Bearer ${API_KEY}`
    }
};


const searchMovies =  async(req, res) => {
  // destructure 
  const { query } = req.query;
  
  // Handle bad request
  if(!query || query.trim().length === 0) {
    return res.status(400).json({
      success : false,
      message : 'Bad request. Give a valid query.'
    });
  }

  // Fetch movies by search query
  try {
    const endPoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`;

    const response = await fetch(endPoint, API_OPTIONS);
    if (!response.ok) {
        throw new Error('Failed to fetch queried movies');
    }

    const data = await response.json();

    // Update searchTerm or create record
    try {
        if(data.results.length > 0) {
            await searchTerm.findOneAndUpdate(
              { searchTerm : query },
              { 
                $inc : { count : 1 },
                $setOnInsert : { 
                movie_id : data.results[0].id,
                poster_url : `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`
              }, 
              },
              { upsert : true }
        );
      }

    } catch(err){
      console.error('Error updating search count: ', err);
      
    }

    // Sucess
    res.status(200).json({
      success : true, 
      message : 'Movies fetched for query succesfully',
      data : data.results
    }); 

  } catch(err) {
    console.error(err);

    // Server side error
    res.status(500).json({
      success : false,
      message : 'Error fetching movies. Try again',
    });

  }
}

const discoverMovies =  async(req, res) => {
  // Fetch movies - all
  try {
    const endPoint =`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
    
    const response = await fetch(endPoint, API_OPTIONS);
    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }

    const data = await response.json();

    // Sucess
    res.status(200).json({
      success : true, 
      message : 'Movies fetched succesfully',
      data : data.results
    }); 

  } catch (err) {
    console.error(err);
    
    // Server side error
    res.status(500).json({
      success : false,
      message : 'Error fetching movies. Try again',
    });

  }
}

const getTrending =  async(req, res) => {
  // get trending movies - by count
  try {
    const trendingMovies = await searchTerm.find().sort({ count : -1 }).limit(5);

    // Success
    res.status(200).json({
      success : true,
      message : 'Trending Movies fetched successfully',
      data : trendingMovies
    });

  } catch(err) {
    console.error(err);
    
    // Server side error
    res.status(500).json({
      success : false,
      message : 'Error fetching movies. Try again',
      data : []
    });
  }
}

module.exports = {
  discoverMovies,
  searchMovies, 
  getTrending
};