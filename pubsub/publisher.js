var redis = require("redis");
var publisher = redis.createClient();
publisher.publish("notification", "{\"message\":\"Hello world from Lucian!\"}", function(){
	process.exit(0);
});