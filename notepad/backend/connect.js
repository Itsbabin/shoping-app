const mongoose = require('mongoose')

const uri = 'mongodb://127.0.0.1:27017/test';
const connectDB = async () =>{
  await mongoose.connect(uri);
    console.log("connected");
}

  module.exports = connectDB;