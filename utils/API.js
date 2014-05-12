
exports.profile = function(accessToken, done){

	var endpoint = "/api/userinfo?access_token="+accessToken;
	var method = "GET";

	performRequest(endpoint, method, function(err, profile, info){

		if(err)
			return done(err);

		if(!profile)
			return done(null, false, info);

		done(null, profile);
	});
};

var performRequest = function (endpoint, method, done){
	var http = require('http');
	var options = {
		hostname: 'dessert-api.heroku.com',
//		port: 3000,
		path: endpoint,
		method: method
	};

	var req = http.request(options, function(response) {

		var body = '';
		response.on('data', function(chunk) {
			body += chunk;
		});

		if(response.statusCode == "200"){
			response.on('end', function() {
				try{
					var json = JSON.parse(body);
					done(null, json);
				}catch(e){
					done(e);
				}
			});
		}else{
			var info = new Object();

			info.code = response.statusCode;
			info.name = "HttpError";

			if(response.headers['www-authenticate']){
				var error_match = response.headers['www-authenticate'].match(/error[=]["]+(.*)",/);
				var error_description_match = response.headers['www-authenticate'].match(/error_description[=]["]+(.*)"/);
			}

			if(error_match)
				info.error = error_match[1];
			if(error_description_match)
				info.message = error_description_match[1];

			done(null, false, info);
		}
	});

	req.on('error', function(e) {
		done(false, e);
	});

	req.end();
}