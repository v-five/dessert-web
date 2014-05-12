
module.exports = function(passport){

	var OAuth2Strategy  = require('passport-oauth').OAuth2Strategy;
	var config          = require('../config');
	var User            = require('../handler').user;
	var API             = require('../utils').API;
	var env = process.env.NODE_ENV || 'development';

	// Dessert login
	passport.use('dessert', new OAuth2Strategy({
				authorizationURL: env == "development" ? config.auth.localhost.authorizationURL : config.auth.dessert.authorizationURL,
				tokenURL        : env == "development" ? config.auth.localhost.tokenURL : config.auth.dessert.tokenURL,
				clientID        : config.auth.dessert.clientID,
				clientSecret    : config.auth.dessert.clientSecret,
				callbackURL     : env == "development" ? config.auth.localhost.callbackURL : config.auth.dessert.callbackURL
			},
			function(accessToken, refreshToken, info, done) {
				API.profile(accessToken, function(err, profile){
					if(err)
						return done(err);

					if(!profile)
						return done(null, false);

					User.login(accessToken, refreshToken, profile, info, function(err, user){
						if(err)
							return done(err);

						if(!user)
							return done(null, false);

						done(null, user);
					});
				});
			}
	));

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

}