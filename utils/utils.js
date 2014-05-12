
exports.isLoggedIn = function(req, res, next){
	if (req.isAuthenticated()) return next();
	res.redirect('/login');
};

exports.generateUID = function(){
	return require('node-uuid').v4();
};