const express = require("express");
const router = express.Router();

const Resto = require("../models/restaurant");
const Comment = require("../models/comment");
const isLoggedIn=require("../utils/isLoggedIn")
// const comment = require("../models/comment");
const checkRestoOwner=require("../utils/checkRestoOwner")
//index
router.get("/", async (req, res) => {
  console.log(req.user)
  try {
    const restaurants = await Resto.find().exec();
    res.render("restaurants", { restaurants});
  } catch (err) {
    console.log(err);
    res.send("You broke it... /index");
  }  
})

// Create
router.post("/", isLoggedIn, async (req, res) => {
  // console.log(req.body);
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
    image_link: req.body.image_link,
    owner: {
			id: req.user._id,
			username: req.user.username
		},
  }

  try {
    const restaurant = await Resto.create(newResto);
    req.flash("success","Restaurant Created!")
    res.redirect("/restaurants/"+ restaurant._id);
  } catch (err) {
    req.flash("error","Restaurant not Created!")
    res.redirect("/restaurants")
  }
});

// New
router.get("/new", isLoggedIn,(req, res) => {
  res.render("restaurants_new");
});

//search
router.get("/search", async (req, res) => {
	try {
		const restaurants = await Resto.find({
			$text: {
				$search: req.query.term
			}
		});
		res.render("restaurants", {restaurants});
	} catch (err) {
		console.log(err);
		res.send("broken search")
	}
})
// Show
router.get("/:id", async (req, res) => {
  try {
    const restaurant = await Resto.findById(req.params.id).exec();
    const comments = await Comment.find({ restaurantId: req.params.id });
    res.render("restaurants_show", {restaurant, comments})
  } catch (err) {
    console.log(err);
    res.send("You broke it... /restaurants/:id")
  }
  
})

// Edit
router.get("/:id/edit",checkRestoOwner, async (req, res) => {
  
    const restaurant = await Resto.findById(req.params.id).exec();
    res.render("restaurants_edit", { restaurant })
  // try {
    
  //   res.render("restaurants_edit", { restaurant })
  // } catch (err) {
  //   console.log(err);
  //   res.send("Broken... /restaurants/id/edit")
  // }
})

// Update
router.put("/:id",checkRestoOwner, async (req, res) => {
  const resto = {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    cuisine: req.body.cuisine,
    otime: req.body.otime,
    ctime: req.body.ctime,
    fdish: req.body.fdish,
    delivery: !!req.body.delivery,
    image_link: req.body.image_link,
  }
  try {
    const restaurant = await Resto.findByIdAndUpdate(req.params.id, resto, { new: true }).exec();
    req.flash("success","Restaurant Updated!")
    res.redirect(`/restaurants/${req.params.id}`);
  } catch (err) {
    console.log(err)
    req.flash("error","Restaurant Not Updated!")
    res.redirect("/restaurants");
  }
  
})

// Delete
router.delete("/:id",checkRestoOwner, async (req, res) => {
  try {
    const deletedResto = await Resto.findByIdAndDelete(req.params.id).exec();
    req.flash("success","Restaurant Deleted!")
    res.redirect("/restaurants");
  } catch (err) {
    console.log(err);
    req.flash("error","Restaurant Not Deleted!")
    res.redirect("back");
  }
})
// function isLoggedIn(req, res, next){
//   if(req.isAuthenticated())
//   {
//     return next();
//   }
//   else
//   {
//     res.redirect("/login")
//   }
// };
module.exports = router;
