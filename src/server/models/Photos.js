const request = require('request');
const RedisCache = require("./RedisCache");
const Util = require("./Util");
const config = require("./../../config/server");
const SOLR_API_DOMAIN = config.SOLR_API_DOMAIN;
const SOLR_API_IP = config.SOLR_API_IP;

module.exports = {
	getListing:function(queryArr, utmSource, utmMedium, callback){
		let _this = this;
		var queryString = queryArr.join("&");
		var queryObj = Util.queryArrToObj(queryArr);
		let category = "";
		let subcat = "";
		if(typeof queryObj['cat'] !== "undefined" && queryObj['cat'] && queryObj['cat'].indexOf('vivo') !== -1) {
			category = 'celebs,fashion';
			subcat = 'foreign-models,foreign-models-in-india,international,indian-models';
		}
		if(utmSource === 'samsung'){
			//category='movies,awards,events,tv,celebs,sports,gadgets,lens,news,beauty-pageants,holi-special';
			let moviesSubCat = ["bollywood","premiere","international","telugu","marathi","punjabi","bengali","malayalam","kannada","bhojpuri","film-festivals"];
			let awardsSubCat = ["awards-and-honours","filmfare-awards","times-food-guide-nightlife-awards","toisa","academy-awards","awards"];
			let eventsSubCat = ["mumbai", "delhi", "events","kolkata","bangalore", "chennai","hyderabad","kerala","jaipur","pune","ahmedabad","nagpur","chandigarh","other-cities","goa","lucknow"];
			let tvSubCat = ["stars","shows","behind-the-scenes"];
			let celebsSubCat = ["bollywood","celeb-themes","music","sports","telugu","tamil","malayalam","marathi","royalty","bengali","kannada","punjabi"];
			let sportsSubCat = ["sports","cricket","other-sports","tennis","football","ipl","asian-games","basket-ball","hockey","golf","badminton","f1"];
			let gadgetsSubCat = ["gadgets","phones","accessories","news-events","computers","services","appliances","cameras","celebs-and-tech","tablets"];
			let lensSubCat = ["beauty-health","travel","food-drinks","home-garden"];
			let newsSubCat = ["news","india","world","events","business","auto"];
			let beautySubCat = ["world-pageants","miss-india","miss-universe","miss-diva","miss-world","india-pageants","miss-earth","miss-international","mr-india-world","mr-india"];
			let holiSubCat = ["vineet-jain-holi-party-2015","vineet-jain-holi-party-2016","vineet-jains-holi-party-2019","holi-2013","holi-2016","vineet-jains-holi-party-2017","vineet-jains-holi-party-2018","vineet-jain-holi-party-2014"];
			subcat = [].concat.apply([], [moviesSubCat, awardsSubCat, eventsSubCat, tvSubCat, celebsSubCat, sportsSubCat, gadgetsSubCat, lensSubCat, newsSubCat, beautySubCat, holiSubCat]);
			subcat = subcat.join();
		}
		let curpg = queryObj['curpg'];
		utmSource = this.getUtmPram(utmSource, utmMedium);
		//let tempurl = 'http://photogallery.indiatimes.com/feeds/npnewslistingfeed/tag-top50,feedtype-json.cms';
		let tempurl = SOLR_API_DOMAIN+'photo-gallery?fv=480&lang=english&env='+ utmSource + (category ? '&category='+category : '') + (subcat ? '&subcat=' + subcat : '') +'&'+queryString;
		//console.log(tempurl);
		request.get(tempurl+"&"+queryString, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
						var locals = JSON.parse(body);
						if(!isNaN(curpg) && curpg > 1) {
							locals = _this.reducePhotosList(locals);
						}
						RedisCache.set("photos_listing_"+queryString,locals);
		        callback(false, locals);
		      } catch(ex){
						Util.sendEmail(tempurl+"?"+queryString);
		        RedisCache.get("photos_listing_"+queryString,callback);
		      }

		  } else {
		  	Util.sendEmail(tempurl+"?"+queryString);
		    RedisCache.get("photos_listing_"+queryString,callback);
		  }
		});
	},

	reducePhotosList: function(photos){
		//FIX for duplicates in next hit
		let items = photos.hasOwnProperty('items') && photos.items.length ? photos.items : [];
		items.splice(0,4); //remove first 4 items from the list
		photos['items'] = items;
		return photos;
	},

	getUtmPram:function(utmSource, utmMedium){
    switch(utmSource) {
      case 'vivo':
        if(utmMedium && utmMedium.indexOf('chrome') != -1) {
          return 'vc';
        }else if(utmMedium && utmMedium.indexOf('lockscreen') != -1) {
					return 'vls'
				}  
        return 'v';
      case 'samsung':return 'mg';
      case 'samsung_qaicon':return 'm';
      case 'micromax_browser':return 'vem';
      case 'venus_browser':return 'm';
      case 'xiaom_browser':return 'm';
      case 'apus_launcher':return 'apl';
      case 'apus_browser':return 'apb';
      case 'intex_minusone':return 'intex';
      case 'zen_minusone':return 'zen';
      case 'ziox_browser':return 'ziox';
      case 'zioxbrowsershare':return 'ziox';
      case 'karbonn_browser':return 'k';
			case 'karbonn_minusone':return 'km';
			case 'tata_sky':return 'ts';
			case 'oppo':return 'oppo';
      default: return 'm';
    }
  },

	getDetail:function(msid, curpg, utmSource, utmMedium, callback){
		//msid = 'a11db455187b049e6a8be65de227249a';
		if(isNaN(curpg)){
			curpg = 1;
		}
		utmSource = this.getUtmPram(utmSource, utmMedium);
		//let queryString = queryArr.join("&");
		let tempurl;
		if(isNaN(msid)){
			tempurl = SOLR_API_DOMAIN+'photo-gallery/item/id/'+msid+'?curpg='+curpg+'&perpage=10&env='+utmSource;
		}else{
			tempurl = 'http://photogallery.indiatimes.com/nppwashowfeed.cms?feedtype=sjson&version=v4&tag=ssl&msid='+msid+'&curpg='+curpg;
		}
		request.get(tempurl, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		    try{
		      var locals = JSON.parse(body);
		      RedisCache.set("getDetail_"+msid+"_"+curpg,locals);
		      callback(false, locals);
		    } catch(ex){
		      Util.sendEmail(tempurl);
		      RedisCache.get("getDetail_"+msid+"_"+curpg,callback);
		    }
		   } else {
		    Util.sendEmail(tempurl);
		    RedisCache.get("getDetail_"+msid+"_"+curpg,callback);
		  }
		});		
	},

	getMicron:function(queryArr, callback){
		let queryString = queryArr.join("&");
		let tempurl = SOLR_API_IP+'getappmicron.cms?source=pwa&';
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