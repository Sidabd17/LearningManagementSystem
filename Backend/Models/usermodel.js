const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum:["instructor" , "student"],
    default:'student'
  },
  enrolledcourses:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }
  ],
  profileUrl:{
    type:"String",
    default:"",
  }
}, {timestamps : true});

module.exports = mongoose.model("User" , userSchema) ;
