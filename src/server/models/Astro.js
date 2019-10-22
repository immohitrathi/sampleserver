const request = require("request");
const config = require("./../../config/server");
const Util = require("./Util");
const RedisCache = require("./RedisCache");
const parseString = require('xml2js').parseString;
const async = require('async');
var dateFormat = require('dateformat');

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

module.exports = {
	getLanguagePrefix:function(lang){
		if(lang=='hindi' || lang=='marathi' || lang=='tamil' || lang=='telugu' || lang=='kannada' || lang=='malayalam' || lang=='gujarati'){
			return lang;
		} 
		return 'english';
	},
	parseResult:function(items, title, startDate, endDate){
		let startObj = new Date(startDate);
		let endObj = new Date(endDate);
		let timeDiff = Math.abs(endObj.getTime() - startObj.getTime());
		let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
		if(diffDays==0){
			title = dateFormat(startObj, 'dd mmmm, yyyy');
		} else if(diffDays>300){
			title = "Year, "+dateFormat(startObj, 'yyyy');
		} else if(diffDays>25){
			title = dateFormat(startObj, 'mmmm, yyyy');
		} else {
			title = dateFormat(startObj, 'dd')+"-"+dateFormat(endObj, 'dd mmmm, yyyy');
		}
		if(typeof(items)!='undefined' && items.length>0){
			for(let i=0;i<items.length;i++){
				items[i]['id'] = i+1;
				items[i]['title'] = items[i]['title'][0];
				items[i]['guid'] = items[i]['guid'][0];
				items[i]['url'] = items[i]['url'][0];
				items[i]['image'] = items[i]['image'][0];
				items[i]['description'] = items[i]['description'][0];
				items[i]['pubDate'] = items[i]['pubDate'][0];
				items[i]['range'] = title;
			}			
		}

		return items;
	},
	getSigns:function(lang, callback){
		const _this = this;
		let link = "http://"+this.getLanguagePrefix(lang)+".webdunia.com/astro_rss/daily_astrology.rss";
		let key = "getSigns_"+Util.makeKey(link);
		//console.log(link);
		RedisCache.get(key,function(err, rResult){
			if(err){
				request.get(link, function(err, response, body) {
					Util.logRequestError(err, response);
					if (!err && response.statusCode == 200) {
				  		parseString(body, function (err, result) {
				  			if(err || !result.hasOwnProperty('rss') || !result.rss.hasOwnProperty('channel')){
				  				callback(true, null);
				  			} else {
				  				let items = _this.parseResult(result.rss.channel[0].item, result.rss.channel[0].title[0], result.rss.channel[0]['start'][0], result.rss.channel[0]['end'][0]);
				  				RedisCache.set(key,items,3600);
				  				callback(false, items);
				  			}
				  		});
					} else {
						Util.sendEmail(link);
						callback(true,null);
					}
			  	});				
			} else {
				callback(false, rResult);
			}
		});
	},
	getNormalizeData:function(err, response, body, cb){
		const _this = this;
		Util.logRequestError(err, response);
		if (!err && response.statusCode == 200) {
	  		parseString(body, function (err, result) {
	  			if(err || !result.hasOwnProperty('rss') || !result.rss.hasOwnProperty('channel')){
	  				cb(false,[]);
	  			} else {
	  				let items = _this.parseResult(result.rss.channel[0].item, result.rss.channel[0].title[0], result.rss.channel[0]['start'][0], result.rss.channel[0]['end'][0]);
	  				cb(false, items);
	  			}
	  		});
		} else {
			//Util.sendEmail(link);
			cb(false,[]);
		}		
	},
	getSignData:function(data, id){
		let sign = {daily:{},weekly:{}, monthly:{}, yearly:{}};
		sign['daily'] = typeof(data.daily[id-1])!='undefined'?data.daily[id-1]:{};
		sign['weekly'] = typeof(data.weekly[id-1])!='undefined'?data.weekly[id-1]:{};
		sign['monthly'] = typeof(data.monthly[id-1])!='undefined'?data.monthly[id-1]:{};
		sign['yearly'] = typeof(data.yearly[id-1])!='undefined'?data.yearly[id-1]:{};
		return sign;
	},
	getHoroscope:function(signId, lang, callback){
		const _this = this;
		const langcode = this.getLanguagePrefix(lang);
		const key = "all_horoscope_"+langcode;
		RedisCache.get(key,function(err, rResult){
			if(err){
				async.parallel({
				    daily: function(cb) {
				        request.get("http://"+langcode+".webdunia.com/astro_rss/daily_astrology.rss",function(err, response, body){
				        	_this.getNormalizeData(err, response, body, cb);
				        });
				    },
				    weekly: function(cb) {
				        request.get("http://"+langcode+".webdunia.com/astro_rss/weekly_astrology.rss",function(err, response, body){
				        	_this.getNormalizeData(err, response, body, cb);
				        });
				    },
				    monthly: function(cb) {
				        request.get("http://"+langcode+".webdunia.com/astro_rss/monthly_astrology.rss",function(err, response, body){
				        	_this.getNormalizeData(err, response, body, cb);
				        });
				    },
				    yearly: function(cb) {
				        request.get("http://"+langcode+".webdunia.com/astro_rss/yearly_astrology.rss",function(err, response, body){
				        	_this.getNormalizeData(err, response, body, cb);
				        });
				    }

				}, function(err, results) {
					if(results.hasOwnProperty('daily') && results.hasOwnProperty('weekly') && results.hasOwnProperty('monthly') && results.hasOwnProperty('yearly') && results.daily.length>0 && results.weekly.length>0 && results.monthly.length>0 && results.yearly.length>0){
						RedisCache.set(key,results,3600);
						callback(false, _this.getSignData(results, signId));
					} else {
						callback(true,null);
					}
				});				
			} else {
				callback(false, _this.getSignData(rResult, signId));
			}
		});
	}
}