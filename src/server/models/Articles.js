const request = require('request');
const config = require("./../../config/server");
const RedisCache = require("./RedisCache");
const Util = require("./Util");
const fs= require('fs');

const API_DOMAIN_URL = config.API_DOMAIN;
const SOLR_API_DOMAIN = config.SOLR_API_DOMAIN;
const Search = require("./Search");

module.exports = {
	getListing:function(section, lang, curpg, pp, callback){

    //console.log("Inside getListing",queryArr);
    let queryArr = [];
    if(typeof(section)!='undefined' && section!=""){
      queryArr.push("section="+section);
    }
    if(typeof(lang)!='undefined' && lang!=""){
      queryArr.push("lang="+lang);
    }
    if(typeof(curpg)!='undefined' && curpg!=""){
      queryArr.push("curpg="+curpg);
    } else {
      queryArr.push("curpg=1");
    }
    if(typeof(pp)!='undefined' && pp!=""){
      queryArr.push("pp="+pp);
    } else {
      queryArr.push("pp=20");
    }
    var queryString = queryArr.join("&");
    RedisCache.get("api_listing.cms_"+queryString, function(rerr, rdata){
      request.get(SOLR_API_DOMAIN+'m/atp-list?fv=480&v=v1&source=pwa&asset=ad,se,pg,vd,bn,gm,gvm,lt,mm&'+queryString, function(err, response, body) {  
        Util.logRequestError(err, response);
        
        if (!err && response.statusCode == 200) {
            try{
              var locals = JSON.parse(body);
              RedisCache.set("api_listing.cms_"+queryString,locals, 300);
              callback(false, locals);
            } catch(ex){
              Util.sendEmail(SOLR_API_DOMAIN+'m/atp-list?'+queryString);
              RedisCache.get("api_listing.cms_"+queryString,callback);
            }
  
        } else {
          //data not found in feed list api, try search api now
          let langid = Util.getLanguageIdByName(lang);
          let queryArray = [];
          queryArray.push("searchTerm="+section);
          queryArray.push("lang="+langid);
          Search.getSearchResult(queryArray, function(err, data){
            //console.log("Inside Search1",data); 
            if(!err){
              callback(false, data);
            } else {
              callback(true, []);
            }
          });
        }
      });
    });
  },

  getEventListing:function(searchTerm, lang, curpg, pp, utmSource, callback){

    //console.log("Inside getListing",queryArr);
    let queryArr = [];
    let assets = 'ad,pg,vd';
    if(typeof(searchTerm)!='undefined' && searchTerm!=""){
      queryArr.push("searchTerm="+searchTerm);
    }
    if(typeof(lang)!='undefined' && lang!=""){
      queryArr.push("lang="+lang);
    }
    if(typeof(curpg)!='undefined' && curpg!=""){
      queryArr.push("curpg="+curpg);
    } else {
      queryArr.push("curpg=1");
    }
    if(typeof(pp)!='undefined' && pp!=""){
      queryArr.push("pp="+pp);
    } else {
      queryArr.push("pp=20");
    }
    if(typeof utmSource != 'undefined' && utmSource != "" && utmSource === 'tata_sky'){
      assets = 'pg,vd';
      queryArr.push("utm_source=" + utmSource);
    }
    queryArr.push("v=1");
    var queryString = queryArr.join("&");
    RedisCache.get("api_eventlisting.cms_"+queryString, function(err, data){
      if(!err){
        callback(err, data);
      } else {
        request.get(SOLR_API_DOMAIN+'m/event?fv=472&source=pwa&asset='+assets+'&'+queryString, function(err, response, body) {  
          Util.logRequestError(err, response);
          
          if (!err && response.statusCode == 200) {
              try{
                var locals = JSON.parse(body);
                RedisCache.set("api_eventlisting.cms_"+queryString,locals, 900);
                callback(false, locals);
              } catch(ex){
                Util.sendEmail(SOLR_API_DOMAIN+'m/event?'+queryString);
                RedisCache.get("api_eventlisting.cms_"+queryString,callback);
              }
    
          } else {
            Util.sendEmail(SOLR_API_DOMAIN+'m/event?'+queryString);
            RedisCache.get("api_eventlisting"+queryString,callback);
          }
        });
      }
    });
  },
  
  getElectionListing:function(q, lang, curpg, pp, callback){

    //console.log("Inside getListing",queryArr);
    let queryArr = [];
    if(typeof(q)!='undefined' && q!=""){
      queryArr.push("q="+q);
    }
    if(typeof(lang)!='undefined' && lang!=""){
      queryArr.push("lang="+lang);
    }
    if(typeof(curpg)!='undefined' && curpg!=""){
      queryArr.push("curpg="+curpg);
    } else {
      queryArr.push("curpg=1");
    }
    if(typeof(pp)!='undefined' && pp!=""){
      queryArr.push("pp="+pp);
    } else {
      queryArr.push("pp=20");
    }
		var queryString = queryArr.join("&");
    //console.log(SOLR_API_DOMAIN+'m/atp-list?fv=422&v=v1&source=pwa&asset=se,pg,vd,bn,gm,gvm&'+queryString);
    let feedurl = SOLR_API_DOMAIN + 'm/search/keyword?fv=431&v=v1&source=pwa&'+queryString;
		request.get(feedurl, function(err, response, body) {
      
      Util.logRequestError(err, response);
      
      if (!err && response.statusCode == 200) {
		      try{
		        var locals = JSON.parse(body);
		        RedisCache.set("api_electionlisting_"+queryString,locals);
		        callback(false, locals);
		      } catch(ex){
		        Util.sendEmail(feedurl);
		        RedisCache.get("api_electionlisting_"+queryString,callback);
		      }
		  }else {
		  	Util.sendEmail(feedurl);
		    RedisCache.get("api_electionlisting_"+queryString,callback);
		  }
		});
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
      case 'baidu_browser':return 'bd';
      case 'paytm_browser':return 'paytm';
      case 'tata_sky':return 'ts';
      case 'oppo':return 'oppo';
      default: return 'm';
    }
  },

  processStory:function(story){
    story = story.split("<img ").join('<img alt="image" ');
    //console.log("INside procesStory", story);
    return story;
  },
  
	getDetail:function(msid, lid, mrv, utmSource, utmMedium, callback){
      if(msid==null || msid=='null'){
        callback(true);
        return;
      }
      var shouldProces=true;
      utmSource = this.getUtmPram(utmSource, utmMedium);
      if(msid.length<30){
        callback(true,[]);
      }
      const _this = this;

      RedisCache.get("articleshow_"+msid+"_"+utmSource,function(err, data){
        if(!err){
          callback(err, data);
        } else {
          var time = Date.now();

          var firstime = 0;
          
          var secondtime = 0;
          var thirdtime = 0;
          var fourthtime = 0;
          let lidString= '';
          if(typeof(lid)!='undefined' && !isNaN(lid)){
            lidString = '&lang='+lid;
          }
          let apiName = "news";
          if(typeof(mrv)!='undefined' && mrv){
            apiName = "movie-reviews";
          }

          var apiUrl = SOLR_API_DOMAIN+utmSource+'/'+apiName+'/'+msid+'?source=pwa&v=v1'+lidString; 
          //console.log(apiUrl);
          request.get(apiUrl, function(err, response, body) {
              secondtime = Date.now() - time;
              Util.logRequestError(err, response);
              if (!err && response.statusCode == 200) {
                  var locals={};
                  try{
                    locals = JSON.parse(body);
                    if(locals.hasOwnProperty('it') && locals.it.hasOwnProperty('Story')){
                      locals.it.Story = _this.processStory(locals.it.Story);
                      let story = locals.it.Story;
                      let regex1 = new RegExp(/<twitter([\s]+)id="([0-9]+)"([\s]*)\/>/gi);
                      let regex2 = new RegExp(/<twitter([\s]+)id="([0-9]+)"([\s]*)>([\s]*)<\/twitter>/gi);
                      let tempmatches1 = story.match(regex1);
                      let tempmatches2 = story.match(regex2);
                      let matches = [];
                      if(tempmatches1 && tempmatches1.length>0){
                        matches = tempmatches1;
                      }else if(tempmatches2 && tempmatches2.length>0){
                        matches = tempmatches2;
                      }
                      if(matches && matches.length>0){
                        let promises = [];
                        for(let i=0; i<matches.length;i++){
                          let twitterTag = matches[i];
                          let idRegex = new RegExp(/([0-9]+)/g);
                          let twitterId = twitterTag.match(idRegex);
                          if(twitterId && twitterId.length>0){
                            twitterId = twitterId[0];
                            let turl = "https://publish.twitter.com/oembed?url=https://twitter.com/Interior/status/" + twitterId;
                            promises.push(fetch(turl));
                          }
                          
                        }

                        Promise.all(promises).then(function(data){
                          promises = [];
                          if(typeof(data)!='undefined' && data.length>0){
                            for(let j=0;j<data.length;j++){
                              promises.push(data[j].json());
                            }
                            Promise.all(promises).then(function(dres){
                              if(typeof(dres)!='undefined' && dres.length>0){
                                for(let j=0;j<dres.length;j++){
                                 let tlocals = dres[j];
                                  if(typeof(tlocals)!='undefined' && typeof(tlocals.html)!='undefined' && tlocals.html!=""){
                                    //console.log(matches[j]);
                                    story = story.replace(matches[j], tlocals.html);
                                    locals.it.Story = story;
                                  }                          
                                }
                                //console.log(locals);

                                RedisCache.set("articleshow_"+msid+"_"+utmSource,locals, 1800);
                                thirdtime = Date.now() - time;
                                Util.logApiRequest("1 "+apiUrl, firstime, secondtime,thirdtime, fourthtime);
                                callback(false, locals);
                                //res.json(locals);
                              } else {
                                RedisCache.set("articleshow_"+msid+"_"+utmSource,locals, 1800);
                                thirdtime = Date.now() - time;
                                Util.logApiRequest("2 "+apiUrl, firstime, secondtime,thirdtime, fourthtime);
                                callback(false, locals);
                                //res.json(locals);
                              }
                            }).catch((ex)=>{
                              thirdtime = Date.now() - time;
                              Util.logApiRequest("3 "+apiUrl, firstime, secondtime,thirdtime, fourthtime);
                              callback(false, locals);
                              return;
                            })
                          } else {
                            thirdtime = Date.now() - time;
                            Util.logApiRequest("4 "+apiUrl, firstime, secondtime,thirdtime, fourthtime);
                            RedisCache.set("articleshow_"+msid+"_"+utmSource,locals, 1800);
                            callback(false, locals);
                            //res.json(locals);
                          }
                        });

                      } else {
                        fourthtime =Date.now() - time;
                        Util.logApiRequest("5 "+apiUrl, firstime, secondtime,thirdtime, fourthtime);
                        RedisCache.set("articleshow_"+msid+"_"+utmSource,locals, 1800);
                        callback(false, locals);
                      }
                    } else {
                      Util.sendEmail(SOLR_API_DOMAIN+'m/news/'+msid+'?v=v1');
                      RedisCache.get("articleshow_"+msid+"_"+utmSource,callback);
                    }
                  }catch(ex){
                    Util.logApiRequest("6 "+apiUrl, firstime, secondtime,thirdtime, fourthtime);
                    Util.sendEmail(SOLR_API_DOMAIN+'m/news/'+msid+'?v=v1');
                    RedisCache.get("articleshow_"+msid+"_"+utmSource,callback);
                    //console.log("inside exception",ex);
                  }

              } else {
                Util.logApiRequest("7 "+apiUrl, firstime, secondtime,thirdtime, fourthtime);
                Util.sendEmail(SOLR_API_DOMAIN+'m/news/'+msid+'?v=v1');
                RedisCache.get("articleshow_"+msid+"_"+utmSource,callback);
              }
          });           
        }
      });

	},

	getPubDetail:function(queryArr, callback){
	  const queryString = queryArr.join("&");
    RedisCache.get("Pubarticleshow_"+queryString,function(err, data){
        if(!err){
          callback(err, data);
        } else {
          request.get(API_DOMAIN_URL+'/api_articleshow.cms?'+queryString, function(err, response, body) {
              Util.logRequestError(err, response);
              if (!err && response.statusCode == 200) {
                  var locals={};
                  try{
                  locals = JSON.parse(body);
                   
                  if(locals.hasOwnProperty('it') && locals.it.hasOwnProperty('Story')){
                    
                    let story = locals.it.Story;
                    let regex1 = new RegExp(/<twitter([\s]+)id="([0-9]+)"([\s]*)\/>/gi);
                    let regex2 = new RegExp(/<twitter([\s]+)id="([0-9]+)"([\s]*)>([\s]*)<\/twitter>/gi);
                    let tempmatches1 = story.match(regex1);
                    let tempmatches2 = story.match(regex2);
                    let matches = [];
                    if(tempmatches1 && tempmatches1.length>0){
                      matches = tempmatches1;
                    }else if(tempmatches2 && tempmatches2.length>0){
                      matches = tempmatches2;
                    }
                    if(matches && matches.length>0){
                     // console.log('matches',matches)
                      let promises = [];
                      for(let i=0; i<matches.length;i++){
                        let twitterTag = matches[i];
                        let idRegex = new RegExp(/([0-9]+)/g);
                        let twitterId = twitterTag.match(idRegex);
                        if(twitterId && twitterId.length>0){
                          twitterId = twitterId[0];
                          let turl = "https://publish.twitter.com/oembed?url=https://twitter.com/Interior/status/" + twitterId;
                          promises.push(fetch(turl));
                          


                          request.get(turl,function(terr,tresponse, tbody){
                            let tlocals = JSON.parse(tbody);
                            if(typeof(tlocals)!='undefined' && typeof(tlocals.html)!='undefined' && tlocals.html!=""){
                              story = story.replace(twitterTag, tlocals.html);
                              locals.it.Story = story;
                          RedisCache.set("Pubarticleshow_"+queryString,locals, 1800);
                          callback(false, locals);
                          return;

                              //res.end(locals);
                            }
                          });
                          
                        }
                        
                      }

                      Promise.all(promises).then(function(data){
                        promises = [];
                        if(typeof(data)!='undefined' && data.length>0){
                          for(let j=0;j<data.length;j++){
                            promises.push(data[j].json());
                          }
                          Promise.all(promises).then(function(dres){
                            if(typeof(dres)!='undefined' && dres.length>0){
                              for(let j=0;j<dres.length;j++){
                               let tlocals = dres[j];
                                if(typeof(tlocals)!='undefined' && typeof(tlocals.html)!='undefined' && tlocals.html!=""){
                                  //console.log(matches[j]);
                                  story = story.replace(matches[j], tlocals.html);
                                  locals.it.Story = story;
                                }                          
                              }
                              //console.log(locals);
                              RedisCache.set("Pubarticleshow_"+queryString,locals, 1800);
                              callback(false, locals);
                              return;
                              //res.json(locals);
                            } else {
                              RedisCache.set("Pubarticleshow_"+queryString,locals, 1800);
                              callback(false, locals);
                              return;
                              //res.json(locals);
                            }
                          }).catch((ex)=>{
                              callback(false, locals);
                              return;
                          })
                        } else {
                          RedisCache.set("Pubarticleshow_"+queryString,locals, 1800);
                          callback(false, locals);
                          return;
                          //res.json(locals);
                        }
                      });

                    } else {
                      RedisCache.set("Pubarticleshow_"+queryString,locals, 1800);
                      callback(false, locals);                    
                      return;
                      //res.json(locals);
                    }
                  }
                  //set("api_articleshow.cms_",body);
                }catch(ex){
                  RedisCache.get("Pubarticleshow_"+queryString,callback);
                }
              } else {
                RedisCache.get("Pubarticleshow_"+queryString,callback);
              }
          });
        }
    });

	},	


}