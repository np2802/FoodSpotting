//**************************
//IMPORTS
//**************************
// NPM Imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const flash= require("connect-flash")
const mongoose = require("mongoose");
const methodOverride = require(`method-override`);
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

// Config Imports
const config = require("./config");

// Route Imports
//const mainRoutes = require("./routes/main");
const mainRoutes = require("./routes/main");
const restaurantRoutes = require("./routes/restaurants");
const commentRoutes = require("./routes/comments");
const authRoutes = require("./routes/auth");
// Model Imports
const Resto = require("./models/restaurant");
const Comment = require("./models/comment");
const User = require('./models/user');
//**************************
//DEVELOPMENTS
//**************************
//Morgan
app.use(morgan('tiny'))

//Seed the DB
// const seed = require("./utils/seed");
// seed();

//**************************
//CONFIG
//**************************
// COnnect to DB
mongoose.connect(config.db.connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  // useCreateIndex: true
});

// console.log(config.db.username);

// Express Config
app.set("view engine", "ejs");
app.use(express.static("public"));

// Express Session Config
app.use(expressSession({
	secret: "cytcyuguyhuiiijuyctrxtyuvuybjbjknjknkjnkjhiuhiu",
	resave: false,
	saveUninitialized: false
}));

//Body Parser config
app.use(bodyParser.urlencoded({ extended: true }));

//Method Override Config
app.use(methodOverride("_method"));

// Connect Flash
app.use(flash());

// Passport Config
app.use(passport.initialize());
app.use(passport.session());  // Allows persistent sessions
passport.serializeUser(User.serializeUser());  // What data should be stored in session
passport.deserializeUser(User.deserializeUser());  // Get the user data from the stored session
passport.use(new LocalStrategy(User.authenticate()));  // Use the local strategy

// State Config
app.use((req, res, next) => {
	res.locals.user = req.user;
	res.locals.errorMessage = req.flash("error");
	res.locals.successMessage = req.flash("success");
	next();
})

// Route Config
//app.use(commentRoutes);
app.use("/", mainRoutes);
app.use("/", authRoutes);
app.use("/restaurants", restaurantRoutes);
app.use(`/restaurants/:id/comment`, commentRoutes);


//**************************
//LISTEN
//**************************
app.listen(3000, () => {
  console.log("FoodSpotting is running...");
});
