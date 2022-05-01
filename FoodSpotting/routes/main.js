const express = require("express");
const router = express.Router();
const isLoggedIn=require("../utils/isLoggedIn")
router.get("/", (req, res) => {
  res.render("landing");
});
router.get("/account", isLoggedIn, (req, res) => {
	res.render("account");
});
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
