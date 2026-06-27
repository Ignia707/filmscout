// Entry point


require('dotenv').config();
const cors = require('cors');
const express = require('express');

const connectToDB = require('./database/db');
const router = require('./routes/movies.routes');

const app =  express();
const PORT = process.env.PORT || 3000;



// Connect to database
connectToDB();


// middleware 
const corsOptions = {
    origin : process.env.FRONTEND_URL
}

app.use(cors(corsOptions));
app.use(express.json());


// Mount the router
app.use('/api/movies', router);


// Run the server
app.listen(PORT, () => {
    `Server running at PORT: ${PORT}...`;

});