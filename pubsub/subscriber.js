// redis-cli -h redis-14488.c15.us-east-1-4.ec2.cloud.redislabs.com -p 14488 -a z6S3dEWg7nkN8LAwx4dC2PA6p0KRGUDj

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

client.on("message", function (channel, message) {
	console.log("Message: " + message + " on channel: " + channel + " is arrive!");
});
client.subscribe("notification");
