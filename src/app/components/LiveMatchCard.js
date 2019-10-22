import React, { useEffect,useState } from 'react';
import { Link as RLink } from 'react-router-dom'
import config from '../../config';
import {replaceTeamName, matchScore, getShortTeamName, matchDateTimeStamp, getMatchOver} from '../../utils/cricketutil';
import ReactLink from '../../utils/Link';
const Link = ReactLink(RLink);
import fetch from '../data/utils/fetch';

const LiveMatchCard = ( props ) => {
  const [live, setData] = useState(null);
  let interval = null;
  useEffect(()=>{
    refreshScore();
    interval = window.setInterval(()=>{
      refreshScore();
    },60000);
    return ()=>{
      clearInterval(interval);
    }
  },[]);

  const refreshScore = () => {
    let t = Date.now();
    fetch(`${config.API_URL}/gethpcricwidget?lang=english&r=${t}`).then((d)=>{
      setData(d);
    });
  }

  if(typeof(live)=='undefined' || !live || !live.hasOwnProperty('teama')){
    return null;
  } else {
    
    let url = live.url;
    let matchString = "";
    let tossWonTeamName = "";
    if(live.toss_won_by==live.teama_Id){
      tossWonTeamName = live.teama;
    } else if(live.toss_won_by==live.teamb_Id){
      tossWonTeamName = live.teamb;
    }

    if(tossWonTeamName!=""){
      matchString = getShortTeamName(tossWonTeamName)+" won the toss & elected to "+live.toss_elected_to;
    } else {
      matchString = live.tourname;
    }

    let CustomTag = Link;

    let matchTime = matchDateTimeStamp(live.matchdate_ist, live.matchtime_ist);
    let currentTime = new Date().getTime();
    if(matchTime>currentTime || live.matchstatus_Id=='114'){
      //return null;
    }

    return(
      <div className="hpcricket_cont ">
               <CustomTag to={url} className="ccard">

               <div className="dflex w100  scont">
                  <div className="scorecard">
                    <table className="w100">
                      <tbody>
                      <tr>
                        <td className="team">
                        <img alt="" className="flag" src={"/photos/flags/"+live.teama_Id+".svg"} onError={(e)=>{e.target.onerror = null; e.target.src="/photos/flags/default.svg"}}/>
                          <div className={(live['current_batting_team']==live.teama_Id && live['matchstatus']!='Match Ended')?"teamname active":"teamname"}>
                            {getShortTeamName(live.teama_short)}
                            {live.teama_Id==live.toss_won_by?<div className="wontoss"></div>:null}
                          </div>
                        </td>
                        <td>
                          <div className={(live['current_batting_team']==live.teama_Id && live['matchstatus']!='Match Ended')?"score active":"score"}>
                            {live.teama_Id==live.inn_team_1 && live.inn_score_1?<div>{matchScore(live.inn_score_1, 'Test')} <span>{getMatchOver(live.inn_score_1)}</span></div>:null}
                            {live.teama_Id==live.inn_team_2 && live.inn_score_2?<div>{matchScore(live.inn_score_2, 'Test')}  <span>{getMatchOver(live.inn_score_2)}</span></div>:null}
                            {live.teama_Id==live.inn_team_3 && live.inn_score_3?<div className={live['current_batting_team']==live.teama_Id && live.matchstatus!='Match Ended' && live.matchtype=='Test'?"active":""}><span className="blackcolor"> & </span>{matchScore(live.inn_score_3, live.matchtype)} <span>{getMatchOver(live.inn_score_3)}</span></div>:null}
                            {live.teama_Id==live.inn_team_4 && live.inn_score_4?<div className={live['current_batting_team']==live.teama_Id && live.matchstatus!='Match Ended' && live.matchtype=='Test'?"active":""}><span className="blackcolor"> & </span>{matchScore(live.inn_score_4, live.matchtype)}<span>{getMatchOver(live.inn_score_4)}</span></div>:null}
                          </div>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="scorecard">
                    <table className="w100">  
                      <tbody>
                      <tr>
                        <td>
                          <div className={live['current_batting_team']==live.teamb_Id && live.matchstatus!='Match Ended'?"active1 score":"score"}>
                            {live.teamb_Id==live.inn_team_1?<div>{matchScore(live.inn_score_1,'Test')}<span>{getMatchOver(live.inn_score_1)}</span></div>:null}
                            {live.teamb_Id==live.inn_team_2?<div>{matchScore(live.inn_score_2,'Test')}<span>{getMatchOver(live.inn_score_2)}</span></div>:null}
                            {live.teamb_Id==live.inn_team_3?<div>{" & "+matchScore(live.inn_score_3,'Test')}<span>{getMatchOver(live.inn_score_3)}</span></div>:null}
                            {live.teamb_Id==live.inn_team_4?<div>{" & "+matchScore(live.inn_score_4,'Test')}<span>{getMatchOver(live.inn_score_4)}</span></div>:null}

                          </div>
                        </td>
                        <td className="team">
                          <img alt="" className="flag" src={"/photos/flags/"+live.teamb_Id+".svg"} onError={(e)=>{e.target.onerror = null; e.target.src="/photos/flags/default.svg"}}/>
                          <div className={(live['current_batting_team']==live.teamb_Id && live['matchstatus']!='Match Ended')?"teamname active":"teamname"}>
                            
                            {live.teamb_Id==live.toss_won_by?<div className="wontoss"></div>:null}
                            {getShortTeamName(live.teamb)}
                            
                          </div>
                        </td>
                      </tr>
                      </tbody>
                    </table>


                  </div>

                  </div>
                  <div>

                  <div className="match-summary">
                    {live.hasOwnProperty("equation") && live.equation!="" && live.matchstatus!='Match Ended'?replaceTeamName(live.equation, live.teama_short, live.teama_short, live.teamb, live.teamb_short):null}
                    {live.hasOwnProperty("matchresult") && live.matchstatus=='Match Ended'?replaceTeamName(live.matchresult, live.teama_short, live.teama_short, live.teamb, live.teamb_short):null}
                  </div>  

                  {live.matchstatus!='Match Ended'?
                    <div className="match-summary" style={{marginTop:'5px'}}>{typeof(live.matchstatus)!='undefined' && live.matchstatus!=""?<span className=""> {replaceTeamName(live.matchstatus, live.teama_short, live.teama_short, live.teamb, live.teamb_short)}</span>:null}</div>
                    :null
                  }

                  {live.matchstatus=='' && live.livecoverage=='no'?
                    <div className="series-title superover matchStatusPos" style={{marginTop:'5px'}}>Summary score not available</div>
                    :null
                  }

                </div>
               </CustomTag>
      </div>
    ) 
  }
}

export default LiveMatchCard;