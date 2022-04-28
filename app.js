const express = require("express");
var morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require(`method-override`);

const config = require("./config");

const Resto = require("./models/restaurant");
const Comment = require("./models/comment");

//const mainRoutes = require("./routes/main");
const mainRoutes = require("./routes/main");
const restaurantRoutes = require("./routes/restaurants");
const commentRoutes = require("./routes/comments");

app.use(morgan("tiny"));

const seed = require(`./utils/seed`);
seed();

mongoose.connect(config.db.connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// console.log(config.db.username);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//User Routes
//app.use(commentRoutes);
app.use("/", mainRoutes);
app.use("/restaurants", restaurantRoutes);
app.use(`/restaurants/:id/comment`, commentRoutes);

app.listen(3000, () => {
  console.log("FoodSpotting is running...");
});
