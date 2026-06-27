// Router

const express = require('express');

const {
    discoverMovies,
    searchMovies, 
    getTrending
} = require('../controllers/movies.controller');

const router = express.Router()

// routes
router.get('/search', searchMovies);
router.get('/discover', discoverMovies);
router.get('/trending', getTrending);

module.exports = router;