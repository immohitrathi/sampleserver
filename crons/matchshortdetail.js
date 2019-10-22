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

RedisCache.get("getMatchShortDetail_status",function(rerr, rres){
	if(rerr || rres==null) {
		RedisCache.set("getMatchShortDetail_status","1",60);
		request.get({url:'http://toicri.timesofindia.indiatimes.com/calendar_new_liupre.xml?',timeout:'20000'}, function(err, response, body) {		
			if (!err && response.statusCode == 200) {
						parseString(body, function (err, result) {
							if(typeof(result)!='undefined' && typeof(result.calendar)!='undefined' && typeof(result.calendar.match)!='undefined'){
								let matches = result.calendar.match;
								let liveMatches = Cricket.getLiveMatch(matches, true);
								
								for(let i=0;i<liveMatches.length;i++) {
									let match = liveMatches[i]['$'];
									let matchfile = liveMatches[i]['$']['matchfile'];
									let matchresponse = {'Matchdetail':{'$':{}}};


									matchresponse['Matchdetail']['$']['Event'] = match['seriesname'];
									matchresponse['Matchdetail']['$']['Status'] = match['matchstatus'];
									matchresponse['Matchdetail']['$']['Status_Id'] = match['matchstatus_Id'];
									matchresponse['Matchdetail']['$']['Venue'] = match['venue'];
									matchresponse['Matchdetail']['$']['Tosswonby'] = (match['toss_won_by']==match['teama_Id']?match['teama']:match['teamb']);
									matchresponse['Matchdetail']['$']['MatchNo'] = match['matchnumber'];
									matchresponse['Matchdetail']['$']['MatchResult'] = match['matchresult'];
									matchresponse['Matchdetail']['$']['Filename'] = match['matchfile']+".xml";
									matchresponse['Matchdetail']['$']['Match_Id'] = match['match_Id'];
									matchresponse['Matchdetail']['$']['Series_Id'] = match['series_Id'];
									matchresponse['Matchdetail']['$']['equation'] = match['equation'];
									matchresponse['Matchdetail']['$']['matchdate'] = match['matchdate_ist'];
									matchresponse['Matchdetail']['$']['matchtype'] = match['matchtype'];
									matchresponse['Matchdetail']['$']['currentinning'] = 'First';
									matchresponse['Matchdetail']['$']['MatchResult'] = match['matchresult'];
									matchresponse['Matchdetail']['$']['LastUpdateddate'] = match['matchdate_ist'];
									matchresponse['Matchdetail']['$']['matchtime_ist'] = match['matchtime_ist'];



									matchresponse['Matchdetail']['FirstInnings'] = {'d':{}};

									matchresponse['Matchdetail']['FirstInnings']['d'] = {
																								'Battingteam':match['teama'],
																								'Bowlingteam':match['teamb'],
																								'Battingteam_Id':match['teama_Id'],
																								'Bowlingteam_Id':match['teamb_Id'],
																							 }			
									console.log("getMatchShortDetail_"+matchfile);						
									RedisCache.set("getMatchShortDetail_"+matchfile, matchresponse);
								}
								
								RedisCache.delete("getMatchShortDetail_status");
								process.exit(0);
							}
						});
				} else {
					//do nothing
					RedisCache.delete("getMatchShortDetail_status");
					process.exit(0);
					
				}
		});
	} else {
		//request is already in queue, so no need to send another request
		process.exit(0);
	}
});
