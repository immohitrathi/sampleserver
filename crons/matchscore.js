let redis = require("redis");
const request = require('request');
var parseString = require('xml2js').parseString;
var nodemailer = require('nodemailer');

let config = require("./config");
let options = {'db':config.REDIS_CONFIG.db, password:config.REDIS_CONFIG.pass};

let client = redis.createClient(config.REDIS_CONFIG.port, config.REDIS_CONFIG.host,options);
client.select(3);
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


function get(key, cb){
	client.get(key, function(err, reply){
	    if(reply==null){
	      cb(true, null);
	    } else {
	      cb(false, JSON.parse(reply));
	    }
	});
}

function set(key, value){
	//console.log("going to set", key, value);
	value = JSON.stringify(value);
	client.set(key, value,'EX', 60 * 60 * 24 * 365);
}

function getMatchDate(dt, tm){
  let dateStrArr = dt.split("/");
  let timeStrArr = tm.split(":");
  let matchDate = new Date(parseInt(dateStrArr[2]), parseInt(dateStrArr[0]-1), parseInt(dateStrArr[1]), parseInt(timeStrArr[0]), parseInt(timeStrArr[1]), 0,0);
  return matchDate;
}

function getNowShowingMatches(matches){
  let curDate = new Date();
  let nowshowing = matches.filter((item)=>{
    let matchDate = getMatchDate(item['$'].matchdate_ist, item['$'].matchtime_ist);
    //if(item['$'].live=='0' && matchDate.getTime()<=curDate.getTime()){
		//FIX for no updates for live matches on list page --- CHECK
		if(matchDate.getTime()<=curDate.getTime()){
      return item;
    }
  });
  return nowshowing;
}

function getMatchScoreString(eq){
	return eq['Total']+"/"+eq['Wickets']+" ("+eq['Overs']+" ov)";
	//return "166/3 (35.1 ov)"
}


var totalRecords = 0;
var count = 0;

request.get('http://toicri.timesofindia.indiatimes.com/calendar_new.xml', function(err, response, body) {
	if (!err && response.statusCode == 200) {
		parseString(body, function (err1, result) {
			if(err1){
				sendEmail("API parsing (xml to json) error: http://toicri.timesofindia.indiatimes.com/calendar_new.xml");
			}
			if(typeof(result)!='undefined' && typeof(result.calendar)!='undefined'){
				result = result['calendar']['match'];
				var nowshowing = getNowShowingMatches(result);
				var promiseArr = [];
				totalRecords = nowshowing.length;
				for(let match of nowshowing){
					(function(matchfile){
						request.get("http://toicri.timesofindia.indiatimes.com/"+matchfile+".xml", function(err2, response2, body2){
							if(err2){
								sendEmail("API data not coming: http://toicri.timesofindia.indiatimes.com/"+matchfile+".xml");
							}
							parseString(body2, function (err3, result3) {
								//console.log(result3.Matchdetail.FirstInnings[0].FIEquation[0]['$']);
								//return;
								if(err3){
									sendEmail("API parsing error: http://toicri.timesofindia.indiatimes.com/"+matchfile+".xml");
								}
								if(result3.hasOwnProperty("Matchdetail")) {
									let matchId = result3['Matchdetail']['$']['Match_Id'];
									let obj = {"fi":{},"si":{},"ti":{},"fo":{}, "teamscore":{}};
									if(result3.Matchdetail.hasOwnProperty('FirstInnings') && result3.Matchdetail.FirstInnings.length>0 && result3.Matchdetail.FirstInnings[0].FIEquation) {
										obj['fi']['d'] = result3.Matchdetail.FirstInnings[0]['$'];
										obj['fi']['eq'] = result3.Matchdetail.FirstInnings[0].FIEquation[0]['$'];
										obj['fi']['score'] =  getMatchScoreString(result3.Matchdetail.FirstInnings[0].FIEquation[0]['$']);
										obj['teamscore'][obj['fi']['d']['Battingteam_Id']] = {"inn_score_1":obj['fi']['score']};
									}
									if(result3.Matchdetail.hasOwnProperty('SecondInnings') && result3.Matchdetail.SecondInnings.length>0 && result3.Matchdetail.SecondInnings[0].SIEquation) {
										obj['si']['d'] = result3.Matchdetail.SecondInnings[0]['$'];
										obj['si']['eq'] = result3.Matchdetail.SecondInnings[0].SIEquation[0]['$'];										
										obj['si']['score'] =  getMatchScoreString(result3.Matchdetail.SecondInnings[0].SIEquation[0]['$']);
										obj['teamscore'][obj['si']['d']['Battingteam_Id']] = {'inn_score_2': obj['si']['score']};
									}
									if(result3.Matchdetail.hasOwnProperty('ThirdInnings') && result3.Matchdetail.ThirdInnings.length>0 && result3.Matchdetail.ThirdInnings[0].TIEquation) {
										obj['ti']['d'] = result3.Matchdetail.ThirdInnings[0]['$'];
										obj['ti']['eq'] = result3.Matchdetail.ThirdInnings[0].TIEquation[0]['$'];						
										obj['ti']['score'] =  getMatchScoreString(result3.Matchdetail.ThirdInnings[0].TIEquation[0]['$']);
										if(obj['ti']['d']['Battingteam_Id']==obj['fi']['d']['Battingteam_Id']){
											obj['teamscore'][obj['fi']['d']['Battingteam_Id']]= Object.assign(obj['teamscore'][obj['fi']['d']['Battingteam_Id']], {'inn_score_3': obj['ti']['score']});
										} else if(obj['ti']['d']['Battingteam_Id']==obj['si']['d']['Battingteam_Id']){
											obj['teamscore'][obj['si']['d']['Battingteam_Id']] = Object.assign(obj['teamscore'][obj['si']['d']['Battingteam_Id']], {'inn_score_3': obj['ti']['score']});
										}
									}
									if(result3.Matchdetail.hasOwnProperty('FourthInnings') && result3.Matchdetail.FourthInnings.length>0 && result3.Matchdetail.FourthInnings[0].FOIEquation) {
										obj['fo']['d'] = result3.Matchdetail.FourthInnings[0]['$'];
										obj['fo']['eq'] = result3.Matchdetail.FourthInnings[0].FOIEquation[0]['$'];
										obj['fo']['score'] =  getMatchScoreString(result3.Matchdetail.FourthInnings[0].FOIEquation[0]['$']);
										if(obj['fo']['d']['Battingteam_Id']==obj['fi']['d']['Battingteam_Id']){
											obj['teamscore'][obj['fi']['d']['Battingteam_Id']] =Object.assign(obj['teamscore'][obj['fi']['d']['Battingteam_Id']] , {'inn_score_4':  obj['fo']['score']});
										} else if(obj['fo']['d']['Battingteam_Id']==obj['si']['d']['Battingteam_Id']){
											obj['teamscore'][obj['si']['d']['Battingteam_Id']]= Object.assign(obj['teamscore'][obj['si']['d']['Battingteam_Id']], {'inn_score_4': obj['fo']['score']});
										}
									}
									count++;
									set("match_"+matchId, obj);
									if(count>=totalRecords){
										process.exit(0);
									}

								} else {
									sendEmail("API complete data not coming: http://toicri.timesofindia.indiatimes.com/"+matchfile+".xml");
								}
								
							});
						});	
					})(match['$']['matchfile']);
				}

			} else {
				sendEmail("API data not coming: http://toicri.timesofindia.indiatimes.com/calendar_new.xml");
			}
		});
	} else {
		sendEmail("API not working: http://toicri.timesofindia.indiatimes.com/calendar_new.xml");
	}
});