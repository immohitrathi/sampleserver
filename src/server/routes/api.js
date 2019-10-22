'use strict';

const express = require('express');
const router = express.Router();
var url = require('url');

const Util = require("./../models/Util");
const Articles = require("./../models/Articles");
const Cricket = require("./../models/Cricket");
const Photos = require("./../models/Photos");
const Cities = require("./../models/Cities");
const Common = require("./../models/Common");
const Publications = require("./../models/Publications");
const Videos = require("./../models/Videos");
const Games = require("./../models/Games");
const Funnies = require("./../models/Funnies");
const Comics = require("./../models/Comics");
const Astro = require("./../models/Astro");
const Loot = require("./../models/Loot");
const RedisCache = require("./../models/RedisCache");

router.get('/api_photoshow.cms', (req, res) => {
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;
  let msid = query['msid'];
  let curpg = query['curpg'];
  let utm = query['utm_source'];  
  let utm_medium = query['utm_medium'];  
  //let queryArr = Util.parseQueryString(req);
  Photos.getDetail(msid,curpg, utm, utm_medium, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });
});

router.get('/api_photolisting.cms', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;
  let utm = query['utm_source'];  
  let utm_medium = query['utm_medium'];  
  Photos.getListing(queryArr, utm, utm_medium, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  }); 
});

router.get('/api_photomicron.cms', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Photos.getMicron(queryArr, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });
});

router.get('/api_fetchpopularcities.cms', (req, res) => { 
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;
  let lang = query['lang'];

  Cities.getPopularCities(lang, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });  
});

router.get('/api_fetchallcities.cms', (req, res) => {
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;
  let lang = query['lang'];

  Cities.getAllCities(lang, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  }); 
});

router.get('/api_fetchlocation', (req, res) => {
  //let ip = req.connection.remoteAddress;
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);
  ip = ip.split(",");
  ip = ip[0].trim();
  Cities.getLocation(ip, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  }); 
});

router.get('/api_fetchcitylocalized', (req, res) => {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var lang = query['lang'];
  var city = query['city'];

  Cities.getCityLocalized(city, lang, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });
});

router.get('/api_fetchweatherdata', (req, res) => {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var city = query['city'];
  /* Cities.getAllWeatherCity(city,function(err, data){
    if(err || !data){
      res.status(404).send('Not found');
    } else {
      Cities.getWeatherData(data, function(err, data){
        if(err){
          res.status(404).send('Not found');
        } else {
          res.json(data);
        }
      });
    }
  }); */
  Cities.getWeather(city, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });
});

router.get('/api_listing.cms', (req, res) => {
  //let queryArr = Util.parseQueryString(req);
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;

  Articles.getListing(query.section, query.lang, query.curpg, query.pp, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  })
});

router.get('/api_eventlisting.cms', (req, res) => {
  //let queryArr = Util.parseQueryString(req);
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;

  Articles.getEventListing(query.searchTerm, query.lang, query.curpg, query.pp, query.utm_source, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  })
});

router.get('/api_electionlisting', (req, res) => {
  //let queryArr = Util.parseQueryString(req);
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;

  Articles.getEventListing(query.q, query.lang, query.curpg, query.pp, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  })
});


router.get('/api_hamburger.cms', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Common.getNavigations(queryArr, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  })
});

router.get('/api_pubcatnav.cms', (req, res) => {
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;
  let queryArr = Util.parseQueryString(req);
  Publications.getNavigations(queryArr,query.nav, query.section, query.subnav, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  })
});


router.get('/api_pubs.cms', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Publications.getPubs(queryArr, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  })  
});

router.get('/api_ads.cms', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Common.getAds(queryArr, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  })
});


router.get('/offlineFeed/getRawFeed', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Common.getRawFeeds(queryArr, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  })
});



router.get('/api_toppub.cms', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Publications.getTopPubs(queryArr, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  })
});



router.get('/api_videolisting.cms', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Videos.getWatchList(queryArr, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  })
});

router.get('/api_videocats', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Videos.getVideoCategories(queryArr, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  })
});

router.get('/api_electionvideos', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Videos.getElectionVideos(queryArr, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  })
});


