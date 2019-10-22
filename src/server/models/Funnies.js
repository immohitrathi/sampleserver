const request = require('request');
const config = require("./../../config/server");
const RedisCache = require("./RedisCache");
const Util = require("./Util");

const API_DOMAIN_URL = config.API_DOMAIN;
const SOLR_API_DOMAIN = config.SOLR_API_DOMAIN;
const SOLR_API_IP = config.SOLR_API_IP;

module.exports = {
	getFunnies:function(queryArr, utmSource, utmMedium, callback){
		var queryString = queryArr.join("&");
		utmSource = this.getUtmPram(utmSource, utmMedium);
		let tempurl = SOLR_API_DOMAIN+'gvm-mix';
		request.get(tempurl + '?fv=422&source=pwa&env=' +  utmSource + '&' + queryString, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("getFunnies_"+queryString,locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail(tempurl + '?' + queryString);
		        RedisCache.get("getFunnies_"+queryString,callback);
		      }
		  } else {
		  	Util.sendEmail(tempurl + '?' + queryString);
		    RedisCache.get("getFunnies_"+queryString,callback);
		  }
		});
	},
	getUtmPram:function(utmSource, utmMedium){
    switch(utmSource) {
      case 'vivo':
        if(utmMedium && utmMedium.indexOf('chrome') != -1) {
          return 'vc';
        }  
        return 'v';
      
      default: return 'm';
    }
  },
	getMeme:function(id, callback){
		let tempurl = SOLR_API_DOMAIN+'meme/';
		request.get(tempurl + id+'?source=pwa', function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("getMeme_"+id,locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail(tempurl + id);
		        RedisCache.get("getMeme_"+id,callback);
		      }
		  } else {
		  	Util.sendEmail(tempurl + id);
		    RedisCache.get("getMeme_"+id,callback);
		  }
		});
	},
	getCaptainSpeaks:function(queryArr, utmSource, utmMedium, callback){
		var queryString = queryArr.join("&");
		utmSource = this.getUtmPram(utmSource, utmMedium);
		let tempurl = SOLR_API_DOMAIN+'meme';
		request.get(tempurl + '?fv=422&source=pwa&env=' +  utmSource + '&' + queryString, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("getCaptainSpeaks_"+queryString,locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail(tempurl + '?' + queryString);
		        RedisCache.get("getCaptainSpeaks_"+queryString,callback);
		      }
		  } else {
		  	Util.sendEmail(tempurl + '?' + queryString);
		    RedisCache.get("getCaptainSpeaks_"+queryString,callback);
		  }
		});
	},
	getGif:function(id, callback){
		let tempurl = SOLR_API_DOMAIN+'gif/';
		request.get(tempurl + id+'?source=pwa', function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("getGif_"+id,locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail(tempurl + id);
		        RedisCache.get("getGif_"+id,callback);
		      }
		  } else {
		  	Util.sendEmail(tempurl + id);
		    RedisCache.get("getGif_"+id,callback);
		  }
		});
	},
	getVideo:function(id, callback){
		let tempurl = SOLR_API_DOMAIN+'video/';
		request.get(tempurl + id+'?source=pwa', function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("getVideo_"+id,locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail(tempurl + id);
		        RedisCache.get("getVideo_"+id,callback);
		      }
		  } else {
		  	Util.sendEmail(tempurl + id);
		    RedisCache.get("getVideo_"+id,callback);
		  }
		});
	},
	updateLikesCount:function(obj,callback){
    let apiurl = 'http://223.165.26.211/NPRSS/likes-count/update?source=pwa';
    request.post({url:apiurl,method:'POST',body:JSON.stringify(obj),headers: {'content-type':'application/json'}}, function(err, response, body) {
			//console.log('updateLikesCount', err, response.statusCode, body);
			if (!err && response.statusCode == 200) {  
				try{
					var locals = JSON.parse(body);
					callback(false, locals);
				} catch(ex){
					Util.sendEmail(apiurl);
					callback(true);
				}
      } else {
				callback(true);
      }
    });
  }
}