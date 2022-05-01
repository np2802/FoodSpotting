const Resto = require("../models/restaurant");

const checkRestoOwner = async (req, res, next) => {
	if (req.isAuthenticated()) {  // Check if the user is logged in
		// If logged in, check if they own the comic
		const restaurant = await Resto.findById(req.params.id).exec();
		if (restaurant.owner.id.equals(req.user._id)) {
			next();
		} else { // If not, redirect back to show page
			req.flash("error", "You don't have permission to do that!")
			res.redirect("back");
		}
	} else { // If not logged in, redirect to /login
		req.flash("error", "You must be logged in to do that!")
		res.redirect("/login");
	}
}

module.exports = checkRestoOwner;