router.get('/api_pubvideolisting.cms', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Publications.getVideos(queryArr, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  })
});

router.get('/api_livetv.cms', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Videos.getLiveTv(queryArr, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  })
});

router.get('/api_videoshow.cms', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Videos.getVideoShow(queryArr, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  })
});

router.get('/api_pubhome.cms', (req, res) => {
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;
  let queryArr = Util.parseQueryString(req);
  Publications.getListing(queryArr, query.nav, query.subsection, query.curpg, query.lang, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  })
});

router.get('/api_articleshow.cms', (req, res) => {
  var url_parts = url.parse(req.url, true);
  var msid = url_parts.query['id'];
  var lid = url_parts.query['lid'];
  var mrv = url_parts.query['mrv'];
  var utm = url_parts.query['utm_source'];
  var medium = url_parts.query['utm_medium'];

  if(typeof(msid)=='undefined' || msid=='undefined'){
    res.status(404).send('Not found getlist');
    return;
  }

  Articles.getDetail(msid,lid,mrv,utm,medium,function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });
});

router.get('/api_articleshowsinglepub.cms', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Articles.getPubDetail(queryArr,function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });
});


router.get('/api_headmeta.cms', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Common.getHeadMeta(queryArr,function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  }); 
});


router.get('/api_micronapi.cms', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Common.getMicron(queryArr,function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });
});

router.get('/translationapi.cms', (req, res) => {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var queryArr = [];
  for(var prop in query){
    queryArr.push(prop+"="+encodeURIComponent(query[prop]));
  }
  Common.getTranslation(queryArr,function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });
});

router.get('/validateticket', (req, res) => {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  Common.validateTicket(query,function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });
});

router.get('/profileinfo', (req, res) => {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  Common.getProfileInfo(query,function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  }); 
});


router.get('/api_channelsvideolist.cms', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Videos.getChannelVideoListing(query,function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });  
 
});


router.get('/api_slike', (req, res) => {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var eid = query['id'];
  Videos.getSlikeUrl(eid,function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });
});


router.get('/api_quotelist.cms', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Common.getQuoteList(queryArr,function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });
});

router.get('/verifiyonetape', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Common.verifiyOneTape(queryArr,function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  }); 
});

router.get('/gethpcricwidget', (req, res) => {
  //var queryArr = Util.parseQueryString(req);
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var lang = query['lang'];  
  Cricket.getHomeWidget(lang, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });
});


router.get('/getmatchlist', (req, res) => {
  var queryArr = Util.parseQueryString(req);
  Cricket.getMatchList(queryArr,function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }    
  })
});

router.get('/getmatchdetail/:matchfile', (req, res) => {
  var queryArr = Util.parseQueryString(req);
  var matchfile = req.params.matchfile;
  Cricket.getMatchDetail(matchfile, queryArr,function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }    
  })
});



router.get('/loadcommentary/:matchfile', (req, res) => {
  var queryArr = Util.parseQueryString(req);
  var matchfile = req.params.matchfile;
  var commentId = typeof(req.query.id)!='undefined'?req.query.id:0;
  Cricket.loadMoreCommentary(matchfile, commentId, queryArr,function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }    
  })
});

router.get('/getmatchplayers/:matchfile', (req, res) => {
  var queryArr = Util.parseQueryString(req);
  var matchfile = req.params.matchfile;
  Cricket.getMatchPlayers(matchfile, queryArr,function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }    
  })
});

router.get('/iplpoints', (req, res) => {
  var queryArr = Util.parseQueryString(req);
  Cricket.getIplPoints(queryArr,function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }    
  })
});

router.get('/getmatchshortdetail/:matchfile', (req, res) => {
  var queryArr = Util.parseQueryString(req);
  var matchfile = req.params.matchfile;
  Cricket.getMatchShortDetail(queryArr, matchfile,function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }    
  })
});


router.get('/games/game/:code', (req, res) => {
  var code = req.params.code;
  Games.getGameData(code, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }    
  })
});


router.get('/games/:type', (req, res) => {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var page = query['pg'];
  var type = req.params.type;
  Games.getGames(type, page, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }    
  })
});


