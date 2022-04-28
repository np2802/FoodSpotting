const mongoose = require("mongoose");
const restoSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  cuisine: String,
  otime: String,
  ctime: String,
  delivery: Boolean,
  fdish: String,
  image_link: String,
});

module.exports = mongoose.model("restaurant", restoSchema);
