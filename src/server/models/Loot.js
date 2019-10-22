const request = require("request");
const config = require("./../../config/server");
const Util = require("./Util");
const RedisCache = require("./RedisCache");

module.exports = {
	getContestDetail:function(langId, callback){
		let link = "https://nprelease.indiatimes.com/rewards-manager/v0/pwa/webview/campdetail/trans?lang="+langId;
		let key = "getContestDetail_"+Util.makeKey(link);
		RedisCache.get(key,function(err, rResult){
			if(err){
				request.get(link, function(err, response, body) {
					Util.logRequestError(err, response);
					if (!err && response.statusCode == 200) {
						let result = JSON.parse(body);
						if(err || !result.hasOwnProperty('data') || !result.success){
							callback(true, null);
						} else {
							RedisCache.set(key,result,3600);
							callback(false, result);
						}
				  		
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
	getPrizeDetail:function(langId, ssoid, callback){
		let link = "https://nprelease.indiatimes.com/rewards-manager/v0/pwa/webview/yourprize/trans?lang="+langId+'&ssoid='+ssoid;
		let key = "getPrizeDetail_"+Util.makeKey(link);
		RedisCache.get(key,function(err, rResult){
			if(err){
				request.get(link, function(err, response, body) {
					Util.logRequestError(err, response);
					if (!err && response.statusCode == 200) {
						let result = JSON.parse(body);
						if(err || !result.hasOwnProperty('data') || !result.success){
							callback(true, null);
						} else {
							RedisCache.set(key,result,3600);
							callback(false, result);
						}
				  		
					} else {
						Util.sendEmail(link);
						callback(true,null);
					}
			  	});				
			} else {
				callback(false, rResult);
			}
		});
	}
}