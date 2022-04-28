const express = require("express");
const router = express.Router();

const Resto = require("../models/restaurant");
const Comment = require("../models/comment");
const comment = require("../models/comment");

router.get("/", (req, res) => {
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

router.post("/", (req, res) => {
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
      res.redirect(`/restaurants` + newResto._id);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.get("/new", (req, res) => {
  res.render("restaurants_new");
});

router.get("/:id", (req, res) => {
  Resto.findById(req.params.id)
    .exec()
    .then((restaurant) => {
      Comment.find({ restaurantId: req.params.id }, (err, comment) => {
        if (err) {
          res.send(err);
        } else {
          res.render("restaurants_show", {
            restaurant: restaurant,
            comment: comment,
          });
        }
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/:id/edit", (req, res) => {
  Resto.findById(req.params.id)
    .exec()
    .then((restaurant) => {
      res.render("restaurants_edit", { restaurant });
    });
});

router.put("/:id", (req, res) => {
  const resto = {
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

  Resto.findByIdAndUpdate(req.params.id, resto, { new: true })
    .exec()
    .then((updatedRestaurant) => {
      console.log(updatedRestaurant);
      res.redirect(`/restaurants/${req.params.id}`);
    })
    .catch((err) => {
      res.send("Error:", err);
    });
});

router.delete(`/:id`, (req, res) => {
  Resto.findByIdAndDelete(req.params.id)
    .exec()
    .then((deletedRestaurant) => {
      console.log("Deleted :", deletedRestaurant);
      res.redirect(`/restaurants`);
    })
    .catch((err) => {
      res.send("Error Deleting : ", err);
    });
});

module.exports = router;
