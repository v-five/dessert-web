module.exports = function(app, passport) {

	var utils = require("../utils");

	// Home page
	app.get('/', function(req, res){
		res.redirect("profile");
	});

	// Profile page
	app.get('/profile',	utils.isLoggedIn,	utils.render.profile);

	// Login
	app.get('/login', passport.authenticate('dessert', {scope: ['id', 'username']}));

	// Logout
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});



	// Process the login
	app.get('/auth/dessert/callback', passport.authenticate('dessert', {
		successRedirect : '/profile',
		failureRedirect : '/',
		failureFlash : true
	}));

};