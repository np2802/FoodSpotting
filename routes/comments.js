const express = require("express");
const router = express.Router({ mergeParams: true });

const Comment = require("../models/comment");

// New Comment - Show Form
router.get("/new", (req, res) => {
  res.render("comments_new", { restaurantId: req.params.id });
});

// Create Comment - Actually Update DB
router.post("/", (req, res) => {
  //Create Comment

  Comment.create({
    user: req.body.user,
    text: req.body.text,
    restaurantId: req.body.restaurantId,
  })
    .then((newComment) => {
      console.log(newComment);
      res.redirect(`/restaurants/${req.body.restaurantId}`);
    })
    .catch((err) => {
      console.log("Error");
      res.send(err);
      res.redirect(`/restaurants/${req.body.restaurantId}`);
    });
});

module.exports = router;
