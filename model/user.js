
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var User = new Schema({

	username     : String,
	accessToken  : String,
	refreshToken : String

});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', User);
