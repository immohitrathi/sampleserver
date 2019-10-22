const request = require('request');
const config = require("./../../config/server");
const RedisCache = require("./RedisCache");
const Util = require("./Util");

const API_DOMAIN_URL = config.API_DOMAIN;
const SOLR_API_DOMAIN = config.SOLR_API_DOMAIN;
const SOLR_API_IP = config.SOLR_API_IP;

module.exports = {
	getNavigations:function(queryArr,nav,section, subnav, callback){		
		const _this = this;
		var queryString = queryArr.join("&");
		let url = API_DOMAIN_URL+'/api_pubcatnav.cms?'+queryString;
		//console.log('getNavigations', url);
		let isInternal = Util.isInternalPub(nav);
		if(!isInternal){
			url = SOLR_API_DOMAIN+'/appnavigationextv7.cms?vrsn=500&nav='+nav+(subnav && subnav != 'undefined' ? '&subnav='+subnav : '');
		}
		request.get(url, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        if(!isInternal){		        	
		        	locals = _this.processExternalPubs(locals, nav, section);
		        } else {
		        	locals = JSON.parse(body);
		        }
		        RedisCache.set("api_pubcatnav_"+nav,locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail(API_DOMAIN_URL+'/api_pubcatnav.cms?'+nav);
		        RedisCache.get("api_pubcatnav_"+nav,callback);
		      }

		  } else {
		  	Util.sendEmail(API_DOMAIN_URL+'/api_pubcatnav.cms?'+nav);
		    RedisCache.get("api_pubcatnav_"+nav,callback);
		  }
		});
	},

	getTopPubs:function(queryArr, callback){
		var queryString = queryArr.join("&");
		request.get(API_DOMAIN_URL+'/api_toppub.cms?'+queryString, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("api_toppub_"+queryString,locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail(API_DOMAIN_URL+'/api_toppub.cms?'+queryString);
		        RedisCache.get("api_toppub_"+queryString,callback);
		      }

		  } else {
		  	Util.sendEmail(API_DOMAIN_URL+'/api_toppub.cms?'+queryString);
		    RedisCache.get("api_toppub_"+queryString,callback);
		  }
		});
	},

	getVideos:function(queryArr, callback){
		var queryString = queryArr.join("&");
		request.get(API_DOMAIN_URL+'/api_pubvideolisting.cms?'+queryString, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("api_pubvideolisting_"+queryString,locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail(API_DOMAIN_URL+'/api_pubvideolisting.cms?'+queryString);
		        RedisCache.get("api_pubvideolisting_"+queryString,callback);
		      }

		  } else {
		  	Util.sendEmail(API_DOMAIN_URL+'/api_pubvideolisting.cms?'+queryString);
		    RedisCache.get("api_pubvideolisting_"+queryString,callback);
		  }
		});
	},

	getListing:function(queryArr, nav, section, curpg, lang, callback){
		const _this = this;
		let queryString = queryArr.join("&");
		let url = API_DOMAIN_URL+'/api_pubhome.cms?'+queryString;
		let isInternal = Util.isInternalPub(nav);
		if(!isInternal){
			url = SOLR_API_IP+'feed/m/list?platform=pwa&pp=20&v=v1&perk=a&fv=421&channel='+nav+'&subsection='+section+'&lang='+lang+'&curpg='+curpg;
		}
		request.get(url, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
				try{
					var locals = JSON.parse(body);
					if(!isInternal){		        	
						locals = _this.processExternalPubsListing(locals,nav,lang,section);
						RedisCache.set("api_pubhome_"+url,locals);
					} else {
						locals = JSON.parse(body);
						RedisCache.set("api_pubhome_"+queryString,locals);
					}
					
					callback(false, locals);
				} catch(ex){
					Util.sendEmail(API_DOMAIN_URL+'/api_pubhome.cms?'+queryString);
					if(!isInternal){
						RedisCache.get("api_pubhome_"+url,callback);
					}else{
						RedisCache.get("api_pubhome_"+queryString,callback);
					}
					
				}

		  } else {
		  	Util.sendEmail(API_DOMAIN_URL+'/api_pubhome.cms?'+queryString);
		    if(!isInternal){
					RedisCache.get("api_pubhome_"+url,callback);
				}else{
					RedisCache.get("api_pubhome_"+queryString,callback);
				}
		  }
		});
	},	

	getPubs:function(queryArr, callback){
	  var queryString = queryArr.join("&");
	  request.get(API_DOMAIN_URL+'/api_pubs.cms?'+queryString, function(err, response, body) {
	  	Util.logRequestError(err, response);
	      if (!err && response.statusCode == 200) {
	          parseString(body, function (err, result) {
	              try{
	              	RedisCache.set("api_pubs_"+queryString,result);
	                callback(false, result);
	              } catch(ex){
	                Util.sendEmail(API_DOMAIN_URL+'/api_pubs.cms?'+queryString);
	                RedisCache.get("api_pubs_"+queryString,callback);
	              }
	          });
	      } else {
	        Util.sendEmail(API_DOMAIN_URL+'/api_pubs.cms?'+queryString);
	        RedisCache.get("api_pubs_"+queryString,callback);
	      }
	  });
	},	
	processExternalPubs(data, nav, section){
		let result = {'maincategory':{},'morecategory':[]};
		if(data.items.length>0){
			result['maincategory'] = data.items[0];
			result['maincategory']['cat'] = result['maincategory']['text'] = data.items[0].name;
			result['maincategory']['href'] = this.getSectionFromUrl(data.items[0].defaulturl,data.items[0].sectionNameEnglish);
			for(let d of data.items){
				if(section && section != 'undefined' && d.sectionNameEnglish) {
					let tempSec = section.split(' ').join('').split('-').join('');
					let tempSecEng = d.sectionNameEnglish.split(' ').join('').split('-').join('');
					if(tempSecEng.toLowerCase() == tempSec.toLowerCase()) {
						result['maincategory'] = d;
						result['maincategory']['cat'] = result['maincategory']['text'] = d.name;
						result['maincategory']['href'] = this.getSectionFromUrl(d.defaulturl,d.sectionNameEnglish);
					}
				}
				if(d.sectionNameEnglish!='watch'){
					d['cat'] = d['text'] = d.name;
					d['href'] = this.getSectionFromUrl(d.defaulturl,d.sectionNameEnglish);
					d['nav'] = nav;
					result['morecategory'].push(d);
				}
			}
		}
		return result;
	},
	getSectionFromUrl(defaultUrl,sectionNameEnglish){
		let sec = null;
		try{
			sec = defaultUrl.split('subsection=')[1].split('&')[0];
		}catch(e){
			sec = sectionNameEnglish;
		}
		return sec;
	},
	processExternalPubsListing(data,nav,lang,section){
		let result = Object.assign({},data);
		let mwu = "";
		try{
			if(result.items.length>0){
				for(let d of result.items){
					d['lang'] = lang;
					d['pnk'] = nav;
					d['template'] = d.tn;
					d['ru'] = d.tn == 'html' ? d.wu : "";
					if(!d.mwu) {
						let sec = section ? section : d.sec;
						if(lang == 'english') {
							mwu = "/in/" + Util.abbreviatePubName(d.pn) + "/" + lang + "/" + sec + "/" + Util.makeUrl(d.hl) + "/articleshow/" + d.id + "?utm_source=pwa";
						}else{
							mwu = "/in/" + Util.abbreviatePubName(d.pn) + "/" + lang + "/" + sec + "/articleshow/" + d.id + "?utm_source=pwa";
						}
						d['mwu'] = mwu;
					}
				}
			}
		}catch(ex){
			console.log('Logging error ',ex);
		}
		return result;
	}
}