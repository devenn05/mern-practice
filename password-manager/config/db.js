const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("MongoDB connected Successfully.")
    } catch (error){
        console.error("Error connecting to MongoDB database....", error.message);
        process.exit(1);
    }
}

const disconnectDB = async () =>{
    await mongoose.connection.close();
};

module.exports = {connectDB, disconnectDB};