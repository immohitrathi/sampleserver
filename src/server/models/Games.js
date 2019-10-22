const request = require('request');
const config = require("./../../config/server");
const RedisCache = require("./RedisCache");
const Util = require("./Util");

const API_DOMAIN_URL = config.API_DOMAIN;

const SOLR_API_IP = config.SOLR_API_IP;
const SOLR_API_DOMAIN = config.SOLR_API_DOMAIN;

module.exports = {
	getGames:function(type, page, callback, perpage){//type should be (top, list, featured)
		if(type!='top' && type!='list' && type!='featured'){
			type = 'top';
		}
		if(isNaN(page)){
			page = 1;
		}
		if(isNaN(perpage)){
			perpage =20;
		}
		//console.log(SOLR_API_IP+'games/gz/'+type+'?source=pwa&lang=1&af=true&curpg='+page+'&perpage='+perpage);
		request.get(SOLR_API_IP+'games/gz/'+type+'?source=pwa&lang=1&af=true&curpg='+page+'&perpage='+perpage, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("getGames_"+type+"_"+page+"_"+perpage,locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail(SOLR_API_IP+'games/gz/'+type+'?source=pwa&lang=1&af=true&curpg='+page+'&perpage='+perpage);
		        RedisCache.get("getGames_"+type+"_"+page+"_"+perpage,callback);
		      }
		  } else {
		  	Util.sendEmail(SOLR_API_IP+'games/gz/'+type+'?source=pwa&lang=1&af=true&curpg='+page+'&perpage='+perpage);
		    RedisCache.get("getGames_"+type+"_"+page+"_"+perpage,callback);
		  }
		});
	},

	getGameData:function(code, callback){
		this.getGames('list',1, function(error,data){
			if(error==false){
				if(data.hasOwnProperty('games')){
					let responseData = data.games.find((d)=>{
						if(d.code==code){
							return d;
						}
					})
					callback(false, responseData);
				} else {
					callback(true, null)
				}				
			} else {
				callback(true, null)
			}
		},1000);
	},

	getHomeGames:function(callback){
		request.get(SOLR_API_DOMAIN+'games/home-show', function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("getHomeGames",locals);
		        callback(false, locals);
		      } catch(ex){
		        //Util.sendEmail(SOLR_API_IP+'games/gz/'+type+'?source=pwa&lang=1&af=true&curpg='+page+'&perpage='+perpage);
		        RedisCache.get("getHomeGames",callback);
		      }
		  } else {
		  	//Util.sendEmail(SOLR_API_IP+'games/gz/'+type+'?source=pwa&lang=1&af=true&curpg='+page+'&perpage='+perpage);
		    RedisCache.get("getHomeGames",callback);
		  }
		});
	},

	getGamesCategoryListing:function(cat, page, perpage, callback){//type should be (top, list, featured)
		cat = encodeURIComponent(cat);
		if(isNaN(page)){
			page = 1;
		}
		if(isNaN(perpage)){
			perpage =20;
		}
		console.log(SOLR_API_DOMAIN+'games/category?name='+cat+'&cae=true&source=pwa&lang=1&af=true&curpg='+page+'&perpage='+perpage);
		request.get(SOLR_API_DOMAIN+'games/category?name='+cat+'&cae=true&source=pwa&lang=1&af=true&curpg='+page+'&perpage='+perpage, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("getGamesCategoryListing_"+cat+"_"+page+"_"+perpage,locals);
		        callback(false, locals);
		      } catch(ex){
		        //Util.sendEmail(SOLR_API_IP+'games/gz/'+type+'?source=pwa&lang=1&af=true&curpg='+page+'&perpage='+perpage);
		        RedisCache.get("getGamesCategoryListing_"+cat+"_"+page+"_"+perpage,callback);
		      }
		  } else {
		  	//Util.sendEmail(SOLR_API_IP+'games/gz/'+type+'?source=pwa&lang=1&af=true&curpg='+page+'&perpage='+perpage);
		    RedisCache.get("getGamesCategoryListing_"+cat+"_"+page+"_"+perpage,callback);
		  }
		});
	},

}