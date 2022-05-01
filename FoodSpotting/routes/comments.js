const express = require("express");
const router = express.Router({ mergeParams: true });

const Comment = require("../models/comment");
const Resto = require('../models/restaurant')
const isLoggedIn=require("../utils/isLoggedIn")
const checkCommentOwner=require("../utils/checkCommentOwner")
// New Comment - Show Form
router.get("/new",isLoggedIn, (req, res) => {
  res.render("comments_new", { restaurantId: req.params.id });
});

// Create Comment - Actually Update DB
router.post("/",isLoggedIn, async (req, res) => {
  try {
    const comment = await Comment.create({
      user: {
        id: req.user._id,
        username: req.user.username
      },
      text: req.body.text,
      restaurantId: req.body.restaurantId,
    });
    // console.log(comment);
    req.flash("success","Comment Created!")
    res.redirect(`/restaurants/${req.body.restaurantId}`);
  } catch (err) {
    console.log(err);
    req.flash("error","Comment not Created!")
    res.redirect("/restaurants")
  }
  
})

//Edit Comment
router.get("/:commentId/edit",checkCommentOwner, async (req,res) => {
  try {
    const restaurant = await Resto.findById(req.params.id).exec();
    const comment = await Comment.findById(req.params.commentId).exec();
   
    // console.log("restaurant:", restaurant)
    // console.log("comment:", comment)
    res.render("comments_edit",{restaurant, comment})
  } catch (err) {
    console.log(err);
    
    res.redirect("/restaurants")
  }
})

//Update
router.put("/:commentId",checkCommentOwner, async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, {new: true});
    console.log(comment);
    req.flash("success","Comment Edited!")
    res.redirect(`/restaurants/${req.params.id}`);
  } catch (err) {
    console.log(err);
    req.flash("error","Error editing comment!")
    res.redirect("/restaurants")
  }
})

//Delete
router.delete("/:commentId",checkCommentOwner, async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    req.flash("success","Comment Deleted!")
    res.redirect(`/restaurants/${req.params.id}`);
  } catch (err) {
    console.log(err);
    req.flash("error","Error deleting comment!")
    res.redirect("back")
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
