const request = require("request");
const config = require("./../../config/server");
const Util = require("./Util");
const RedisCache = require("./RedisCache");
const parseString = require('xml2js').parseString;

module.exports = {
	getIndiaLiveMatch:function(matches){
	  let indiaMatches = matches.filter((item)=>{
	    if(item['$'].teama_Id=='4' || item['$'].teamb_Id=='4'){
	      return item;
	    }
	  });

	  if(indiaMatches.length>0){
	    let liveMatch = this.getLiveMatch(indiaMatches);
	    return liveMatch;
	  }
	  return [];
	},

	getIplLiveMatch:function(matches){
	  let iplMatches = this.getIplMatches(matches);
	  if(iplMatches.length>0){
	    let liveMatch = this.getLiveMatch(iplMatches);
	    return liveMatch;
	  }
	  return [];
	},

	getIndiaMatches:function(matches){
	  let indiaMatches = matches.filter((item)=>{
	    if(item['$'].teama_Id=='4' || item['$'].teamb_Id=='4'){
	      return item;
	    }
	  });
	  return indiaMatches;
	},

	getIplMatches:function(matches){
	  let indiaMatches = matches.filter((item)=>{
	    if(item['$'].league=='IPL'){
	      return item;
	    }
	  });
	  return indiaMatches;
	},

	getLiveMatch:function(matches, all){
		/* sandeep: need to remove*/
		/* let liveMatches = matches.filter((item)=>{
	    if(item['$'].teama_Id=='1'){
	      return item;
	    }
		}); */
		/* sandeep: need to remove ends, and uncomment below lines*/

	  let liveMatches = matches.filter((item)=>{
	    if(item['$'].live=='1' && item['$'].livecoverage=='yes' && typeof(item['$']['inn_score_1'])!='undefined' && item['$']['inn_score_1']!=''){
	      return item;
	    }
	  });

	  if(liveMatches.length>1) {
	    liveMatches.sort((a,b)=>{
	      let dt1 = this.getMatchDate(a['$'].matchdate_ist, a['$'].matchtime_ist);
	      let dt2 = this.getMatchDate(b['$'].matchdate_ist, b['$'].matchtime_ist);
	      if(dt1.getTime()>dt2.getTime()){
	        return -1;
	      } else {
	        return 1;
	      }
	    });
	  }

	  if(liveMatches.length>0){
			if(all) {
				return liveMatches;
			} else {
				return liveMatches[0];
			}
	  	
	  } else {
	  	return [];
	  }
	  
	  //return liveMatches;
	},

	getMatchDate:function(dt, tm){
	  let dateStrArr = dt.split("/");
	  let timeStrArr = tm.split(":");
	  let matchDate = new Date(parseInt(dateStrArr[2]), parseInt(dateStrArr[0]-1), parseInt(dateStrArr[1]), parseInt(timeStrArr[0]), parseInt(timeStrArr[1]), 0,0);
	  return matchDate;
	},

	getNowShowingMatches:function(matches){
	  let curDate = new Date();
	  let nowshowing = matches.filter((item)=>{
	    let matchDate = this.getMatchDate(item['$'].matchdate_ist, item['$'].matchtime_ist);
	    if(item['$'].live=='1' || matchDate.getTime()<=curDate.getTime()){
	      return item;
	    }
	  });
	  return nowshowing;
	},

	getUpComingMatches:function(matches){
	  let curDate = new Date();
	  let upcoming = matches.filter((item)=>{
	    let matchDate = this.getMatchDate(item['$'].matchdate_ist, item['$'].matchtime_ist);
	    if(matchDate.getTime()>curDate.getTime()){
	      return item;
	    }
	  });
	  return upcoming;
	},

	getNowshowingUpcomingMatches:function(matches){
	  let nowshowing = [], upcoming = [];
	  nowshowing = this.getNowShowingMatches(matches);
	  upcoming = this.getUpComingMatches(matches);
	  return {'nowshowing':this.sortMatches(nowshowing),'upcoming':upcoming};
	},

	sortLiveMatches:function(matches){
	  var sortReq = false;
	  var liveMatches = [];
	  var matchesKey = [];
	  var key = 0;
	  for(let match of matches){
	    if(match['$'].live=='1'){
	      liveMatches.push(match);
	      matchesKey.push(key);
	      sortReq = true;
	      //break;
	    }
	    key++;
	  }
	  
	  if(sortReq){

		matchesKey = matchesKey.reverse();
		for(let i=0;i<matchesKey.length;i++) {
			matches.splice(matchesKey[i],1);
		}

		liveMatches = this.sortIndiaMatches(liveMatches);

		matches = liveMatches.concat(matches);
	  }
	  return matches;
	},

	sortIndiaMatches:function(matches){
	  if(matches.length>0){
	  		let indiaMatch = [];
	  		let otherMatch = [];
		  for(let match of matches){
		    if(match['$'].teama_Id=='4' || match['$'].teamb_Id=='4'){
		      indiaMatch.push(match);
		    } else {
		    	otherMatch.push(match);
		    }
		  }
		  matches = indiaMatch.concat(otherMatch);			  	
	  }
	  return matches;
	},

	sortMatches:function(matches) {
	  if(matches.length>0) {
	    matches.sort((a,b)=>{
	      let dt1 = this.getMatchDate(a['$'].end_matchdate_ist, a['$'].end_matchtime_ist);
	      let dt2 = this.getMatchDate(b['$'].end_matchdate_ist, b['$'].end_matchtime_ist);
	      //console.log("Inside sortMatches",a['$'].live,b['$'].live);
	      if(b['$'].live=="1"){
	        return 1;
	      }

	      if(dt1.getTime()==dt2.getTime()){
	        if(a['$'].teama_Id=="4" || a['$'].teamb_Id=="4"){
	          return 1;
	        } else if(b['$'].teama_Id=="4" || b['$'].teamb_Id=="4"){
	          return -1;
	        } else {
	          return 1;
	        }
	      } else if(dt1.getTime()>dt2.getTime()){
	        return -1;
	      } else {
	        return 1;
	      }
	    });
	  }
	  return this.sortLiveMatches(matches);
	},

	getMatchScore:function(matchId,cb){
		RedisCache.get("match_"+matchId,cb);
	},

	normalizeCricketData:function(result, inningName, inningPrefix){
		var tempInning = {};
		tempInning['d'] = result['Matchdetail'][inningName][0]['$'];
		tempInning['Batsmen'] = result['Matchdetail'][inningName][0][inningPrefix+'Batsmen'][0][inningPrefix+'Batsman'];
		tempInning['Bowlers'] = result['Matchdetail'][inningName][0][inningPrefix+'Bowlers'][0][inningPrefix+'Bowler'];
		tempInning['Extras'] = result['Matchdetail'][inningName][0][inningPrefix+'Extras'][0]['$'];
		tempInning['Equation'] = result['Matchdetail'][inningName][0][inningPrefix+'Equation'][0]['$'];
		tempInning['FallofWickets'] = result['Matchdetail'][inningName][0][inningPrefix+'FallofWickets'][0]['$'];
		if(result['Matchdetail'][inningName][0].hasOwnProperty(inningPrefix+'Substitutions')){
			tempInning['Substitutions'] = result['Matchdetail'][inningName][0][inningPrefix+'Substitutions'][0]['$'];
		}

		if(result['Matchdetail'][inningName][0].hasOwnProperty(inningPrefix+'PowerPlay')){
			tempInning['PowerPlay'] = result['Matchdetail'][inningName][0][inningPrefix+'PowerPlay'][0]['$'];
		}
		if(result['Matchdetail'][inningName][0].hasOwnProperty(inningPrefix+'OverDetail')){
			tempInning['OverDetail'] = result['Matchdetail'][inningName][0][inningPrefix+'OverDetail'][0]['$'];
		}
		if(result['Matchdetail'][inningName][0].hasOwnProperty(inningPrefix+'MatchNotes')){
			tempInning['MatchNotes'] = result['Matchdetail'][inningName][0][inningPrefix+'MatchNotes'][0]['Note'];
		}
		return tempInning;
	},

	getOverDetail:function(commentary){
	  var runs = [];
	  if(typeof(commentary)!='undefined' && commentary.length>0){
	    for(var i=0;i<commentary.length;i++){
	      if(commentary[i].hasOwnProperty('totalrun')){
	        continue;
	      }
	      
	      if(commentary[i]['detail']['Wicket']=='Yes'){
	        runs.push('W');
	      } else if(commentary[i]['detail']['Over']!=""){
	        runs.push(commentary[i]['runs']);
	      }
	      if(commentary[i]['detail']['Ball']=='1'){
	        runs.push("|");
	      }
	    }
	  }

	  if(runs.length>0){
	    runs = runs.slice(0, 14);
	    return runs.reverse();
	    //return runs;
	  }
	},

	commentryAddSaperator:function(commentary){
	  var run=0, wkt = 0, totalrun = 0, totalwkt = 0;
	  var obj = {};
	  var saperatorArr = [];
	  for(var i=0;i<commentary.length;i++){
	    //console.log(commentary[i]['runs'][0]);
	    
	    if(typeof(commentary[i]['$'])!='undefined' && commentary[i]['$']['Over']!=""){
	      if(typeof(commentary[i]['Runs'])!='undefined' && !isNaN(commentary[i]['Runs'][0])){
	        run += parseInt(commentary[i]['Runs'][0]);
	        totalrun += parseInt(commentary[i]['Runs'][0]);  
	      }

	      if(commentary[i]['Details']!="")  {
	        if(commentary[i]['Details'][0].indexOf("WD")>=0 || commentary[i]['Details'][0].indexOf("LB")>=0 || commentary[i]['Details'][0].indexOf("NB")>=0) {
	          commentary[i]['Runs'][0] = commentary[i]['Details'][0].toLowerCase();
	        }
	      }
	      
	      if(commentary[i]['$']['Wicket']=='Yes'){
	        wkt++;
	        totalwkt++;
	      }
	      if(commentary[i]['$']['Ball']=="1"){
	        var thisOverDetail = null;
	        for(var j=i-1;j>=0;j--){
	          var thisOver = commentary[j]['ThisOver'][0];
	          if(thisOver.split(" ").join("")!=""){
	            thisOverDetail = commentary[j];
	            break;
	          }
	        }
	        if(thisOverDetail){
	          var tempRunArr = thisOverDetail['ThisOver'][0].split(",");
	          run = 0;
	          for(var j=0;j<tempRunArr.length;j++){
	            if(tempRunArr[j].split(" ").join("")!=""){
	              run+= parseInt(tempRunArr[j]);
	            }
	            if(tempRunArr[j].indexOf("LB")>=0 || tempRunArr[j].indexOf("WD")>=0|| tempRunArr[j].indexOf("NB")>=0){
	              //run+=1;
	            }
	            
	          }
	        }
	        obj['thisOver'] = thisOverDetail;
	        obj['over'] = commentary[i]['$']['Over']-1;
	        obj['wkt'] = wkt;
	        obj['totalwkt'] = totalwkt;
	        obj['run'] = run;
	        obj['totalrun'] = totalrun;
	        obj['index'] = i-1;
	        //obj['score'] = (typeof(commentary[i]['Score'])!='undefined' && commentary[i]['Score'].length>0)?commentary[i]['Score'][0]:false;
	        obj['score'] = (thisOverDetail && typeof(thisOverDetail.Score)!='undefined' && thisOverDetail.Score.length>0)?thisOverDetail.Score[0]:false;
	        saperatorArr.push(Object.assign({},obj));
	        run = wkt = 0;
	        //commentary.splice(i, 0, obj);
	      }
	    }
	  }

	  for(var j=0;j<saperatorArr.length;j++){
	    commentary.splice(saperatorArr[j].index+j+1, 0, saperatorArr[j]);
	  }
	  return commentary;
	},

	getOverBallFromCommentary:function(commentary){
	  let tempArr = commentary.split(":");
	  if(tempArr.length>0 && !isNaN(tempArr[0])){
	    return {overball:tempArr[0], commentary:tempArr[1]};
	  }
	  return false;
	},

	makeUrl:function(url){
		url = url.split(",").join("");
		url = url.split("/").join("-");
	  if(typeof(url)!='undefined' && url!=""){
	    return url.split(" ").join("-").toLowerCase();
	  } else return url;
	},

	getYear:function(dt){
	  let dtArr = dt.split("/");
	  if(dtArr.length>0){
	    return dtArr[dtArr.length-1];
	  } else {
	    return new Date().getYear();
	  }		
	},

	getHomeWidget:function(lang, callback){
		const _this = this;
		RedisCache.get("getHomeWidget_1",function(rerr, rres){
			if(!rerr && rres) {
				if(rres && typeof(rres.url)!=='undefined'){
					rres.url  =rres.url.replace("[lang]",lang);
				}
				callback(false, rres);
			} else {
				callback(false, []);
			}
		})
	},

	getMatchList:function(queryArr, callback){
	  var queryString = queryArr.join("&");
	  const _this = this;

	  request.get({url:'http://toicri.timesofindia.indiatimes.com/calendar_new_liupre.xml', timeout:'20000'}, function(err, response, body) {
	  	Util.logRequestError(err, response);
	      if (!err && response.statusCode == 200) {
	          parseString(body, function (err, result) {
	              var matches=[];
	              try{
	                if(typeof(result)!='undefined' && typeof(result.calendar)!='undefined'){                  
	                  result = result['calendar']['match'];
	                  matches = _this.getNowshowingUpcomingMatches(result);

	                  request.get('http://toicri.timesofindia.indiatimes.com/calendar_new.xml?'+queryString, function(err1, response1, body1) {
	                  	Util.logRequestError(err1, response1);
	                    parseString(body1, function (err2, result2) {
	                      if(err1 || typeof result2 == 'undefined'){
	                      	RedisCache.set("getMatchList_"+queryString,matches);
	                      	callback(false, matches);
	                      }
	                       var result2 = result2['calendar']['match'];
	                       var matches2 = _this.getNowshowingUpcomingMatches(result2);

	                       for(var i=0;i<matches2['nowshowing'].length;i++){
	                          var tempMatch = matches['nowshowing'].find((mtch)=>{
	                            if(mtch['$']['matchfile']==matches2['nowshowing'][i]['$']['matchfile']){
	                              return mtch;
	                            }
	                          });
	                          //console.log(tempMatch);
	                          if(tempMatch){
	                            matches2['nowshowing'][i] = tempMatch;
	                          }
	                       }

	                       matches['upcoming'] = matches2['upcoming'];
	                       matches['nowshowing'] = matches2['nowshowing'];

	                       var totalRecoeds = matches['nowshowing'].length;
	                       var count = 0;
	                       for(let i=0;i<matches['nowshowing'].length;i++){
	                          (function(idx){
	                            let score = _this.getMatchScore(matches['nowshowing'][i]['$']['match_Id'],function(rerr, rdata){
	                              //console.log(rdata, matches['nowshowing'][i]['$']['match_Id']);
	                              //var tempObj = matches['nowshowing'][i];
	                              if(rerr==false){
	                                let innScore = rdata['teamscore']
	                                let teamaId = matches['nowshowing'][i]['$']['teama_Id'];
	                                let teambId = matches['nowshowing'][i]['$']['teamb_Id'];
	                                let tossWinnBy = matches['nowshowing'][i]['$']['toss_won_by'];
	                                let tossElectedTo = matches['nowshowing'][i]['$']['toss_elected_to'];
	                                let inn1Team, inn2Team;
	                                if(tossElectedTo=='bat'){
	                                  inn1Team = tossWinnBy;
	                                  inn2Team = teamaId==tossWinnBy?teambId:teamaId;
	                                  //matches['nowshowing'][i]['$']['inn_team_1'] = tossWinnBy;
	                                  //matches['nowshowing'][i]['$']['inn_score_1'] = innScore[tossWinnBy];
	                                } else{
	                                  inn1Team = teamaId==tossWinnBy?teambId:teamaId;
	                                  inn2Team = teamaId==tossWinnBy?teamaId:teambId;
	                                  //matches['nowshowing'][i]['$']['inn_team_1'] = inn2Team;
	                                  //matches['nowshowing'][i]['$']['inn_score_1'] = innScore[inn2Team];
	                                }
	                                matches['nowshowing'][i]['$']['inn_team_1'] = inn1Team;
	                                matches['nowshowing'][i]['$']['inn_score_1'] = matches['nowshowing'][i]['$']['inn_score_1']?matches['nowshowing'][i]['$']['inn_score_1']:innScore[inn1Team]['inn_score_1'];
	                                matches['nowshowing'][i]['$']['inn_team_2'] = inn2Team;
	                                matches['nowshowing'][i]['$']['inn_score_2'] = matches['nowshowing'][i]['$']['inn_score_2']?matches['nowshowing'][i]['$']['inn_score_2']:(typeof(innScore[inn2Team])!='undefined'?innScore[inn2Team]['inn_score_2']:"");
	                                
	                                if(typeof(innScore[inn1Team])!='undefined'){
		                                matches['nowshowing'][i]['$']['inn_team_3'] = innScore[inn1Team]['inn_score_3']?inn1Team:inn2Team;
		                                matches['nowshowing'][i]['$']['inn_score_3'] = matches['nowshowing'][i]['$']['inn_score_3']?matches['nowshowing'][i]['$']['inn_score_3']:innScore[inn1Team]['inn_score_3']?innScore[inn1Team]['inn_score_3']:(typeof(innScore[inn2Team])!='undefined'?innScore[inn2Team]['inn_score_3']:"");
	
	                                }
	                                
	                                if(typeof(innScore[inn1Team]['inn_score_4'])){
		                                matches['nowshowing'][i]['$']['inn_team_4'] = innScore[inn1Team]['inn_score_4']?inn1Team:inn2Team;
		                                matches['nowshowing'][i]['$']['inn_score_4'] = matches['nowshowing'][i]['$']['inn_score_4']?matches['nowshowing'][i]['$']['inn_score_4']:innScore[inn1Team]['inn_score_4']?innScore[inn1Team]['inn_score_4']:(typeof(innScore[inn2Team])!='undefined'?innScore[inn2Team]['inn_score_4']:"");
	
	                                }
	                                
	                                //console.log(matches['nowshowing'][10]['$']);
	                              }
	                              count++;
	                              if(count>=totalRecoeds){
	                              	RedisCache.set("getMatchList_"+queryString,matches);
	                      			callback(false, matches);
	                                //res.json(matches);
	                                return;
	                              }
	                            })
	                          })(i)
	                       }
	                       
	                    });
	                  });

	                }
	              } catch(ex){
	                Util.sendEmail('3 http://toicri.timesofindia.indiatimes.com/calendar_new_liupre.xml?'+queryString);
	                RedisCache.get("getMatchList_"+queryString,callback);
	              }
	          });
	      } else {
	        Util.sendEmail('4 http://toicri.timesofindia.indiatimes.com/calendar_new_liupre.xml?'+queryString);
	        RedisCache.get("getMatchList_"+queryString,callback);
	      }
	  }); 		
	},

	getMatchDetail:function(matchfile, queryArr, callback){
		var queryString = queryArr.join("&");
		const _this = this;
		RedisCache.get("getMatchDetail_"+matchfile,function(rerr, rres){
			if(!rerr && typeof(rres)!=='undefined') {
				//data available in redis, serve from redis
				console.log("from redis");
				callback(false, rres);
			} else {
				console.log("from network");
				request.get('http://toicri.timesofindia.indiatimes.com/'+matchfile+'.xml?'+queryString, function(err, response, body) {
					Util.logRequestError(err, response);
						if (!err && response.statusCode == 200) {
								parseString(body, function (err, result) {
									if(err){
										RedisCache.get("getMatchDetail_"+matchfile,callback);
									}            
										try{
											if(typeof(result)!='undefined'){
	
												if(result.hasOwnProperty("Matchdetail")){
	
													//if match is now playing(live), add batting and bowling team 
													if(result['Matchdetail']['$']['Status']=='Play in Progress' || result['Matchdetail']['$']['Status_Id']=='117' || result['Matchdetail']['$']['Status']=='Innings Break' || result['Matchdetail']['$']['Status_Id']=='110' ){
														var currentInning = result['Matchdetail']['$']['currentinning'];
														var teamA = "";
														var teamB = "";
														
														teamA = result['Matchdetail']['FirstInnings'][0]['$'].Battingteam;
														teamB = result['Matchdetail']['FirstInnings'][0]['$'].Bowlingteam;
	
														result['Matchdetail']['$']['teama'] = teamA;
														result['Matchdetail']['$']['teamb'] = teamB;                      
													}
	
													//Filter data (rename key to easy access in frontend)
	
													if(result['Matchdetail'].hasOwnProperty('FirstInnings') && result['Matchdetail']['FirstInnings'][0].hasOwnProperty('$')){
														result['Matchdetail']['FirstInnings'] = _this.normalizeCricketData(result,'FirstInnings','FI');
													} else {
														delete(result['Matchdetail']['FirstInnings'])
													}
													
													if(result['Matchdetail'].hasOwnProperty('SecondInnings')  && result['Matchdetail']['SecondInnings'][0].hasOwnProperty('$')){
														result['Matchdetail']['SecondInnings'] = _this.normalizeCricketData(result,'SecondInnings','SI');
													} else {
														delete(result['Matchdetail']['SecondInnings'])
													}
													if(result['Matchdetail'].hasOwnProperty('ThirdInnings')  && result['Matchdetail']['ThirdInnings'][0].hasOwnProperty('$')){
														result['Matchdetail']['ThirdInnings'] = _this.normalizeCricketData(result,'ThirdInnings','TI');
													} else {
														delete(result['Matchdetail']['ThirdInnings'])
													}                                       
													if(result['Matchdetail'].hasOwnProperty('FourthInnings') && result['Matchdetail']['FourthInnings'][0].hasOwnProperty('$')){
														result['Matchdetail']['FourthInnings'] = _this.normalizeCricketData(result,'FourthInnings','FOI');
													} else {
														delete(result['Matchdetail']['FourthInnings'])
													}                                     
													
													let currentInn = result['Matchdetail']['$']['currentinning'];
													let inningFile = "_1";
													if(currentInn=='Second'){
														inningFile = "_2";
													} else if(currentInn=='Third'){
														inningFile = "_3";
													} else if(currentInn=='Fourth'){
														inningFile = "_4";
													}
	
	
													//get Commentry
													var CommentryUrl = "http://toicri.timesofindia.indiatimes.com/"+matchfile+"_ballbyball"+inningFile+".xml";
													if(result['Matchdetail']['$']['matchtype']!='Test'){
														CommentryUrl = "http://toicri.timesofindia.indiatimes.com/"+matchfile+"_ballbyball.xml";
													}
													//console.log(CommentryUrl);
													request.get(CommentryUrl,function(err1, response1, body1){
														Util.logRequestError(err1, response1);
														if (!err1 && response1.statusCode == 200) {
															parseString(body1, function (err2, result2) {
																
																var innings = {};
																if(typeof(result2)!='undefined' && result2.hasOwnProperty("Match") && result2.Match.hasOwnProperty('Innings')){
																	var j = result2.Match.Innings.length-1;
																	for(var k=j;k>=0;k--){
																		if(result2.Match.Innings[k].hasOwnProperty('Node')  && result2.Match.Innings[k].Node.length>0){
																			j=k;
																			break;
																		}
																	}
	
																	var inningsData = {};
																	inningsData['detail'] = result2.Match.Innings[j]['$'];
																	if(result2.Match.Innings[j].hasOwnProperty('Node') && result2.Match.Innings[j].Node.length>0){
																		inningsData['detail']['comm'] = [];
																		result2.Match.Innings[j]['Node'] = _this.commentryAddSaperator(result2.Match.Innings[j]['Node']);
	
																		var last12Commentry = result2.Match.Innings[j]['Node'].slice(-25);
																		for(var k=0;k<last12Commentry.length;k++){
																			var tempData = {};
																			if(last12Commentry[k].hasOwnProperty('totalrun')){
																				inningsData['detail']['comm'].push(last12Commentry[k]);
																				continue;
																			}
	
																			tempData['detail'] = last12Commentry[k]['$'];
																			tempData['runs'] = last12Commentry[k]['Runs'][0];
																			var overball = _this.getOverBallFromCommentary(last12Commentry[k]['Commentary'][0]);
																			if(overball){
																				tempData['overball'] = overball.overball;
																				tempData['commentary'] = overball.commentary;
																			} else {
																				tempData['overball'] = false;
																				tempData['commentary'] = last12Commentry[k]['Commentary'][0];
																			}
	
																			//tempData['commentary'] = last12Commentry[k]['Commentary'][0];
																			inningsData['detail']['comm'].push(tempData);
																		}
	
																		inningsData['detail']['comm'] = _this.commentryAddSaperator(inningsData['detail']['comm']);
	
	
																		inningsData['detail']['comm'].reverse();
																	}
																	innings = inningsData;
																	var overDetail = _this.getOverDetail(inningsData['detail']['comm']);
																	if(typeof(overDetail)!='undefined' && overDetail.length>0){
																		result['Matchdetail']['$']['OverDetail'] = overDetail.join(",");
																	}
																	
																}
					
																result['Matchdetail'] = Object.assign(result['Matchdetail'], {'commentary':innings});
																RedisCache.set("getMatchDetail_"+matchfile,result);
																callback(false, result);
															});
														} else {
															RedisCache.set("getMatchDetail_"+matchfile,result);
															callback(false, result);
														}
													});
												}
	
												
											}
										} catch(ex){
											console.log("Inside match detail",ex);
											Util.sendEmail('5 http://toicri.timesofindia.indiatimes.com/'+matchfile+'.xml?'+queryString);
											RedisCache.get("getMatchDetail_"+matchfile,callback);
										}
								});
						} else {
							Util.sendEmail('6 http://toicri.timesofindia.indiatimes.com/'+matchfile+'.xml?'+queryString);
							RedisCache.get("getMatchDetail_"+matchfile,callback);
						}
				});	
			}
		});



	
	},

	loadMoreCommentary:function(matchfile,commentId,  queryArr, callback){
	  var queryString = queryArr.join("&");
	  const _this = this;		
	  request.get('http://toicri.timesofindia.indiatimes.com/'+matchfile+'.xml?'+queryString, function(err, response, body) {
	  	Util.logRequestError(err, response);
	      if (!err && response.statusCode == 200) {
	          parseString(body, function (err, result) {
	            if(err){
	            	RedisCache.get("loadMoreCommentary_"+matchfile+"_"+queryString,callback);
	            }
	              try{
	                if(typeof(result)!='undefined' && result.hasOwnProperty("Matchdetail")){

	                    let currentInn = result['Matchdetail']['$']['currentinning'];
	                    let inningFile = "_1";
	                    if(currentInn=='Second'){
	                      inningFile = "_2";
	                    } else if(currentInn=='Third'){
	                      inningFile = "_3";
	                    } else if(currentInn=='Fourth'){
	                      inningFile = "_4";
	                    }

	                  //get Commentry
	                  var CommentryUrl = "http://toicri.timesofindia.indiatimes.com/"+matchfile+"_ballbyball"+inningFile+".xml";
	                  if(result['Matchdetail']['$']['matchtype']!='Test'){
	                    CommentryUrl = "http://toicri.timesofindia.indiatimes.com/"+matchfile+"_ballbyball.xml";
	                  }
	                  //console.log(CommentryUrl);
	                  request.get(CommentryUrl,function(err1, response1, body1){
	                  	Util.logRequestError(err1, response1);
	                    if (!err1 && response1.statusCode == 200) {
	                      parseString(body1, function (err2, result2) {
	                        if(err2){
	                        	RedisCache.get("loadMoreCommentary_"+matchfile+"_"+queryString,callback);
	                          //res.json([]);return;
	                        }
	                        //res.json(result2);
	                        //return;
	                        var innings = {};
	                        if(typeof(result2)!='undefined' && result2.hasOwnProperty("Match") && typeof(result2.Match)!=="undefined" && typeof(result2.Match.Innings) !=="undefined" && result2.Match.Innings.length){
	                          var j = result2.Match.Innings.length-1;
	                          for(var k=j;k>=0;k--){
	                            if(result2.Match.Innings[k].hasOwnProperty('Node')  && result2.Match.Innings[k].Node.length>0){
	                              j=k;
	                              break;
	                            }
	                          }
	                          

	                          var inningsData = {};
	                          inningsData['detail'] = result2.Match.Innings[j]['$'];
	                          if(result2.Match.Innings[j].hasOwnProperty('Node') && result2.Match.Innings[j].Node.length>0){

	                            inningsData['detail']['comm'] = [];
	                            result2.Match.Innings[j]['Node'] = _this.commentryAddSaperator(result2.Match.Innings[j]['Node']);

	                            var nodeIndex = 0;
	                            var node = null;
	                            if(typeof(commentId)!='undefined' && commentId!=""){
	                              node = result2.Match.Innings[j].Node.find((nd)=>{
	                                if(typeof(nd['$'])!='undefined'){
	                                  //console.log(nd['$'].Id, commentId);
	                                }
	                                
	                                if(typeof(nd['$'])!='undefined' && nd['$'].Id==commentId){
	                                  return nd;
	                                }
	                                nodeIndex++;
	                              });
	                            } else {
	                              nodeIndex = result2.Match.Innings[j].Node.length;
	                            }

	                            //res.json(nodeIndex);return;

	                            //res.json({'commentary':result2.Match.Innings[j]['Node']});
	                            //return;

	                            let nodeIndexStart = nodeIndex-25;
	                            if(nodeIndexStart<0){
	                              nodeIndexStart = 0;
	                            }
	                            var last12Commentry = result2.Match.Innings[j]['Node'].slice(nodeIndexStart, nodeIndex);
	                            //res.json(last12Commentry);return;
	                            for(var k=0;k<last12Commentry.length;k++){
	                              var tempData = {};
	                              if(last12Commentry[k].hasOwnProperty('totalrun')){
	                                inningsData['detail']['comm'].push(last12Commentry[k]);
	                                continue;
	                              }
	                              tempData['detail'] = last12Commentry[k]['$'];
	                              tempData['runs'] = last12Commentry[k]['Runs'][0];
	                              var overball = _this.getOverBallFromCommentary(last12Commentry[k]['Commentary'][0]);
	                              if(overball){
	                                tempData['overball'] = overball.overball;
	                                tempData['commentary'] = overball.commentary;
	                              } else {
	                                tempData['overball'] = false;
	                                tempData['commentary'] = last12Commentry[k]['Commentary'][0];
	                              }
	                              
	                              inningsData['detail']['comm'].push(tempData);
	                            }
	                            //inningsData['detail']['comm'] = commentryAddSaperator(inningsData['detail']['comm']);
	                            inningsData['detail']['comm'].reverse();
	                          }
	                          innings = inningsData;
	                        }
	                        //result['Matchdetail'] = Object.assign(result['Matchdetail'], );
	                        //res.json(result2);
	                        RedisCache.set("loadMoreCommentary_"+matchfile+"_"+queryString,{'commentary':innings});
	                        callback(false,{'commentary':innings});
	                      });
	                    } else {
	                    	RedisCache.get("loadMoreCommentary_"+matchfile+"_"+queryString,callback);
	                    }
	                  });
	                  
	                }
	              } catch(ex){
	                Util.sendEmail('7 http://toicri.timesofindia.indiatimes.com/'+matchfile+'.xml?'+queryString);
	                RedisCache.get("loadMoreCommentary_"+matchfile+"_"+queryString,callback);
	              }
	          });
	      } else {
	        Util.sendEmail('8 http://toicri.timesofindia.indiatimes.com/'+matchfile+'.xml?'+queryString);
	        RedisCache.get("loadMoreCommentary_"+matchfile+"_"+queryString,callback);
	      }
	  });		
	},

	getMatchPlayers:function(matchfile, queryArr, callback){
	  var queryString = queryArr.join("&");
		const _this = this;
		RedisCache.get("getMatchPlayers_"+matchfile, function(rerr, rres){
			if(!rerr && typeof(rres)!=='undefined') {
				//data available in redis, serve from redis
				callback(false, rres);
			} else {
				//data not available in redis, make a new call 
				request.get('http://toicri.timesofindia.indiatimes.com/'+matchfile+'players.xml?'+queryString, function(err, response, body) {
					Util.logRequestError(err, response);
						if (!err && response.statusCode == 200) {
								parseString(body, function (err, result) {
										if(err){
											RedisCache.get("getMatchPlayers_"+matchfile,callback);
										}
										try{
											var team = {};
											if(typeof(result)!='undefined' && typeof(result.Players)!='undefined'){
		
												for(var key of Object.keys(result.Players)){
													if(key=='TeamA' || key=='TeamB'){
														//continue;
													}
													let newKey = "team"+result.Players[key][0]['$']['Id'];
		
													team[newKey] = [];
		
													for(var subKey of Object.keys(result.Players[key][0])){
														if(subKey!='$'){  
															var tempObj = {id:result.Players[key][0][subKey][0]['$']['Id'],name:result.Players[key][0][subKey][0]['_']};
															team[newKey].push(tempObj)
														}
													}
												}
												RedisCache.set("getMatchPlayers_"+matchfile,team);	                  
												callback(false, team);
											} else {
												RedisCache.get("getMatchPlayers_"+matchfile,callback);
											}
										} catch(ex){
											Util.sendEmail('9 http://toicri.timesofindia.indiatimes.com/'+matchfile+'players.xml?'+queryString);
											RedisCache.get("getMatchPlayers_"+matchfile,callback);
										}
								});
						} else {
							Util.sendEmail('10 http://toicri.timesofindia.indiatimes.com/'+matchfile+'players.xml?'+queryString);
							RedisCache.get("getMatchPlayers_"+matchfile,callback);
						}
				});				
			}
		})
	},

	getIplPoints:function(queryArr, callback){
	  var queryString = queryArr.join("&");
		const _this = this;	
		request.get('http://toicri.timesofindia.indiatimes.com/stats/Standings/standings_2995.xml?'+queryString, function(err, response, body) {
		//request.get('http://card.cricket.timesofindia.indiatimes.com/cricketscorecard/stats/Standings/standings_2940.xml?'+queryString, function(err, response, body) {
	  	Util.logRequestError(err, response);
	      if (!err && response.statusCode == 200) {
	          parseString(body, function (err, result) {
	              //res.json(result);return;
	              if(err){
	              	RedisCache.get("getIplPoints_"+queryString,callback);
	                //res.json([]);
	              }
	              try{
	                var stage = [];
	                var team = [];
	                var temp = {};
	                var teamData = {};
	                var stageData = null;
	                if(typeof(result)!='undefined' && typeof(result.standings)!='undefined'){
	                  for(let obj of Object.keys(result.standings)){
	                    stageData = result.standings[obj];
	                    //console.log(stageData[0].team);
	                    if(stageData.length>0){
	                      teamData = {name:stageData[0]['$'].name,team:[]};
	                      if(stageData[0].hasOwnProperty('team') && stageData[0].team.length>0){
	                        for(let teamObj of stageData[0].team){
	                          teamData.team.push(teamObj['$']);
	                        }   
	                      }
	                      stage.push(teamData);   
	                    }
	                  }

	                  //if(typeof(result.standings.stage1)!='undefined' && result.standings.stage1.length>0 &&)
	                  RedisCache.set("getIplPoints_"+queryString,stage);
	                  callback(false,stage);
	                } else {
	                	RedisCache.get("getIplPoints_"+queryString,callback);
	                }
	              } catch(ex){
	                Util.sendEmail('11 http://card.cricket.timesofindia.indiatimes.com/cricketscorecard/stats/Standings/standings_2940.xml?'+queryString);
	                RedisCache.get("getIplPoints_"+queryString,callback);
	              }
	          });
	      } else {
	        Util.sendEmail('12 http://card.cricket.timesofindia.indiatimes.com/cricketscorecard/stats/Standings/standings_2940.xml?'+queryString);
	        RedisCache.get("getIplPoints_"+queryString,callback);
	      }
	  });	  	
	},

	getMatchShortDetail:function(queryArr, matchfile, callback){
			const _this = this;	
		RedisCache.get("getMatchShortDetail_"+matchfile,function(rerr, rres) {
			if(!rerr && typeof(rres)!=='undefined') {
				//data available in redis, serve from redis
				console.log("from redis");
				callback(false, rres);
			} else {
				console.log("from network");
				request.get({url:'http://toicri.timesofindia.indiatimes.com/calendar_new.xml',timeout:'20000'}, function(err, response, body) {
					Util.logRequestError(err, response);
						if (!err && response.statusCode == 200) {
								parseString(body, function (err, result) {
										if(err){
											RedisCache.get("getMatchShortDetail_"+matchfile,callback);
										}
										if(typeof(result)!='undefined' && typeof(result.calendar)!='undefined'){                  
												result = result['calendar']['match'];
												var match = {};
												var matchresponse = {'Matchdetail':{'$':{}}};
												for(let i=0;i<result.length;i++){
													if(result[i]['$']['matchfile']==matchfile){
														match = result[i]['$'];
														break;
													}
												}
												matchresponse['Matchdetail']['$']['Event'] = match['seriesname'];
												matchresponse['Matchdetail']['$']['Status'] = match['matchstatus'];
												matchresponse['Matchdetail']['$']['Status_Id'] = match['matchstatus_Id'];
												matchresponse['Matchdetail']['$']['Venue'] = match['venue'];
												matchresponse['Matchdetail']['$']['Tosswonby'] = (match['toss_won_by']==match['teama_Id']?match['teama']:match['teamb']);
												matchresponse['Matchdetail']['$']['MatchNo'] = match['matchnumber'];
												matchresponse['Matchdetail']['$']['MatchResult'] = match['matchresult'];
												matchresponse['Matchdetail']['$']['Filename'] = match['matchfile']+".xml";
												matchresponse['Matchdetail']['$']['Match_Id'] = match['match_Id'];
												matchresponse['Matchdetail']['$']['Series_Id'] = match['series_Id'];
												matchresponse['Matchdetail']['$']['equation'] = match['equation'];
												matchresponse['Matchdetail']['$']['matchdate'] = match['matchdate_ist'];
												matchresponse['Matchdetail']['$']['matchtype'] = match['matchtype'];
												matchresponse['Matchdetail']['$']['currentinning'] = 'First';
												matchresponse['Matchdetail']['$']['MatchResult'] = match['matchresult'];
												matchresponse['Matchdetail']['$']['LastUpdateddate'] = match['matchdate_ist'];
												matchresponse['Matchdetail']['$']['matchtime_ist'] = match['matchtime_ist'];
		
		
		
												matchresponse['Matchdetail']['FirstInnings'] = {'d':{}};
		
												matchresponse['Matchdetail']['FirstInnings']['d'] = {
																										'Battingteam':match['teama'],
																										'Bowlingteam':match['teamb'],
																										'Battingteam_Id':match['teama_Id'],
																										'Bowlingteam_Id':match['teamb_Id'],
																										 }
												RedisCache.set("getMatchShortDetail_"+matchfile,matchresponse);
												callback(false, matchresponse);
										}
										
								});
						}
				})
			}
		});



	},

	getMatchPlayersCron:function(matchfile, callback){
	  const _this = this;
	  request.get('http://toicri.timesofindia.indiatimes.com/'+matchfile+'players.xml', function(err, response, body) {
	      if (!err && response.statusCode == 200) {
	          parseString(body, function (err, result) {
	              try{
	                var team = {};
	                if(typeof(result)!='undefined' && typeof(result.Players)!='undefined'){

	                  for(var key of Object.keys(result.Players)){
	                    if(key=='TeamA' || key=='TeamB'){
	                      //continue;
	                    }
	                    let newKey = "team"+result.Players[key][0]['$']['Id'];

	                    team[newKey] = [];

	                    for(var subKey of Object.keys(result.Players[key][0])){
	                      if(subKey!='$'){  
	                        var tempObj = {id:result.Players[key][0][subKey][0]['$']['Id'],name:result.Players[key][0][subKey][0]['_']};
	                        team[newKey].push(tempObj)
	                      }
	                    }
	                  }
	                  callback(false, team);
	                } else {
										callback(true);
	                }
	              } catch(ex){
	                callback(true);
	              }
	          });
	      } else {
	        callback(true);
	      }
	  }); 	  
	},


	getMatchDetailCron:function(matchfile, callback){
		const _this = this;
		  request.get({url:'http://toicri.timesofindia.indiatimes.com/'+matchfile+'.xml',timeout:'20000'}, function(err, response, body) {
		  	  if (!err && response.statusCode == 200) {
		          parseString(body, function (err, result) {
		            if(err){
		              callback(true);
		            }            
		              try{
		                if(typeof(result)!='undefined'){

		                  if(result.hasOwnProperty("Matchdetail")){

		                    //if match is now playing(live), add batting and bowling team 
		                    if(result['Matchdetail']['$']['Status']=='Play in Progress' || result['Matchdetail']['$']['Status_Id']=='117' || result['Matchdetail']['$']['Status']=='Innings Break' || result['Matchdetail']['$']['Status_Id']=='110' ){
		                      var currentInning = result['Matchdetail']['$']['currentinning'];
		                      var teamA = "";
		                      var teamB = "";
		                      
		                      teamA = result['Matchdetail']['FirstInnings'][0]['$'].Battingteam;
		                      teamB = result['Matchdetail']['FirstInnings'][0]['$'].Bowlingteam;

		                      result['Matchdetail']['$']['teama'] = teamA;
		                      result['Matchdetail']['$']['teamb'] = teamB;                      
		                    }

		                    //Filter data (rename key to easy access in frontend)

		                    if(result['Matchdetail'].hasOwnProperty('FirstInnings') && result['Matchdetail']['FirstInnings'][0].hasOwnProperty('$')){
		                      result['Matchdetail']['FirstInnings'] = _this.normalizeCricketData(result,'FirstInnings','FI');
		                    } else {
		                      delete(result['Matchdetail']['FirstInnings'])
		                    }
		                    
		                    if(result['Matchdetail'].hasOwnProperty('SecondInnings')  && result['Matchdetail']['SecondInnings'][0].hasOwnProperty('$')){
		                      result['Matchdetail']['SecondInnings'] = _this.normalizeCricketData(result,'SecondInnings','SI');
		                    } else {
		                      delete(result['Matchdetail']['SecondInnings'])
		                    }
		                    if(result['Matchdetail'].hasOwnProperty('ThirdInnings')  && result['Matchdetail']['ThirdInnings'][0].hasOwnProperty('$')){
		                      result['Matchdetail']['ThirdInnings'] = _this.normalizeCricketData(result,'ThirdInnings','TI');
		                    } else {
		                      delete(result['Matchdetail']['ThirdInnings'])
		                    }                                       
		                    if(result['Matchdetail'].hasOwnProperty('FourthInnings') && result['Matchdetail']['FourthInnings'][0].hasOwnProperty('$')){
		                      result['Matchdetail']['FourthInnings'] = _this.normalizeCricketData(result,'FourthInnings','FOI');
		                    } else {
		                      delete(result['Matchdetail']['FourthInnings'])
		                    }                                     
		                    
		                    let currentInn = result['Matchdetail']['$']['currentinning'];
		                    let inningFile = "_1";
		                    if(currentInn=='Second'){
		                      inningFile = "_2";
		                    } else if(currentInn=='Third'){
		                      inningFile = "_3";
		                    } else if(currentInn=='Fourth'){
		                      inningFile = "_4";
		                    }


		                    //get Commentry
		                    var CommentryUrl = "http://toicri.timesofindia.indiatimes.com/"+matchfile+"_ballbyball"+inningFile+".xml";
		                    if(result['Matchdetail']['$']['matchtype']!='Test'){
		                      CommentryUrl = "http://toicri.timesofindia.indiatimes.com/"+matchfile+"_ballbyball.xml";
		                    }
		                    //console.log(CommentryUrl);
		                    request.get({url:CommentryUrl,timeout:'20000'},function(err1, response1, body1){
		                    	Util.logRequestError(err1, response1);
		                      if (!err1 && response1.statusCode == 200) {
		                        parseString(body1, function (err2, result2) {
		                          
		                          var innings = {};
		                          if(typeof(result2)!='undefined' && result2.hasOwnProperty("Match") && result2.Match.hasOwnProperty('Innings')){
		                            var j = result2.Match.Innings.length-1;
		                            for(var k=j;k>=0;k--){
		                              if(result2.Match.Innings[k].hasOwnProperty('Node')  && result2.Match.Innings[k].Node.length>0){
		                                j=k;
		                                break;
		                              }
		                            }

		                            var inningsData = {};
		                            inningsData['detail'] = result2.Match.Innings[j]['$'];
		                            if(result2.Match.Innings[j].hasOwnProperty('Node') && result2.Match.Innings[j].Node.length>0){
		                              inningsData['detail']['comm'] = [];
		                              result2.Match.Innings[j]['Node'] = _this.commentryAddSaperator(result2.Match.Innings[j]['Node']);

		                              var last12Commentry = result2.Match.Innings[j]['Node'].slice(-25);
		                              for(var k=0;k<last12Commentry.length;k++){
		                                var tempData = {};
		                                if(last12Commentry[k].hasOwnProperty('totalrun')){
		                                  inningsData['detail']['comm'].push(last12Commentry[k]);
		                                  continue;
		                                }

		                                tempData['detail'] = last12Commentry[k]['$'];
		                                tempData['runs'] = last12Commentry[k]['Runs'][0];
		                                var overball = _this.getOverBallFromCommentary(last12Commentry[k]['Commentary'][0]);
		                                if(overball){
		                                  tempData['overball'] = overball.overball;
		                                  tempData['commentary'] = overball.commentary;
		                                } else {
		                                  tempData['overball'] = false;
		                                  tempData['commentary'] = last12Commentry[k]['Commentary'][0];
		                                }

		                                //tempData['commentary'] = last12Commentry[k]['Commentary'][0];
		                                inningsData['detail']['comm'].push(tempData);
		                              }

		                              inningsData['detail']['comm'] = _this.commentryAddSaperator(inningsData['detail']['comm']);


		                              inningsData['detail']['comm'].reverse();
		                            }
		                            innings = inningsData;
		                            var overDetail = _this.getOverDetail(inningsData['detail']['comm']);
		                            if(typeof(overDetail)!='undefined' && overDetail.length>0){
		                              result['Matchdetail']['$']['OverDetail'] = overDetail.join(",");
		                            }
		                            
		                          }
		    
		                          result['Matchdetail'] = Object.assign(result['Matchdetail'], {'commentary':innings});
		                          callback(false, result);
		                        });
		                      } else {
		                      	callback(false, result);
		                      }
		                    });
		                  }

		                  
		                }
		              } catch(ex){
										callback(true);
		              }
		          });
		      } else {
		        callback(true);
		      }
		  });		
	},	

}