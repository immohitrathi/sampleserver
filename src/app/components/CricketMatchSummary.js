import React, { memo } from 'react'
import {replaceTeamName, getShortTeamName} from '../../utils/cricketutil';
import { hasValue } from "../../utils/util";

const CricketMatchSummary = memo(({match, hideCountry, updateCricketDetail})=>{
  let teama = match['Matchdetail']['FirstInnings']['d']['Battingteam'];
  let teamb = match['Matchdetail']['FirstInnings']['d']['Bowlingteam'];
  let teamaId = match['Matchdetail']['FirstInnings']['d']['Battingteam_Id'];
  let teambId = match['Matchdetail']['FirstInnings']['d']['Bowlingteam_Id'];  

  let isLive =  match['Matchdetail']['$']['Status']=='Match Ended'?false:true;
  return (
    <div className="wcard">
      <div className="dflex">
        {match['Matchdetail']['$']['Status']=='Match Ended'?
          <>
            {
              hasValue(match['Matchdetail']['$']['Winningteam_Id'])?
                <div className="nolive">
                  {match['Matchdetail']['$']['Winningteam_Id']==teamaId?
                    getShortTeamName(teama)+" WON"
                    :
                    getShortTeamName(teamb)+" WON"
                  }
                </div>
                :
                <div className="nolive">{match['Matchdetail']['$']['Status']}</div>
            }
          </>
          :
          <div className="live">LIVE</div>
        }
        <div className="text-right fs12 grey">{match['Matchdetail']['$']['matchtype']}</div>
      </div>

      {match['Matchdetail']['$']['Status']!='Match Ended'?<div className="series-title mt10"><span>{match['Matchdetail']['$']['Status']}</span></div>:null}
      {match['Matchdetail']['$']['Status']!='Match Ended' && match['Matchdetail']['$']['matchtype']=='Test'?<div className={`series-title mt10 ${isLive?'licon':'cicon'}`}><span>Day: {match['Matchdetail']['$']['Matchday']}, Session: {match['Matchdetail']['$']['Session']}</span></div>:null}
      
      {match['Matchdetail']['$']['Status']=='Match Ended'?<div className={`series-title mt10 ${isLive?'licon':'cicon'}`}>{replaceTeamName(match['Matchdetail']['$']['MatchResult'], match['Matchdetail']['$']['Hometeam'],getShortTeamName(match['Matchdetail']['$']['Hometeam']), match['Matchdetail']['$']['Awayteam'],getShortTeamName(match['Matchdetail']['$']['Awayteam']))}</div>:null}

      {match['Matchdetail']['$']['Status']!='Match Ended' && match['Matchdetail']['$']['equation']!=""?<div className={`series-title mt10 ${isLive?'licon':'cicon'}`}>{replaceTeamName(match['Matchdetail']['$']['equation'], match['Matchdetail']['$']['Hometeam'],getShortTeamName(match['Matchdetail']['$']['Hometeam']), match['Matchdetail']['$']['Awayteam'],getShortTeamName(match['Matchdetail']['$']['Awayteam']))}</div>:null}

      {match['Matchdetail']['$']['Status']!='Match Ended' && match['Matchdetail']['$']['currentinning']=="First"  && typeof(match['Matchdetail']['$']['Folder'])!='undefined'?
        <div className={`series-title mt10 ${isLive?'licon':'cicon'}`}>{match['Matchdetail']['FirstInnings']['d']['Battingteam_Id']==match['Matchdetail']['$']['Tosswonby_Id']?replaceTeamName(match['Matchdetail']['FirstInnings']['d']['Battingteam'], match['Matchdetail']['$']['Hometeam'],getShortTeamName(match['Matchdetail']['$']['Hometeam']), match['Matchdetail']['$']['Awayteam'],getShortTeamName(match['Matchdetail']['$']['Awayteam'])):replaceTeamName(match['Matchdetail']['FirstInnings']['d']['Bowlingteam'], match['Matchdetail']['$']['Hometeam'],getShortTeamName(match['Matchdetail']['$']['Hometeam']), match['Matchdetail']['$']['Awayteam'],getShortTeamName(match['Matchdetail']['$']['Awayteam']))} won the toss and elected to {match['Matchdetail']['FirstInnings']['d']['Battingteam_Id']==match['Matchdetail']['$']['Tosswonby_Id']?'bat':'field'}</div>
        :null
      }

      
      {match['Matchdetail']['$']['Status']=='Match Ended' && match['Matchdetail']['$']['ManoftheMatch']!=""?<div className={`series-title mt10 ${isLive?'licon':'cicon'}`}>Man of the Match - {match['Matchdetail']['$']['ManoftheMatch']}</div>:null}

      {typeof(match['Matchdetail']['$']['isso'])!='undefined' && match['Matchdetail']['$']['isso']=="yes"?<div className={`series-title mt10 ${isLive?'licon':'cicon'}`}>Scores are Equal... It will be a <span>SUPEROVER</span></div>:null}


      {match['Matchdetail']['$']['Status']!='Match Ended'?<div className="cricket-refresh" onClick={updateCricketDetail}></div>:null}

      <div className="margin-bottom-10px"></div>

      {!hideCountry?
        <div className="cscorecard mt15">

          <div className="teamname">
            <img alt="" className="flag" src={"/photos/flags/"+teamaId+".svg"} onError={(e)=>{e.target.onerror = null; e.target.src="/photos/flags/default.svg"}} />
            <div className={"teamname1 "+(match['Matchdetail'][match['Matchdetail']['$']['currentinning']+'Innings'].d.Battingteam==teama && match['Matchdetail']['$']['Status']!='Match Ended' && typeof(match['Matchdetail']['$']['Folder'])!='undefined'?'active':'')}>{getShortTeamName(teama)}
              {teamaId==match['Matchdetail']['$']['Tosswonby_Id']?<div className="wontoss"></div>:null}
            </div>
          </div>
          <div className={"score "+(match['Matchdetail'][match['Matchdetail']['$']['currentinning']+'Innings'].d.Battingteam==teama?'active':'')}>
            {typeof(match['Matchdetail']['FirstInnings']['Equation'])!='undefined'  && match['Matchdetail'].hasOwnProperty('FirstInnings') && match['Matchdetail']['FirstInnings']['d']['Battingteam_Id']==teamaId?
              <><span className="run">{match['Matchdetail']['FirstInnings']['Equation']['Total']}-
                {match['Matchdetail']['FirstInnings']['Equation']['Wickets']}</span> 
                <div className="small">{match['Matchdetail']['$']['matchtype']!='Test'?(match['Matchdetail']['FirstInnings']['Equation']['Overs']+"/"+match['Matchdetail']['FirstInnings']['d']['AllottedOvers']+" Ovrs"):null}
                </div>
              </>
              :null
            }
            {typeof(match['Matchdetail']['SecondInnings'])!='undefined' && match['Matchdetail'].hasOwnProperty('SecondInnings') && match['Matchdetail']['SecondInnings']['d']['Battingteam_Id']==teamaId?
              <><span className="run">{match['Matchdetail']['SecondInnings']['Equation']['Total']}-{match['Matchdetail']['SecondInnings']['Equation']['Wickets']}</span> 
                <div className="small">{match['Matchdetail']['$']['matchtype']!='Test'?(match['Matchdetail']['SecondInnings']['Equation']['Overs']+"/"+match['Matchdetail']['SecondInnings']['d']['AllottedOvers']+" Ovrs"):null}</div></>
              :null
            }
            {typeof(match['Matchdetail']['ThirdInnings'])!='undefined' && match['Matchdetail'].hasOwnProperty('ThirdInnings') && match['Matchdetail']['ThirdInnings']['d']['Battingteam_Id']==teamaId?
              <><span className={match['Matchdetail'][match['Matchdetail']['$']['currentinning']+'Innings'].d.Battingteam_Id==teamaId && match['Matchdetail']['$']['Status']!='Match Ended'  && match['Matchdetail']['$']['matchtype']=='Test'?'run active':'run'}> <span className="blackcolor"> & </span> {match['Matchdetail']['ThirdInnings']['Equation']['Total']}-{match['Matchdetail']['ThirdInnings']['Equation']['Wickets']}</span> 
                <div className="small">{match['Matchdetail']['$']['matchtype']!='Test'?("("+match['Matchdetail']['ThirdInnings']['Equation']['Overs']+"/"+match['Matchdetail']['ThirdInnings']['d']['AllottedOvers']+" Ovrs"):null}</div></>
              :null
            }
            {typeof(match['Matchdetail']['FourthInnings'])!='undefined' && match['Matchdetail'].hasOwnProperty('FourthInnings') && match['Matchdetail']['FourthInnings']['d']['Battingteam_Id']==teamaId?
              <><span className={match['Matchdetail'][match['Matchdetail']['$']['currentinning']+'Innings'].d.Battingteam_Id==teamaId && match['Matchdetail']['$']['Status']!='Match Ended'  && match['Matchdetail']['$']['matchtype']=='Test'?'run active':'run'}> <span className="blackcolor"> & </span> {match['Matchdetail']['FourthInnings']['Equation']['Total']}-{match['Matchdetail']['FourthInnings']['Equation']['Wickets']} </span>
              <div className="small">{match['Matchdetail']['$']['matchtype']!='Test'?(match['Matchdetail']['FourthInnings']['Equation']['Overs']+"/"+match['Matchdetail']['FourthInnings']['d']['AllottedOvers']+" Ovrs"):null}</div></>
              :null
            }
          </div>
          
          <div className="teamname" style={{width:'80px'}}>&nbsp;</div>

          <div className={"score "+(match['Matchdetail'][match['Matchdetail']['$']['currentinning']+'Innings'].d.Battingteam==teamb && match['Matchdetail']['$']['Status']!='Match Ended'?'active1':'')}>
            {match['Matchdetail'].hasOwnProperty('FirstInnings') && match['Matchdetail']['FirstInnings']['d']['Battingteam_Id']==teambId?
              <>
                <span className="run">{match['Matchdetail']['FirstInnings']['Equation']['Total']}-{match['Matchdetail']['FirstInnings']['Equation']['Wickets']}</span> 
                <div className="small">{match['Matchdetail']['$']['matchtype']!='Test'?(match['Matchdetail']['FirstInnings']['Equation']['Overs']+"/"+match['Matchdetail']['FirstInnings']['d']['AllottedOvers']+" Ovrs"):null}</div>
              </>
              :null
            }
            {match['Matchdetail'].hasOwnProperty('SecondInnings') && match['Matchdetail']['SecondInnings']['d']['Battingteam_Id']==teambId?
              <>
                <span className="run">{match['Matchdetail']['SecondInnings']['Equation']['Total']}-{match['Matchdetail']['SecondInnings']['Equation']['Wickets']}</span> 
                <div className="small">{match['Matchdetail']['$']['matchtype']!='Test'?(match['Matchdetail']['SecondInnings']['Equation']['Overs']+"/"+match['Matchdetail']['SecondInnings']['d']['AllottedOvers']+" Ovrs"):null}</div>
              </>
              :null
            }
            {match['Matchdetail'].hasOwnProperty('ThirdInnings') && match['Matchdetail']['ThirdInnings']['d']['Battingteam_Id']==teambId?
              <>
                <span className={match['Matchdetail'][match['Matchdetail']['$']['currentinning']+'Innings'].d.Battingteam_Id==teambId && match['Matchdetail']['$']['Status']!='Match Ended'  && match['Matchdetail']['$']['matchtype']=='Test'?'run active1':'run'}><span className="blackcolor"> & </span> </span>
                <div className="small">{match['Matchdetail']['ThirdInnings']['Equation']['Total']}/{match['Matchdetail']['ThirdInnings']['Equation']['Wickets']} {match['Matchdetail']['$']['matchtype']!='Test'?("("+match['Matchdetail']['ThirdInnings']['Equation']['Overs']+"/"+match['Matchdetail']['ThirdInnings']['d']['AllottedOvers']+" Ovrs"):null}</div>
              </>
              :null
            }
            {match['Matchdetail'].hasOwnProperty('FourthInnings') && match['Matchdetail']['FourthInnings']['d']['Battingteam_Id']==teambId?
              <>
                <span className={match['Matchdetail'][match['Matchdetail']['$']['currentinning']+'Innings'].d.Battingteam_Id==teambId && match['Matchdetail']['$']['Status']!='Match Ended'  && match['Matchdetail']['$']['matchtype']=='Test'?'run active1':'run'}> <span className="blackcolor"> & </span></span>
                <div> {match['Matchdetail']['FourthInnings']['Equation']['Total']}/{match['Matchdetail']['FourthInnings']['Equation']['Wickets']} {match['Matchdetail']['$']['matchtype']!='Test'?("("+match['Matchdetail']['FourthInnings']['Equation']['Overs']+"/"+match['Matchdetail']['FourthInnings']['d']['AllottedOvers']+" Ovrs"):null}</div>              
              </>
              :null
            }
          </div>
          <div className="teamname">
            <img alt="" className="flag" src={"/photos/flags/"+teambId+".svg"}  onError={(e)=>{e.target.onerror = null; e.target.src="/photos/flags/default.svg"}}  />
            <div className={"teamname1 "+(match['Matchdetail'][match['Matchdetail']['$']['currentinning']+'Innings'].d.Battingteam==teamb && match['Matchdetail']['$']['Status']!='Match Ended' && typeof(match['Matchdetail']['$']['Folder'])!='undefined'?'active':'')}>
              {teambId==match['Matchdetail']['$']['Tosswonby_Id']?<div className="wontoss"></div>:null} 
              {getShortTeamName(teamb)}
            </div>
          </div>

        </div>
        :null          
      }

      <div className="other mt15">
        {match['Matchdetail']['$']['Event']} <span>|</span> 
        {match['Matchdetail']['$']['MatchNo']} <span>|</span> 
        {match['Matchdetail']['$']['matchdate']} 
        <br/>
        {match['Matchdetail']['$']['Venue']}
        
      </div>

    </div>
  )
});
export default CricketMatchSummary;