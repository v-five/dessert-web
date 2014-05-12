
module.exports = function(app) {

	var swig         = require('swig');
	var mongoose     = require('mongoose');
	var bodyParser   = require('body-parser');
	var cookieParser = require('cookie-parser');
	var session      = require('express-session');
	var flash        = require('connect-flash');
	var passport     = require('passport');
	var config       = require("../config");
	var utils        = require("../utils");
	var set          = require('../settings');

	app.use(bodyParser());
	app.use(cookieParser());
	app.use(session({ secret: config.session.secret() }));

	set.mongoose(mongoose);
	set.passport(passport);
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(flash());
	app.engine('html', swig.renderFile);
	app.set('view engine', 'html');

	// Swig will cache templates, but you can disable that and use Express's caching instead:
	swig.setDefaults({cache: false});

	set.routes(app, passport);
};