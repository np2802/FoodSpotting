const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config");
const Resto = require("./models/restaurant");
const Comment = require("./models/comment");

const mongoose = require("mongoose");
mongoose.connect(config.db.connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// console.log(config.db.username);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/restaurants", (req, res) => {
  Resto.find()
    .exec()
    .then((foundResto) => {
      res.render("restaurants", { restaurants: foundResto });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/restaurants");
    });
});

app.post("/restaurants", (req, res) => {
  console.log(req.body);
  // restaurants.push(req.body);
  const newResto = {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    cuisine: req.body.cuisine,
    otime: req.body.otime,
    ctime: req.body.ctime,
    fdish: req.body.fdish,
    delivery: !!req.body.delivery,
    image: req.body.image,
  };

  Resto.create(newResto)
    .then((restaurant) => {
      console.log(restaurant);
      res.redirect("/restaurants");
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

app.get("/restaurants/new", (req, res) => {
  res.render("restaurants_new");
});

app.get("/restaurants/:id", (req, res) => {
  Resto.findById(req.params.id)
    .exec()
    .then((restaurant) => {
      res.render("restaurants_show", { restaurant });
    })
    .catch((err) => {
      res.send(err);
    });
});

// New Comment - Show Form
app.get("/restaurants/:id/comment/new", (req, res) => {
  res.render("comments_new", { restaurantId: req.params.id });
});

// Create Comment - Actually Update DB
app.post("/restaurants/:id/comment", (req, res) => {
  //Create Comment

  Comment.create({
    user: req.body.user,
    text: req.body.text,
    restaurantId: req.body.restaurantId,
  })
    .then((newComment) => {
      console.log(newComment);
      res.redirect("/restaurants/"); //${req.body.restaurantId}
    })
    .catch((err) => {
      console.log("Error");
      res.send(err);
      res.redirect("/restaurants");
    });
});

app.listen(3000, () => {
  console.log("FoodSpotting is running...");
});
