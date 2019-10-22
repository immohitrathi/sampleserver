let redis = require("redis");
const request = require('request');
var parseString = require('xml2js').parseString;
var nodemailer = require('nodemailer');
var Cricket = require('../src/server/models/Cricket');
var RedisCache = require("./RedisCache");

let config = require("./config");
let options = {'db':config.REDIS_CONFIG.db, password:config.REDIS_CONFIG.pass};

let client = redis.createClient(config.REDIS_CONFIG.port, config.REDIS_CONFIG.host,options);
client.select(config.REDIS_CONFIG.db);
client.on("error", function (err) {
	console.log("Error " + err);
    sendEmail("Error " + err);
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'newspointpwa@gmail.com',
    pass: 'times@123'
  }
});

function sendEmail(text){
  var mailOptions = {
    from: 'newspointpwa@gmail.com',
    to: 'sandeep.panwar@timesinternet.in',
    subject: 'Cron Script not working',
    text: text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      //console.log(error);
    } else {
      //console.log('Email sent: ' + info.response);
    }
  });
}
//getMatchList
let count = 0;
RedisCache.get("getMatchPlayers_status",function(rerr, rres){
	if(rerr || rres==null) {
		RedisCache.set("getMatchPlayers_status","1",60);

		Cricket.getMatchList([],function(err, res){
			if(!err && typeof(res)!=='undefined') {
				let nowshowing = res['nowshowing'];
				let liveMatches = Cricket.getLiveMatch(nowshowing, true);
				if(typeof(liveMatches)!=='undefined' && liveMatches.length>0) {
					for(let i=0;i<liveMatches.length;i++) {
						let matchfile = liveMatches[i]['$']['matchfile'];
						Cricket.getMatchPlayersCron(matchfile, function(merr, mres){
							if(!merr && typeof(mres)!=='undefined') {
								//we got the result, save it in redis
								RedisCache.set("getMatchPlayers_"+matchfile,mres);
								count++;
								if(count>=liveMatches.length) {
									RedisCache.delete("getMatchPlayers_status");
									process.exit();
								}
							} else {
								//there is some problem in getting players detail
								RedisCache.delete("getMatchPlayers_status");
								process.exit();
							}
						})
					}
				} else {
					RedisCache.delete("getMatchPlayers_status");
					process.exit(0);
				}
			} else {
				RedisCache.delete("getMatchPlayers_status");
				process.exit(0);				
			}
		});
	} else {
		//request is already in queue, so no need to send another request
		process.exit(0);
	}
});
