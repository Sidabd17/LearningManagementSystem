const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();

const connectDB = async () =>{
    try{
       await mongoose.connect(process.env.MONGO_URI);
       console.log("MongoDB Connected"); 
    }
    catch(error){
       console.log("Error while connecting to database" , error.message);
    }
}

module.exports = connectDB;
