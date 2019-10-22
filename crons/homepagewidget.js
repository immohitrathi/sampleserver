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

RedisCache.get("getHomeWidget_status",function(rerr, rres){
	if(rerr || rres==null) {
		RedisCache.set("getHomeWidget_status","1",60);
		request.get({url:'http://toicri.timesofindia.indiatimes.com/calendar_new_liupre.xml?',timeout:'20000'}, function(err, response, body) {		
			if (!err && response.statusCode == 200) {
						parseString(body, function (err, result) {
								let indiaMatches = [], liveMatch= [], iplMatches = [], otherLiveMatch = [];
								try{
									if(typeof(result)!='undefined' && typeof(result.calendar)!='undefined'){
										result = result['calendar']['match'];
		
										/* let url = "https://www.newspointapp.com/[lang]-news/cricket/match/"+result[0]['$']['matchfile'];
										let obj = Object.assign(result[0]['$'], {'url':url});
										RedisCache.set("getHomeWidget_1",obj);
										RedisCache.delete("getHomeWidget_status");
										process.exit(0); */	
									
		
		
		
										indiaMatches = Cricket.getIndiaLiveMatch(result);
										
										if(typeof(indiaMatches)!='undefined' && Object.keys(indiaMatches).length>0){
											let url = "/[lang]-news/cricket/live-scorecard-"+Cricket.makeUrl(indiaMatches['$'].teama_short)+"-vs-"+Cricket.makeUrl(indiaMatches['$'].teamb_short)+"-"+Cricket.makeUrl(indiaMatches['$'].matchnumber)+"-"+Cricket.makeUrl(indiaMatches['$'].matchtype)+"-"+Cricket.makeUrl(indiaMatches['$'].seriesname)+"-"+Cricket.getYear(indiaMatches['$'].matchdate_ist)+"/"+indiaMatches['$'].matchfile;
											let obj = Object.assign(indiaMatches['$'], {'url':url});
											RedisCache.set("getHomeWidget_1",obj);
											RedisCache.delete("getHomeWidget_status");
											process.exit(0);
											//callback(false,obj);
										} else {
											iplMatches = Cricket.getIplLiveMatch(result);
											if(typeof(iplMatches)!='undefined' && Object.keys(iplMatches).length>0){
												let url = "/[lang]-news/cricket/live-scorecard-"+Cricket.makeUrl(iplMatches['$'].teama_short)+"-vs-"+Cricket.makeUrl(iplMatches['$'].teamb_short)+"-"+Cricket.makeUrl(iplMatches['$'].matchnumber)+"-"+Cricket.makeUrl(iplMatches['$'].matchtype)+"-"+Cricket.makeUrl(iplMatches['$'].seriesname)+"-"+Cricket.getYear(iplMatches['$'].matchdate_ist)+"/"+iplMatches['$'].matchfile;
												let obj = Object.assign(iplMatches['$'], {'url':url});
												RedisCache.set("getHomeWidget_1",obj);
												RedisCache.delete("getHomeWidget_status");
												process.exit(0);
											} else {
												//do nothing
												// there is no live india matches and no live IPL matches, so delete existing match from cache
												RedisCache.delete("getHomeWidget_1");
												RedisCache.delete("getHomeWidget_status");
												process.exit(0);
											}
										}
									}
								} catch(ex){
									//do nothing
									RedisCache.delete("getHomeWidget_status");
									process.exit(0);
								}
						});
				} else {
					//do nothing
					RedisCache.delete("getHomeWidget_status");
					process.exit(0);
					
				}
		});
	} else {
		//request is already in queue, so no need to send another request
		process.exit(0);
	}
});