router.get('/funnies', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;
  let utm = query['utm_source'];  
  let utm_medium = query['utm_medium'];  
  Funnies.getFunnies(queryArr, utm, utm_medium, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }    
  })
});

router.get('/captainspeaks', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;
  let utm = query['utm_source'];  
  let utm_medium = query['utm_medium'];  
  Funnies.getCaptainSpeaks(queryArr, utm, utm_medium, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }    
  })
});

router.get('/funnies/meme/:id', (req, res) => {
  var id = req.params.id;
  Funnies.getMeme(id, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }    
  })
});

router.get('/funnies/gif/:id', (req, res) => {
  var id = req.params.id;
  Funnies.getGif(id, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }    
  })
});

router.get('/funnies/video/:id', (req, res) => {
  var id = req.params.id;
  Funnies.getVideo(id, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }    
  })
});

router.get('/updatelikescount', (req, res) => {
  var url_parts = url.parse(req.url, true);
  var obj = url_parts.query;
  Funnies.updateLikesCount(obj,function(err,data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });
});


router.get('/api_comics.cms', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Comics.getDetail(queryArr, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });
});

router.get('/api_comicslisting.cms', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Comics.getListing(queryArr, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  }); 
});

router.get('/astrosigns/:lang', (req, res) => {
  let lang = req.params.lang;
  Astro.getSigns(lang, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  }); 
});

router.get('/horoscope/:id/:lang', (req, res) => {
  let id = req.params.id;
  let lang = req.params.lang;
  Astro.getHoroscope(id, lang, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  }); 
});

router.get('/loot/contest/:langId', (req, res) => {
  let langId = req.params.langId;
  Loot.getContestDetail(langId, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  }); 
});

router.get('/loot/prize/:langId/:ssoid', (req, res) => {
  let langId = req.params.langId;
  let ssoid = req.params.ssoid;
  Loot.getPrizeDetail(langId, ssoid, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  }); 
});

router.get('/log', (req, res) => {
  var url_parts = url.parse(req.url, true);
  var href = url_parts.query['href'];
  let key = "logurl_"+Util.makeKey(href);
  RedisCache.get(key,function(err, reply){
    let count=1;
    if(!err){
      count = parseInt(reply);
      count+=1;
    } 
    RedisCache.set(key,count);
    res.status(200).send('logged:'+count);
  });  
});


router.get('/micronapi', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Common.getMicronUrl(queryArr,function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });
});

router.get('/api_electionconfig', (req, res) => { 
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;
  let lang = query['lang'];
  if(typeof(lang)==='undefined'){
    lang = 1;
  }
  Common.getElectionConfig(lang, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });  
});

router.get('/api_electionstates', (req, res) => { 
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;
  let lang = query['lang'];
  if(typeof(lang)==='undefined'){
    lang = 1;
  }
  Common.getElectionStates(lang, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });  
});

router.get('/api_electiondata', (req, res) => { 
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;
  let lang = query['lang'];
  if(typeof(lang)==='undefined'){
    lang = 1;
  }
  let stateId = query['stateId'];
  if(typeof(stateId)==='undefined'){
    stateId = 'all';
  }
  let r = query['r'];
  Common.getElectionData(lang, stateId, r, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });  
});

router.get('/api_preelection', (req, res) => { 
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;
  let lang = query['lang'];
  if(typeof(lang)==='undefined'){
    lang = 1;
  }
  Common.getPreElectionData(lang, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });  
});

router.get('/fetchweather', (req, res) => {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var city = query['city'];
  Cities.getToiWeatherData(city,function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });
});

router.get('/amazon/lang/:lang', (req, res) => {
  var lang = req.params.lang;
  Common.getAmazonTranslation(lang,function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });
});

router.get('/amazon/:lang/:section', (req, res) => {
  var section = req.params.section;
  var lang = req.params.lang;
  Common.getAmazonData(lang, section,function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  });
});

router.get('/games-home', (req, res) => {
  Games.getHomeGames(function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }    
  })
});

router.get('/gamescat/:cat', (req, res) => {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var page = query['pg'];
  var perpage = query['pp'];
  var cat = req.params.cat;
  Games.getGamesCategoryListing(cat, page, perpage, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }    
  })
});


module.exports = router;