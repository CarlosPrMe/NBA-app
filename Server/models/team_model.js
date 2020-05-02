const mongoose = require("mongoose");
const Team = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  id_team: { type: Number, required: true },
  image_url: { type: String, required: true },
  abbreviation: { type: String },
  city: { type: String },
  conference: { type: String },
  division: { type: String },
  full_name: { type: String },
  team_color: {type: String}
});

module.exports = mongoose.model("Team", Team);
