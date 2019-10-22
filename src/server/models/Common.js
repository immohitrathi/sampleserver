const request = require('request');
const config = require("./../../config/server");
const RedisCache = require("./RedisCache");
const Util = require("./Util");
const isomorphicFetch = require('isomorphic-fetch');

const API_DOMAIN_URL = config.API_DOMAIN;
const SOLR_API_DOMAIN = config.SOLR_API_DOMAIN;
const SOLR_API_IP = config.SOLR_API_IP;


module.exports = {
	getNavigations:function(queryArr, callback){
    var queryString = queryArr.join("&");
    RedisCache.get("api_hamburger_"+queryString,function(rerr, rdata){
      if(!rerr && false) {
        callback(false, rdata);
      } else {

        //https://nprssfeeds.indiatimes.com/feeds/appnavigationext_v4.cms?nav=allpub&vrsn=218&langid=%3Clangid%3E&preflang=%3Cuserlang%3E&platform=android
        //console.log(API_DOMAIN_URL+'/api_hamburger.cms?'+queryString);
        //console.log(SOLR_API_DOMAIN+'/appnavigationext_v4.cms?nav=allpub&vrsn=218&platform=android&'+queryString);
        //request.get(API_DOMAIN_URL+'/api_hamburger.cms?'+queryString, function(err, response, body) {
        request.get(SOLR_API_IP+'feeds/appnavigationext_v4.cms?nav=allpub&vrsn=218&platform=android&'+queryString, function(err, response, body) {
          Util.logRequestError(err, response);
          if (!err && response.statusCode == 200) {
              try{
                var locals = JSON.parse(body);
                RedisCache.set("api_hamburger_"+queryString,locals);
                callback(false, locals);
              } catch(ex){
                Util.sendEmail(API_DOMAIN_URL+'/api_hamburger.cms?'+queryString);
                RedisCache.get("api_hamburger_"+queryString,callback);
              }
          } else {
            Util.sendEmail(API_DOMAIN_URL+'/api_hamburger.cms?'+queryString);
            RedisCache.get("api_hamburger_"+queryString,callback);
          }
        });
      }
    });
	},

  getAds:function(queryArr, callback){
    var queryString = queryArr.join("&");
    request.get(API_DOMAIN_URL+'/api_ads.cms?'+queryString, function(err, response, body) {
      Util.logRequestError(err, response);
      if (!err && response.statusCode == 200) {
          try{
            var locals = JSON.parse(body);
            RedisCache.set("api_ads_"+queryString,locals);
            callback(false, locals);
          } catch(ex){
            Util.sendEmail(API_DOMAIN_URL+'/api_ads.cms?'+queryString);
            RedisCache.get("api_ads_"+queryString,callback);
          }

      } else {
        Util.sendEmail(API_DOMAIN_URL+'/api_ads.cms?'+queryString);
        RedisCache.get("api_ads_"+queryString,callback);
      }
    });    
  },

  getRawFeeds:function(queryArr, callback){
    var queryString = queryArr.join("&");
    request.get(API_DOMAIN_URL+'/offlineFeed/getRawFeed/?'+queryString, function(err, response, body) {
      Util.logRequestError(err, response);
      if (!err && response.statusCode == 200) {
          try{
            var locals = JSON.parse(body);
            RedisCache.set("getRawFeed_"+queryString,locals);
            callback(false, locals);
          } catch(ex){
            Util.sendEmail(API_DOMAIN_URL+'/offlineFeed/getRawFeed/?'+queryString);
            RedisCache.get("getRawFeed_"+queryString,callback);
          }

      } else {
        Util.sendEmail(API_DOMAIN_URL+'/offlineFeed/getRawFeed/?'+queryString);
        RedisCache.get("getRawFeed_"+queryString,callback);
      }
    });    
  },

  getHeadMeta:function(queryArr, callback){
    var queryString = queryArr.join("&");
    RedisCache.get("api_headmeta_"+queryString,function(err, data){
      if(!err){
        callback(err, data);
      } else {
        request.get(API_DOMAIN_URL+'/api_headmeta.cms?'+queryString, function(err, response, body) {
          Util.logRequestError(err, response);
          if (!err && response.statusCode == 200) {
              try{
                var locals = JSON.parse(body);
                RedisCache.set("api_headmeta_"+queryString,locals, 86400);
                callback(false, locals);
              } catch(ex){
                Util.sendEmail(API_DOMAIN_URL+'/api_headmeta.cms?'+queryString);
                RedisCache.get("api_headmeta_"+queryString,callback);
              }

          } else {
            Util.sendEmail(API_DOMAIN_URL+'/api_headmeta.cms?'+queryString);
            RedisCache.get("api_headmeta_"+queryString,callback);
          }
        });        
      }
    });


  }, 

  getMicron:function(queryArr, callback){
    var queryString = queryArr.join("&");
    request.get(API_DOMAIN_URL+'/api_micronapi.cms?'+queryString, function(err, response, body) {
      Util.logRequestError(err, response);
      if (!err && response.statusCode == 200) {
          try{
            var locals = JSON.parse(body);
            RedisCache.set("api_micronapi_"+queryString,locals);
            callback(false, locals);
          } catch(ex){
            Util.sendEmail(API_DOMAIN_URL+'/api_micronapi.cms?'+queryString);
            RedisCache.get("api_micronapi_"+queryString,callback);
          }

      } else {
        Util.sendEmail(API_DOMAIN_URL+'/api_micronapi.cms?'+queryString);
        RedisCache.get("api_micronapi_"+queryString,callback);
      }
    });
  },

  getTranslation:function(queryArr, callback){
    var queryString = queryArr.join("&");
    request.get(API_DOMAIN_URL+'/translationapi.cms?'+queryString, function(err, response, body) {
      Util.logRequestError(err, response);
      if (!err && response.statusCode == 200) {
          try{
            var locals = body;
            RedisCache.set("translationapi_"+queryString,locals);
            callback(false, locals);
          } catch(ex){
            Util.sendEmail(API_DOMAIN_URL+'/translationapi.cms?'+queryString);
            RedisCache.get("translationapi_"+queryString,callback);
          }

      } else {
        Util.sendEmail(API_DOMAIN_URL+'/translationapi.cms?'+queryString);
        RedisCache.get("translationapi_"+queryString,callback);
      }
    });
  },

  validateTicket:function(query, callback){
    let tempurl = 'https://socialappsintegrator.indiatimes.com/socialsite/v1validateTicket?ticketId=' + query.ticketId + '&channel=newspoint';
    request.get(tempurl, function(err, response, body) {
      Util.logRequestError(err, response);
      if (!err && response.statusCode == 200) {
          try{
            var locals = JSON.parse(body);
            callback(false, locals);
          } catch(ex){
            callback(true);
          }

      } else {
        callback(true);
      }
    });
  },

  getProfileInfo:function(query, callback){
    let tempurl = 'https://myt.indiatimes.com/mytimes/profile/info/v1/?ssoid=' + query.ssoid;
    request.get(tempurl, function(err, response, body) {
      Util.logRequestError(err, response);
      if (!err && response.statusCode == 200) {
          try{
            callback(false, body);
          } catch(ex){
            callback(true);
          }

      } else {
        callback(true);
      }
    });
  },

  verifiyOneTape:function(queryArr, callback){
    let queryString = queryArr.join("&")
    let tempurl = 'https://jsso.indiatimes.com/sso/services/gponetaplogin/verify?'+queryString;
    request.get(tempurl, function(err, response, body) {
      Util.logRequestError(err, response);
      if (!err && response.statusCode == 200) {
          try{
            var locals = JSON.parse(body);
            callback(false, locals);
          } catch(ex){
            callback(true);
          }
      } else {
        callback(true);
      }
    });
  }, 

  getQuoteList:function(queryArr, callback){
    var queryString = queryArr.join("&");
    request.get(API_DOMAIN_URL+'/api_quotelist.cms?'+queryString, function(err, response, body) {
      Util.logRequestError(err, response);
      if (!err && response.statusCode == 200) {
          try{
            var locals = JSON.parse(body);
            RedisCache.set("api_quotelist_"+queryString,locals);
            callback(false, locals);
          } catch(ex){
            Util.sendEmail(API_DOMAIN_URL+'/api_quotelist.cms?'+queryString);
            RedisCache.get("api_quotelist_"+queryString,callback);
          }

      } else {
        Util.sendEmail(API_DOMAIN_URL+'/api_quotelist.cms?'+queryString);
        RedisCache.get("api_quotelist_"+queryString,callback);
      }
    });
  },   

  getAppFeed:function(queryArr, callback){
    var queryString = queryArr.join("&");
    request.get(SOLR_API_IP+'/feeds/appinfooptv7.cms?'+queryString, {strictSSL:false}, function(err, response, body) {
      Util.logRequestError(err, response);
      if (!err && response.statusCode == 200) {
          try{
            var locals = JSON.parse(body);
            RedisCache.set("getAppFeed_"+queryString,locals);
            callback(false, locals);
          } catch(ex){
            Util.sendEmail('http://nprssfeeds.indiatimes.com/feeds/appinfooptv7.cms?'+queryString);
            RedisCache.get("getAppFeed_"+queryString,callback);
          }

      } else {
        Util.sendEmail('http://nprssfeeds.indiatimes.com/feeds/appinfooptv7.cms?'+queryString);
        RedisCache.get("getAppFeed_"+queryString,callback);
      }
    });
  },

  getAppLangText:function(queryArr, callback){
    var queryString = queryArr.join("&");
    RedisCache.get("applangtextpwa_"+queryString,function(rerr, rdata){
      if(!rerr) {
        callback(false, rdata); 
      } else {
        request.get(SOLR_API_IP+'/feeds/applangtextpwa.cms?source=pwa&'+queryString, {strictSSL:false}, function(err, response, body) {
          Util.logRequestError(err, response);
          if (!err && response.statusCode == 200) {
              try{
                var locals = JSON.parse(body);
                RedisCache.set("applangtextpwa_"+queryString,locals);
                callback(false, locals);
              } catch(ex){
                Util.sendEmail('http://nprssfeeds.indiatimes.com/feeds/applangtextpwa.cms?'+queryString);
                RedisCache.get("applangtextpwa_"+queryString,callback);
              }
          } else {
            Util.sendEmail('http://nprssfeeds.indiatimes.com/feeds/applangtextpwa.cms?'+queryString);
            RedisCache.get("applangtextpwa_"+queryString,callback);
          }
        });
      }
    });
  },
  getMicronUrl:function(queryArr, callback){
    var queryString = queryArr.join("&");
    request.get(SOLR_API_IP+'feeds/appmicronurl.cms?'+queryString, function(err, response, body) {
      Util.logRequestError(err, response);
      if (!err && response.statusCode == 200) {
          try{
            RedisCache.set("getMicronUrl_"+queryString,body);
            callback(false, body);
          } catch(ex){
            Util.sendEmail(SOLR_API_IP+'feeds/appmicronurl.cms?'+queryString);
            RedisCache.get("getMicronUrl_"+queryString,callback);
          }

      } else {
        Util.sendEmail(SOLR_API_IP+'feeds/appmicronurl.cms?'+queryString);
        RedisCache.get("getMicronUrl_"+queryString,callback);
      }
    });
  },
  getElectionConfig:function(langid, callback) {
    isomorphicFetch(SOLR_API_IP + 'feeds/electionappconfig.cms?feedtype=sjson&platform=pwa&preflang='+langid).then(res => res.json()).then((data)=>{
      RedisCache.set("getElectionConfig_"+langid,data);
      callback(false, data);
    }).catch((ex)=>{
      console.log("Inside Election exception");
      RedisCache.get("getElectionConfig_"+langid,callback);
    })


/*     request.get('http://nprssfeeds.indiatimes.com/feeds/electionpwa.cms?feedtype=sjson&preflang='+langid, function(err, response, body) {
      Util.logRequestError(err, response);
      if (!err && response.statusCode == 200) {
          try{      
            var locals = JSON.parse(body);
            RedisCache.set("getElectionData_"+langid,locals);
            callback(false, locals);
          } catch(ex){
            console.log("Inside Election exception");
            Util.sendEmail(SOLR_API_IP+'feeds/electionapphomewidget_test.cms?feedtype=sjson&preflang='+langid);
            RedisCache.get("getElectionData_"+langid,callback);
          }
      } else {
        console.log("Inside Election exception 1");
        Util.sendEmail(SOLR_API_IP+'feeds/electionapphomewidget_test.cms?feedtype=sjson&preflang='+langid);
        RedisCache.get("getElectionData_"+langid,callback);
      }
    }); */
  },
  getElectionData:function(langid, stateId, r, callback) {
    isomorphicFetch(SOLR_API_IP + 'feeds/electionappdata.cms?upcache=2&feedtype=sjson&platform=pwa&preflang='+langid + '&states=' + stateId + '&r=' + r).then(res => res.json()).then((data)=>{
      RedisCache.set("getElectionsData_"+langid,data);
      callback(false, data);
    }).catch((ex)=>{
      console.log("Inside Election exception");
      RedisCache.get("getElectionsData_"+langid,callback);
    })
  },
  getElectionStates:function(lang,  callback){
    RedisCache.get("getelectionstates_"+lang+"_v=3",function(rerr, rdata){
      if(!rerr) {
        callback(false, rdata); 
      } else {
        var url = SOLR_API_IP+'/feeds/electionappstatelist.cms?upcache=2&platform=pwa&feedtype=sjson&preflang='+lang;
        request.get(url, {strictSSL:false}, function(err, response, body) {
          Util.logRequestError(err, response);
          if (!err && response.statusCode == 200) {
              try{
                var locals = JSON.parse(body);
                RedisCache.set("getelectionstates_"+lang+"_v=3",locals, 3600); //1hrs
                callback(false, locals);
              } catch(ex){
                Util.sendEmail(url);
                RedisCache.get("getelectionstates_"+lang+"_v=3",callback);
              }
          } else {
            Util.sendEmail(url);
            RedisCache.get("getelectionstates_"+lang+"_v=3",callback);
          }
        });
      }
    });
  },
  getPreElectionData:function(lang,  callback){
    RedisCache.get("getpreelectiondata_"+lang+"_v=2",function(rerr, rdata){
      if(!rerr) {
        callback(false, rdata); 
      } else {
        var url = SOLR_API_IP+'/feeds/appgeneralbanner.cms?platform=pwa&feedtype=sjson&preflang='+lang;
        request.get(url, {strictSSL:false}, function(err, response, body) {
          Util.logRequestError(err, response);
          if (!err && response.statusCode == 200) {
              try{
                var locals = JSON.parse(body);
                RedisCache.set("getpreelectiondata_"+lang+"_v=2",locals, 86400); //24hrs
                callback(false, locals);
              } catch(ex){
                Util.sendEmail(url);
                RedisCache.get("getpreelectiondata_"+lang+"_v=2",callback);
              }
          } else {
            Util.sendEmail(url);
            RedisCache.get("getpreelectiondata_"+lang+"_v=2",callback);
          }
        });
      }
    });
  },

  getAmazonData:function(lang, section,  callback){
    RedisCache.get("getamazondata_"+lang+"_"+section,function(rerr, rdata){
      if(!rerr) {
        callback(false, rdata); 
      } else {
        var url = SOLR_API_IP+'feed/m/amazon/affiliate/category/products?cc=IN&fv=472&lang='+lang+'&section='+section;
        request.get(url, {strictSSL:false}, function(err, response, body) {
          Util.logRequestError(err, response);
          if (!err && response.statusCode == 200) {
              try{
                var locals = JSON.parse(body);
                RedisCache.set("getamazondata_"+lang+"_"+section,locals, 86400);
                callback(false, locals);
              } catch(ex){
                Util.sendEmail(url);
                RedisCache.get("getamazondata_"+lang+"_"+section,callback);
              }
          } else {
            Util.sendEmail(url);
            RedisCache.get("getamazondata_"+lang+"_"+section,callback);
          }
        });
      }
    });
  },

  getAmazonTranslation:function(lang, callback){
    RedisCache.get("getamazontranslation_"+lang,function(rerr, rdata){
      if(!rerr) {
        callback(false, rdata); 
      } else {
        var url = SOLR_API_IP+'feed/m/amazon/affiliate/category/widget?lang='+lang+'&dp=hdmi&cc=IN&fv=472';
        request.get(url, {strictSSL:false}, function(err, response, body) {
          Util.logRequestError(err, response);
          if (!err && response.statusCode == 200) {
              try{
                var locals = JSON.parse(body);
                RedisCache.set("getamazontranslation_"+lang,locals, 86400);
                callback(false, locals);
              } catch(ex){
                Util.sendEmail(url);
                RedisCache.get("getamazontranslation_"+lang,callback);
              }
          } else {
            Util.sendEmail(url);
            RedisCache.get("getamazontranslation_"+lang,callback);
          }
        });
      }
    });
  }
  
}