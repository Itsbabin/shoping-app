const mongoose = require('mongoose')
const { Schema } = mongoose;

const notesSchema = new Schema({
  username : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'username'
  },
  title : {
    type : String,
    required : true
  },
    description : {
    type : String,
    required : true
  },
    tag : {
    type : String,
    required : true,
  }

});

module.exports = mongoose.model('notes',notesSchema);