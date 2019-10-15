var redis = require("redis");
var config = require("./config");

var client = redis.createClient(config.redisPort, config.redisHost);

if(config.redisAuth) {
	client.auth(config.redisAuth, function(err, response){
		if(err){
			throw err;
		}
	});
}

client.publish("notification", "{\"message\":\"Hello world from Lucian!\"}", function(){
	process.exit(0);
});
