const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		 req.flash("error", "User must be logged in, Please Login or Sign Up first");
		res.redirect("/login");
	}
};

module.exports = isLoggedIn;