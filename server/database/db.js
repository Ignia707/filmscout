// Database

const mongoose = require('mongoose');

const connectToDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to mongoDB database');
        
    } catch(err) {
        console.error(`Error connecting to MongoDB database: ${err}`);
        
    }
}

module.exports = connectToDB;