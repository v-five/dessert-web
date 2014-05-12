
var User     = require('../model').user;

exports.login = function(accessToken, refreshToken, profile, info, done){

	User.findOne({ 'username' : profile.username }, function(err, user) {

		if(err)
			return done(err);

		if(user){

			user.accessToken  = accessToken;
			user.refreshToken = refreshToken;

			return done(null, user);
		}

		var newUser          = new User();

		newUser.username     = profile.id;
		newUser.accessToken  = accessToken;
		newUser.refreshToken = refreshToken;

		newUser.save(function(err) {
			if (err)
				throw err;

			return done(null, newUser);
		});
	});
};