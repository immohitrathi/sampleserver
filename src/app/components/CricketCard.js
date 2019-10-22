import React from 'react';
import { Link as RLink } from 'react-router-dom';
import {getShortTeamName, matchDateFormat, matchScore, replaceTeamName, getMatchOver, cricketUrl} from "../../utils/cricketutil";
import {gaEvent} from "../../utils/util";
import ReactLink from '../../utils/Link';
const Link = ReactLink(RLink);

const CricketCard = ({item, currentTab, language, hideType}) => {
    let league = item['$'].league;
    
    let url = cricketUrl(item, language);
    url = url.replace("live-score-","live-scorecard-");
    let CustomDiv = currentTab=='upcoming'?`div`:Link;


    const fireGAEvent = () => {
      gaEvent("Cricket","ScoreCardTap",item['$'].teama_short+" "+item['$'].teamb_short+" "+item['$'].series_short_display_name);
      gaEvent("ItemTap","cricket-scorecard",language);
    }

    return (
    <CustomDiv to={url} className={"ccard mt15 "+item['$'].teama_short+" "+item['$'].teamb_short+" "+currentTab+" "+league} data-title={item['$'].matchdate_ist+"_"+item['$'].teama+"_"+item['$'].teamb} onClick={fireGAEvent}>
        <div className="margin-bottom-6px overhidden">
          {item['$'].live=='1' && item['$'].matchstatus!='Match Ended'?<span className="live pright">LIVE</span>:null}

          {/* item['$'].matchstatus=='Match Ended' && item['$'].winningteam_Id!=""?
            <span className="nolive pright">{item['$'].winningteam_Id==item['$'].teama_Id?item['$'].teama_short:item['$'].teamb_short} WON</span>
            :null
           */}

          {/* item['$'].matchstatus=='Match Ended' && item['$'].winningteam_Id==""?
            <span className="nolive pright">Match Tied</span>
            :null
           */}
          {/* item['$'].matchstatus=='Match Abandoned' && item['$'].winningteam_Id==""?
            <span className="nolive pright">Match Abandoned</span>
            :null
           */}

          

          {currentTab=='upcoming'?
            <>
            <span className="liveblue matchdate pright">{matchDateFormat(item['$'].matchdate_ist, item['$'].matchtime_gmt,'dS mmm')}</span> 
            <span className="series">{!hideType?<i>{item['$'].series_short_display_name} - {item['$'].matchnumber} </i>:null}</span>
            </>
            :
            <span className="series">{item['$'].series_short_display_name} - {item['$'].matchnumber} </span>
           }

          
          
          {<div className="series type"> {item['$'].matchtype}</div>}

        </div>
        

        {currentTab=='nowshowing'?
          <>
          <div className="dflex w100  scont">
            <div className="scorecard">
              <table className="w100">
                <tbody>
                <tr>
                  <td className="team">
                    <img className="flag" src={"/photos/flags/"+(item['$'].teama_Id!=""?item['$'].teama_Id:"default")+".svg"} alt="" onError={(e)=>{e.target.onerror = null; e.target.src="/photos/flags/default.svg"}} />
                    <div className={(item['$']['current_batting_team']==item['$'].teama_Id && item['$']['matchstatus']!='Match Ended')?"teamname active":"teamname"}>
                      {getShortTeamName(item['$'].teama)}
                      {item['$'].teama_Id==item['$'].toss_won_by?<div className="wontoss"></div>:null}
                    </div>
                  </td>
                  <td>
                    <div className={(item['$']['current_batting_team']==item['$'].teama_Id && item['$']['matchstatus']!='Match Ended')?"score active left":"score left"}>
                      {item['$'].teama_Id==item['$'].inn_team_1 && item['$'].inn_score_1?<div>{matchScore(item['$'].inn_score_1, 'Test')} <span>{getMatchOver(item['$'].inn_score_1)}</span></div>:null}
                      {item['$'].teama_Id==item['$'].inn_team_2 && item['$'].inn_score_2?<div>{matchScore(item['$'].inn_score_2, 'Test')}  <span>{getMatchOver(item['$'].inn_score_2)}</span></div>:null}
                      {item['$'].teama_Id==item['$'].inn_team_3 && item['$'].inn_score_3?<div className={item['$']['current_batting_team']==item['$'].teama_Id && item['$'].matchstatus!='Match Ended' && item['$'].matchtype=='Test'?"active":""}><span className="blackcolor"> & </span>{matchScore(item['$'].inn_score_3, item['$'].matchtype)} <span>{getMatchOver(item['$'].inn_score_3)}</span></div>:null}
                      {item['$'].teama_Id==item['$'].inn_team_4 && item['$'].inn_score_4?<div className={item['$']['current_batting_team']==item['$'].teama_Id && item['$'].matchstatus!='Match Ended' && item['$'].matchtype=='Test'?"active":""}><span className="blackcolor"> & </span>{matchScore(item['$'].inn_score_4, item['$'].matchtype)}<span>{getMatchOver(item['$'].inn_score_4)}</span></div>:null}
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
                    <div className={item['$']['current_batting_team']==item['$'].teamb_Id && item['$'].matchstatus!='Match Ended'?"active1 score right":"score right"}>
                      {item['$'].teamb_Id==item['$'].inn_team_1 && item['$'].inn_score_1?<div>{matchScore(item['$'].inn_score_1, 'Test')} <span>{getMatchOver(item['$'].inn_score_1)}</span></div>:null}
                      {item['$'].teamb_Id==item['$'].inn_team_2 && item['$'].inn_score_2?<div>{matchScore(item['$'].inn_score_2, 'Test')} <span>{getMatchOver(item['$'].inn_score_2)}</span></div>:null}
                      {item['$'].teamb_Id==item['$'].inn_team_3 && item['$'].inn_score_3?<div className={item['$']['current_batting_team']==item['$'].teamb_Id && item['$'].matchstatus!='Match Ended' && item['$'].matchtype=='Test'?"active":""}><span className="blackcolor"> & </span>{matchScore(item['$'].inn_score_3, 'Test')} <span>{getMatchOver(item['$'].inn_score_3)}</span></div>:null}
                      {item['$'].teamb_Id==item['$'].inn_team_4 && item['$'].inn_score_4?<div className={item['$']['current_batting_team']==item['$'].teamb_Id && item['$'].matchstatus!='Match Ended' && item['$'].matchtype=='Test'?"active":""}><span className="blackcolor"> & </span>{matchScore(item['$'].inn_score_4, 'Test')} <span>{getMatchOver(item['$'].inn_score_4)}</span></div>:null}              
                    </div>
                  </td>
                  <td className="team">
                    <img className="flag" src={"/photos/flags/"+(item['$'].teamb_Id!=""?item['$'].teamb_Id:'default')+".svg"} alt=""  onError={(e)=>{e.target.onerror = null; e.target.src="/photos/flags/default.svg"}} />
                    <div className={(item['$']['current_batting_team']==item['$'].teamb_Id && item['$']['matchstatus']!='Match Ended')?"teamname active":"teamname"}>
                      
                      {item['$'].teamb_Id==item['$'].toss_won_by?<div className="wontoss"></div>:null}
                      {getShortTeamName(item['$'].teamb)}
                      
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>


            </div>

            </div>
            <div>
            {/* item['$']['inn_score_2']=='' && item['$']['toss_won_by']!="" && item['$'].matchstatus!='Match Ended'?
              <div className="match-summary">
                {item['$']['toss_won_by']==item['$']['teama_Id']?item['$']['teama_short']:item['$']['teamb_short']} won the toss, and elected to {item['$']['toss_elected_to']}
              </div>
              :null
              */}

            <div className="match-summary">
              {item['$'].hasOwnProperty("equation") && item['$'].equation!="" && item['$'].matchstatus!='Match Ended'?replaceTeamName(item['$'].equation, item['$'].teama, item['$'].teama_short, item['$'].teamb, item['$'].teamb_short):null}
              {item['$'].hasOwnProperty("matchresult") && item['$'].matchstatus=='Match Ended' && item['$'].matchstatus!='Match Abandoned'?replaceTeamName(item['$'].matchresult, item['$'].teama, item['$'].teama_short, item['$'].teamb, item['$'].teamb_short):null}
            </div>  

            {item['$'].matchstatus!='Match Ended' && item['$'].matchstatus!=''?
              <div className="match-summary" style={{marginTop:'5px'}}>{typeof(item['$'].matchstatus)!='undefined' && item['$'].matchstatus!=""?<span className=""> {replaceTeamName(item['$'].matchstatus, item['$'].teama, item['$'].teama_short, item['$'].teamb, item['$'].teamb_short)}</span>:null}</div>
              :null
            }

            {item['$'].matchstatus=='' && item['$'].livecoverage=='no'?
              <div className="series-title superover matchStatusPos match-summary" style={{marginTop:'5px'}}>Summary score not available</div>
              :null
            }

          </div>
          
          </>
          :
          <table className="upcoming-tabs-table w100">
            <tbody>
            <tr>
              <td width="20">
                <img width="20" alt="" className="flag" src={"/photos/flags/"+(item['$'].teama_Id!=""?item['$'].teama_Id:"default")+".svg"}  onError={(e)=>{e.target.onerror = null; e.target.src="/photos/flags/default.svg"}} />
              </td>
              <td  width="50">
                {getShortTeamName(item['$'].teama)}
              </td>
              <td className="vs">
                {matchDateFormat(item['$'].matchdate_ist, item['$'].matchtime_ist,'HH:MM', true)}
              </td>
              
              <td  width="50">
                  {getShortTeamName(item['$'].teamb)}
              </td>
              <td  width="20">
              <img width="20" alt="" className="flag" src={"/photos/flags/"+(item['$'].teamb_Id!=""?item['$'].teamb_Id:"default")+".svg"} onError={(e)=>{e.target.onerror = null; e.target.src="/photos/flags/default.svg"}} />
              </td>
            </tr>

            {
              !hideType?
              <tr>
                <td colSpan="5">
                  <div className="venue">{hideType?item['$'].venue.substring(0,20)+"...":item['$'].venue}</div>
                </td>
              </tr>
              :null
            }
            </tbody>
          </table>

        }
        
      </CustomDiv>        
    )
}

export default CricketCard;