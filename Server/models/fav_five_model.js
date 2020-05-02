const mongoose = require("mongoose");
const Fav_five = new mongoose.Schema({
  user_id: { type: String, required: true },
  players: { type: Array },
});

module.exports = mongoose.model("Fav_five", Fav_five);
