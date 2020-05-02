var mongoose = require("mongoose");
const User = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  sur_name : { type:String, required:true, trim:true},
  email: {type: String, required: true, trim:true},
  password: {type: String, required: true, trim:true},
  terms: {type: Boolean, required:true},
  avatar: {type: String, required:false},
  fav_team: {type:Object, required:false},
  fav_five: {type:String}
/*   salt:{type: String, required:false, trim:true},
  age: {type:Number, required:false}, */
});

module.exports = mongoose.model('User', User);