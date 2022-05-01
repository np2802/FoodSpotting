const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  // user: String,
  user: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
  text: String,
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resto",
  },
 
});

module.exports = mongoose.model("comment", commentSchema);
