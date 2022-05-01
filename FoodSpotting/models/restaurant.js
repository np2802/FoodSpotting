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
  owner: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
});
restoSchema.index({
	'$**': 'text'
});
module.exports = mongoose.model("restaurant", restoSchema);
