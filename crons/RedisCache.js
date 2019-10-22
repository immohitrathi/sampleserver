const redis = require("redis");
const config = require("./config");

const options = {'db':config.REDIS_CONFIG.db, password:config.REDIS_CONFIG.pass};
console.log(config, options);
const client = redis.createClient(config.REDIS_CONFIG.port, config.REDIS_CONFIG.host,options);
client.select(config.REDIS_CONFIG.db); 

client.on("error", function (err) {
//    Util.sendEmail("RedisConnectionError "+err);
});


module.exports = {
	set:function(key, value, time){
	  value = JSON.stringify(value);
	  if(typeof(time)=='undefined'){
	  	time = 60 * 60 * 24 * 365;
	  }
	  client.set(key, value,'EX', time );
	},
	get:function(key, cb){
		if(process.env.NODE_ENV=='development'){
			//cb(true, null);
			//return;
		}
		client.get(key, function(err, reply){
			if(reply==null){
			  	cb(true, null);
			} else {
				try {
					reply = JSON.parse(reply);
				} catch(ex){}
				if(reply){
					cb(false, reply);
				} else {
					cb(true, null);
				}
			}
		});		
	},
	delete:function(key, cb){
		client.del(key);
		if(cb){
			cb(false)
		}
	},
	multi:function(key,cb){
		client.keys(key,function (err, replies) {
			cb(err, replies);
	    });
	}
}