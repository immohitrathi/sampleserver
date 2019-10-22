const request = require('request');
const config = require("./../../config/server");
const RedisCache = require("./RedisCache");
const Util = require("./Util");

const API_DOMAIN_URL = config.API_DOMAIN;
const SOLR_API_DOMAIN = config.SOLR_API_DOMAIN;
const SOLR_API_IP = config.SOLR_API_IP;


module.exports = {
	mergeVideosAndLiveTv:function(watchList, videoItems, vurl){
		let obj = {};
		obj = videoItems;
		obj['watchlist'] = watchList;
		return obj;
	},
	getWatchList:function(queryArr, callback){
		const _this = this;
		var queryString = queryArr.join("&");
		const curpg = queryArr[0];
		request.get('https://nprssfeeds.indiatimes.com/feed/video/watch-list?fv=500&'+queryString, function(err, response, body) {
			Util.logRequestError(err, response);
			if (!err && response.statusCode == 200) {
		      try{
						var locals = JSON.parse(body);
						RedisCache.set("watch-list_"+queryString,locals);
						_this.getWatchVideos(locals, locals.homeVideoListUrl + '&' + curpg, callback);
						//_this.getVideoCategories(locals.categeroyUrl);
						//callback(false, locals);
		      } catch(ex){
						Util.sendEmail('https://nprssfeeds.indiatimes.com/feed/video/watch-list?fv=500'+queryString);
		        RedisCache.get("watch-list_"+queryString,callback);
		      }

		  } else {
				Util.sendEmail('https://nprssfeeds.indiatimes.com/feed/video/watch-list?fv=500'+queryString);
		    RedisCache.get("watch-list_"+queryString,callback);
		  }
		});
	},

	getVideoCategories:function(queryArr, callback){
		const _this = this;
		var queryString = queryArr.join("&");
		let videoUrl = 'https://nprssfeeds.indiatimes.com/feed/video/watch-category?'+queryString;
		request.get(videoUrl, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
				locals = _this.addLiveTvCategory(locals);
				RedisCache.set("videocats_"+videoUrl,locals);
				callback(false, locals);
		      } catch(ex){
				  console.log(ex)
		        Util.sendEmail(videoUrl);
		        RedisCache.get("videocats_"+videoUrl,callback);
		      }

		  } else {
		  	Util.sendEmail(videoUrl);
		    RedisCache.get("videocats_"+videoUrl,callback);
		  }
		});
	},

	addLiveTvCategory: function(itemObj) {
		var schema = { 
			name: 'Live TV',
	        defaulturl: 'https://nprssfeeds.indiatimes.com/feed/video?lang=english&categories=livetv&perpage=20',
	        tn: 'video',
			uid: 'livetv-01' 
		}
		itemObj.items.splice(1, 0, schema);
		return itemObj;
	},

	getWatchVideos:function(watchList, videoUrl, callback){
		const _this = this;
		request.get(videoUrl, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
						RedisCache.set("watchvideos_"+videoUrl,locals);
						var finalList = _this.mergeVideosAndLiveTv(watchList,locals,videoUrl);
						callback(false, finalList);
		      } catch(ex){
		        Util.sendEmail(videoUrl);
		        RedisCache.get("watchvideos_"+videoUrl,callback);
		      }

		  } else {
		  	Util.sendEmail(videoUrl);
		    RedisCache.get("watchvideos_"+videoUrl,callback);
		  }
		});
	},

	getLiveTv:function(queryArr, callback){
		const _this = this;
		var queryString = queryArr.join("&");
		request.get('https://nprssfeeds.indiatimes.com/feed/video/watch-list?fv=500&'+queryString, function(err, response, body) {
			Util.logRequestError(err, response);
			if (!err && response.statusCode == 200) {
		      try{
						var locals = JSON.parse(body);
						RedisCache.set("live-watch-list_"+queryString,locals);
						//_this.getWatchVideos(locals, locals.homeVideoListUrl + '&' + curpg, callback);
						//_this.getVideoCategories(locals.categeroyUrl);
						callback(false, locals);
		      } catch(ex){
						Util.sendEmail('https://nprssfeeds.indiatimes.com/feed/video/watch-list?fv=500'+queryString);
		        RedisCache.get("live-watch-list_"+queryString,callback);
		      }

		  } else {
				Util.sendEmail('https://nprssfeeds.indiatimes.com/feed/video/watch-list?fv=500'+queryString);
		    RedisCache.get("live-watch-list_"+queryString,callback);
		  }
		});
	},

	getVideoShow:function(queryArr, callback){
		var queryString = queryArr.join("&");
		request.get(API_DOMAIN_URL+'/api_videoshow.cms?'+queryString, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("api_videoshow_"+queryString,locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail(API_DOMAIN_URL+'/api_videoshow.cms?'+queryString);
		        RedisCache.get("api_videoshow_"+queryString,callback);
		      }

		  } else {
		  	Util.sendEmail(API_DOMAIN_URL+'/api_videoshow.cms?'+queryString);
		    RedisCache.get("api_videoshow_"+queryString,callback);
		  }
		});
	},

	getSlikeUrl:function(eid, callback){
	    let tempurl = 'http://slike.indiatimes.com/feed/stream/x2/pb/'+eid+'/'+eid+'.json';
	    request.get(tempurl, function(err, response, body) {
	    	Util.logRequestError(err, response);
		      if (!err && response.statusCode == 200) {
		          try{
		            let videourl = "";
		            var locals = JSON.parse(body);
		            if(locals.flavors){
		              for(var i in locals.flavors){
		                if(locals.flavors[i].type=='mp4'){
		                  videourl = locals.flavors[i].url;
		                  break;
		                }
		              }
		            }
		            callback(false, {videourl:videourl});
		          } catch(ex){
		            callback(true);
		          }
		      } else {
		        callback(true);
		      }
	    });
	}, 

	getChannelVideoListing:function(queryArr, callback){
		var queryString = queryArr.join("&");
		request.get(API_DOMAIN_URL+'/api_channelsvideolist.cms?'+queryString, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("api_channelsvideolist_"+queryString,locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail(API_DOMAIN_URL+'/api_channelsvideolist.cms?'+queryString);
		        RedisCache.get("api_channelsvideolist_"+queryString,callback);
		      }

		  } else {
		  	Util.sendEmail(API_DOMAIN_URL+'/api_channelsvideolist.cms?'+queryString);
		    RedisCache.get("api_channelsvideolist_"+queryString,callback);
		  }
		});
	},	

	getChannelCats:function(queryArr, callback){
		var queryString = queryArr.join("&");
		request.get(SOLR_API_IP+'/feeds/appnavigationcategoryurl_pwa.cms?source=pwa&'+queryString, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("getChannelCats_"+queryString,locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail('http://nprssfeeds.indiatimes.com/feeds/appnavigationcategoryurl_pwa.cms?'+queryString);
		        RedisCache.get("getChannelCats_"+queryString,callback);
		      }

		  } else {
		  	Util.sendEmail('http://nprssfeeds.indiatimes.com/feeds/appnavigationcategoryurl_pwa.cms?'+queryString);
		    RedisCache.get("getChannelCats_"+queryString,callback);
		  }
		});
	},	

	getFeedVideos:function(queryArr, callback){
		var queryString = queryArr.join("&");
		request.get('http://nprssfeeds.indiatimes.com/feed/video?source=pwa&'+queryString, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("getFeedVideos_"+queryString,locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail('http://nprssfeeds.indiatimes.com/feed/video?'+queryString);
		        RedisCache.get("getFeedVideos_"+queryString,callback);
		      }

		  } else {
		  	Util.sendEmail('http://nprssfeeds.indiatimes.com/feed/video?'+queryString);
		    RedisCache.get("getFeedVideos_"+queryString,callback);
		  }
		});
	},

	getElectionVideos:function(queryArr, callback){
		var queryString = queryArr.join("&");
		request.get(SOLR_API_DOMAIN + 'm/event/video?'+queryString, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("getElectionVideos_"+queryString,locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail(SOLR_API_DOMAIN + 'm/event/video?'+queryString);
		        RedisCache.get("getElectionVideos_"+queryString,callback);
		      }

		  } else {
		  	Util.sendEmail(SOLR_API_DOMAIN + 'm/event/video?'+queryString);
		    RedisCache.get("getElectionVideos_"+queryString,callback);
		  }
		});
	},
	
	getVideoDetail:function(id, callback){
		request.get(SOLR_API_IP+'/feed/video/'+id+'?source=pwa', function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
						var locals = JSON.parse(body);
		        RedisCache.set("getVideoDetail_"+id,locals);
		        callback(false, locals);
		      } catch(ex){
						Util.sendEmail('http://nprssfeeds.indiatimes.com/feed/video/'+id);
		        RedisCache.get("getVideoDetail_"+id,callback);
		      }

		  } else {
		  	Util.sendEmail('http://nprssfeeds.indiatimes.com/feed/video/'+id);
		    RedisCache.get("getVideoDetail_"+id,callback);
		  }
		});
	}
	
}