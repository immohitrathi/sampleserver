let redis = require("redis");
const request = require('request');
var parseString = require('xml2js').parseString;
var nodemailer = require('nodemailer');
const async = require('async');
const astro = require("./../src/server/models/Astro");
const util = require("./../src/server/models/Util");
const RedisCache = require("./RedisCache");

let config = require("./config");
let options = {'db':config.REDIS_CONFIG.db, password:config.REDIS_CONFIG.pass};

let client = redis.createClient(config.REDIS_CONFIG.port, config.REDIS_CONFIG.host,options);
client.select(9);
client.on("error", function (err) {
	console.log("Error " + err);
    sendEmail("Error " + err);
});

//let languages = util.getLanguages();
let languages = ['english','hindi','marathi','tamil','telugu','kannada','malayalam','gujarati'];
/* get sign api caching */
for(let language of languages){
	//let lang = language.languageNameEng.toLowerCase();
	let lang = language.toLowerCase();
	let link = "http://"+astro.getLanguagePrefix(lang)+".webdunia.com/astro_rss/daily_astrology.rss";
	let key = "getSigns_"+util.makeKey(link);
	request.get(link, function(err, response, body) {
		if (!err && response.statusCode == 200) {
	  		parseString(body, function (err, result) {
	  			if(err || !result.hasOwnProperty('rss') || !result.rss.hasOwnProperty('channel')){
					//console.log("Asto detail api not working : "+link);  
					util.sendEmail(link,'newspointpwa1@gmail.com');

	  			} else {
	  				let items = astro.parseResult(result.rss.channel[0].item, result.rss.channel[0].title[0], result.rss.channel[0]['start'][0], result.rss.channel[0]['end'][0]);
	  				RedisCache.set(key,items,2592000); //30 days
	  			}
	  		});
		} else {
			//console.log("Asto detail api not working : "+link);
			util.sendEmail(link,'newspointpwa1@gmail.com');
		}
  	});	
}
/* get sign api caching ends here */

/* get horoscope of a sign api caching */
let astroCount = 0;
for(let language of languages){
	//let langcode = language.languageNameEng.toLowerCase();
	let langcode = language;
	let key = "all_horoscope_"+langcode;	
	async.parallel({
	    daily: function(cb) {
	        request.get("http://"+langcode+".webdunia.com/astro_rss/daily_astrology.rss",function(err, response, body){
	        	astro.getNormalizeData(err, response, body, cb);
	        });
	    },
	    weekly: function(cb) {
	        request.get("http://"+langcode+".webdunia.com/astro_rss/weekly_astrology.rss",function(err, response, body){
	        	astro.getNormalizeData(err, response, body, cb);
	        });
	    },
	    monthly: function(cb) {
	        request.get("http://"+langcode+".webdunia.com/astro_rss/monthly_astrology.rss",function(err, response, body){
	        	astro.getNormalizeData(err, response, body, cb);
	        });
	    },
	    yearly: function(cb) {
	        request.get("http://"+langcode+".webdunia.com/astro_rss/yearly_astrology.rss",function(err, response, body){
	        	astro.getNormalizeData(err, response, body, cb);
	        });
	    }

	}, function(err, results) {
		if(results.hasOwnProperty('daily') && results.hasOwnProperty('weekly') && results.hasOwnProperty('monthly') && results.hasOwnProperty('yearly') && results.daily.length>0 && results.weekly.length>0 && results.monthly.length>0 && results.yearly.length>0){
			astroCount++;
			RedisCache.set(key,results,2592000);//30 days
			if(astroCount>=8){
				process.exit(0);
			}
		} else {
			//console.log("Asto detail api not working : "+key);
			util.sendEmail("Asto detail api not working : "+key,'newspointpwa1@gmail.com');
		}
	});
}