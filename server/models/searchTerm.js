// searchTerm model


const mongoose = require('mongoose');

// Define schema for a searched term record
const SearchTermSchema = new mongoose.Schema({
    searchTerm : {
        type : String,
        required : [true, 'Search Term is required'],
        unique : true,
        trim : true,
        maxLength : 200
    },
    movie_id : {
        type : Number,
    },
    count : {
        type : Number,
        default : 1
    }, 
    poster_url : {
        type : String,
    }
}, { timestamps : true });


module.exports = mongoose.model('SearchTerm', SearchTermSchema);