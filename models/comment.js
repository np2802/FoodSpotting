const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  user: String,
  text: String,
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resto",
  },
});

module.exports = mongoose.model("comment", commentSchema);
