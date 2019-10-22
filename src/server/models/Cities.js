const request = require('request');
const config = require("./../../config/server");
const RedisCache = require("./RedisCache");
const Util = require("./Util");

const API_DOMAIN_URL = config.API_DOMAIN;
const SOLR_API_DOMAIN = config.SOLR_API_DOMAIN;

module.exports = {
	getPopularCities:function(lang, callback){
		let tempurl = 'http://223.165.26.211/NPRSS/city/globalpref/';
		request.get(tempurl+lang+'?source=pwa', function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("getPopularCities_"+lang,locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail(tempurl+lang);
		        RedisCache.get("getPopularCities_"+lang,callback);
		      }

		  } else {
		  	Util.sendEmail(tempurl+lang);
		    RedisCache.get("getPopularCities_"+lang,callback);
		  }
		});
	},


	getAllCities:function(lang, callback){
		let tempurl = 'http://223.165.26.211/NPRSS/city/names/';
		request.get(tempurl+lang+'?source=pwa', function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("getAllCities_"+lang,locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail(tempurl+lang);
		        RedisCache.get("getAllCities_"+lang,callback);
		      }

		  } else {
		  	Util.sendEmail(tempurl+lang);
		    RedisCache.get("getAllCities_"+lang,callback);
		  }
		});
	},

	getLocation:function(ip, callback){
		let tempurl = 'https://223.165.26.211/service/locate?source=pwa';
		//console.log('get location', tempurl, ip);
		//ip = '93.67.50.103';
		request.get({ url: tempurl, headers: {'realip':ip} }, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        //RedisCache.set("getLocation_"+ip,locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail(tempurl);
		        callback(true);
		        //RedisCache.get("getLocation_",callback);
		      }

		  } else {
				//Util.sendEmail(tempurl);
		  	callback(true);
		    //RedisCache.get("getLocation_",callback);
		  }
		});
	},

	getCityLocalized:function(city, lang, callback){
		let tempurl = 'https://223.165.26.211/NPRSS/city/names/';
		request.get(tempurl+city+"/"+lang+'?source=pwa', function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("getCityLocalized_"+city+"/"+lang,locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail(tempurl+city+"/"+lang);
		        RedisCache.get("getCityLocalized_"+city+"/"+lang,callback);
		      }

		  } else {
		  	Util.sendEmail(tempurl+city+"/"+lang);
		    RedisCache.get("getCityLocalized_"+city+"/"+lang,callback);
		  }
		});
	},
	getAllWeatherCity:function(city,callback){
		let tempurl = 'https://navbharattimes.indiatimes.com/feeds/appgeocities.cms';
		request.get(tempurl, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		  	  try{
		        var locals = JSON.parse(body);
		        RedisCache.set("getAllWeatherCity_",locals);
		        let cityArr = locals.cityjson, sid="";
		        let found = cityArr.find(function(element) {
				  return element.city == city;
				});
				if(found){
					sid = found.sid;
				}
		        callback(false, sid);
		      } catch(ex){
		        Util.sendEmail(tempurl);
		        RedisCache.get("getAllWeatherCity_",callback);
		      }

		  } else {
		  	Util.sendEmail(tempurl);
		    RedisCache.get("getAllWeatherCity_",callback);
		  }
		});
	},
	getWeatherData:function(sid,callback){
		let tempurl = 'https://navbharattimes.indiatimes.com/feeds/appweather.cms?feedtype=sjson&lat='+sid;
		request.get(tempurl, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("getWeatherData_",locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail(tempurl);
		        RedisCache.get("getWeatherData_",callback);
		      }

		  } else {
		  	Util.sendEmail(tempurl);
		    RedisCache.get("getWeatherData_",callback);
		  }
		});
	},

	getToiWeatherData: function (cityname,callback){
		let tempurl = 'https://timesofindia.indiatimes.com/feeds/npwidgetmapingfeed.cms?feedtype=sjson&city='+cityname;
		const _this = this;	
		RedisCache.get("getToiWeatherData_"+cityname,function(rerr, rdata){
			if(!rerr){
				callback(false, rdata);
			} else {
				request.get(tempurl, function(err, response, body) {
					if (!err && response.statusCode == 200) {
							try{
								var data = JSON.parse(body);
								var cityKey = _this.getCityNameFromKey(data);
								let url = "https://timesofindia.indiatimes.com/feeds/npappweatherwidgetfeed.cms?feedtype=sjson&query="+cityKey;
								request.get(url, function(err1, response1, body1) {
									if (!err1 && response1.statusCode == 200) {
										var data1 = JSON.parse(body1);
										RedisCache.set("getToiWeatherData_"+cityname,data1, 1800);
										callback(false, data1);
									} else {
										callback(true, {});		
									}
								});
							} catch(ex){
								callback(true, {});
							}
					} else {
						callback(true, {});
					}
				});	
			}
		});
	
	},
	getCityNameFromKey: function (data){
		if(data !== "undefined" && data.items !== "undefined" && data.items.length>0) {
			for(let i=0;i<data.items.length; i++) {
				if(data.items[i].key === "weather_cityid") {
					return data.items[i].value;
				}
			}
		}
		return "";
	},
	getWeather:function(city,callback){
		let tempurl = config.SOLR_API_DOMAIN+"m/weather/metrics?lang=english&cc=IN&fv=480&city="+city
		request.get(tempurl, function(err, response, body) {
			Util.logRequestError(err, response);
		  if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("getWeather_",locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail(tempurl);
		        RedisCache.get("getWeather_",callback);
		      }

		  } else {
		  	Util.sendEmail(tempurl);
		    RedisCache.get("getWeather_",callback);
		  }
		});
	},
}