const request = require('request');
const config = require("./../../config/server");
const RedisCache = require("./RedisCache");
const Util = require("./Util");

const API_DOMAIN_URL = config.API_DOMAIN;
const SOLR_API_DOMAIN = config.SOLR_API_DOMAIN;

module.exports = {
	getTrendingKeywords:function(queryArr, callback){
		var queryString = queryArr.join("&");
		request.get('http://envoy.indiatimes.com/NPRSS/search/trending-keywords?source=pwa&'+queryString, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("getTrendingKeywords_"+queryString,locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail('http://envoy.indiatimes.com/NPRSS/search/trending-keywords?'+queryString);
		        RedisCache.get("getTrendingKeywords_"+queryString,callback);
		      }

		  } else {
		  	Util.sendEmail('http://envoy.indiatimes.com/NPRSS/search/trending-keywords?'+queryString);
		    RedisCache.get("getTrendingKeywords_"+queryString,callback);
		  }
		});
	},

	getSearchResult:function(queryArr, callback){
		var queryString = queryArr.join("&");
		//console.log('http://envoy.indiatimes.com/NPRSS/search?'+queryString);
		request.get('http://envoy.indiatimes.com/NPRSS/search?source=pwa&'+queryString, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("getSearchResult"+queryString,locals);
		        callback(false, locals);
		      } catch(ex){
		        //Util.sendEmail('http://envoy.indiatimes.com/NPRSS/search?'+queryString);
		        //RedisCache.get("getSearchResult"+queryString,callback);
		        callback(false, []);
		      }

		  } else {
		  	callback(false, []);
		  	// Util.sendEmail('http://envoy.indiatimes.com/NPRSS/search?'+queryString);
		   //  RedisCache.get("getSearchResult"+queryString,callback);
		  }
		});
	},

	searchCity:function(queryArr, callback){
		var queryString = queryArr.join("&");
		request.get('http://envoy.indiatimes.com/NPRSS/search/city?source=pwa&'+queryString, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("searchCity_"+queryString,locals);
		        callback(false, locals);
		      } catch(ex){
		      	callback(false, []);
		        // Util.sendEmail('http://envoy.indiatimes.com/NPRSS/search/city?'+queryString);
		        // RedisCache.get("searchCity_"+queryString,callback);
		      }

		  } else {
		  	callback(false, []);
		  	// Util.sendEmail('http://envoy.indiatimes.com/NPRSS/search/city?'+queryString);
		   //  RedisCache.get("searchCity_"+queryString,callback);
		  }
		});
	}
}