const request = require('request');
const RedisCache = require("./RedisCache");
const Util = require("./Util");
const config = require("./../../config/server");
const SOLR_API_IP = config.SOLR_API_IP;


module.exports = {
	getListing:function(queryArr, callback){
		var queryString = queryArr.join("&");
		let tempurl = SOLR_API_IP+'feed/comic-list?source=pwa&'+queryString;
		request.get(tempurl, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("comics_listing_"+queryString,locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail(tempurl+"?"+queryString);
		        RedisCache.get("comics_listing_"+queryString,callback);
		      }

		  } else {
		  	Util.sendEmail(tempurl+"?"+queryString);
		    RedisCache.get("comics_listing_"+queryString,callback);
		  }
		});
	},

	getDetail:function(queryArr, callback){
		let queryString = queryArr.join("&");
		let tempurl = SOLR_API_IP+'feed/comic?source=pwa&'+queryString;
		//console.log(tempurl);
		request.get(tempurl, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		    try{
		      var locals = JSON.parse(body);
		      RedisCache.set("comicsDetail_"+queryString,locals);
		      callback(false, locals);
		    } catch(ex){
		      Util.sendEmail(tempurl+queryString);
		      RedisCache.get("comicsDetail_"+queryString,callback);
		    }
		   } else {
		    Util.sendEmail(tempurl+queryString);
		    RedisCache.get("comicsDetail_"+queryString,callback);
		  }
		});		
	},

	getMicron:function(queryArr, callback){
		let queryString = queryArr.join("&");
		let tempurl = SOLR_API_IP+'/getappmicron.cms?source=pwa&';
		request.get(tempurl+queryString, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		    try{
		      var locals = body.split('<!--')[0];
		      RedisCache.set("getMicron_"+queryString,locals);
		      callback(false, locals);
		    } catch(ex){
		      Util.sendEmail(tempurl+queryString);
		      RedisCache.get("getMicron_"+queryString,callback);
		    }
		   } else {
		    Util.sendEmail(tempurl+queryString);
		    RedisCache.get("getMicron_"+queryString,callback);
		  }
		});		
	}
}