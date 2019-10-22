import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {Link as RLink} from 'react-router-dom';
import NewsListCardLoading from '../components/NewsListCardLoading';
import CricketAppTabs from '../components/CricketAppTabs';
import CricketMatchSummary from '../components/CricketMatchSummary';
import CricketScore from '../components/CricketScore';
import { hasValue, updateHeader, scrollToTop, gaEvent} from "../../utils/util";
import { getShortTeamName, matchDateFormat, getNbLbClass } from "../../utils/cricketutil";
import { fetchCricketDetail, fetchCricketShortDetail, fetchCricketPlayers } from "../data/ducks/cricket/actions";
import NoMatch  from "../components/NoMatch";
import "../data/ducks/cricket/reducers";
import ReactLink from '../../utils/Link';
const Link = ReactLink(RLink);

const CricketScoreCard = (props)=> {
  const { match, location } = props;
  const [update, forceUpdate] = useState(false);
  const languages = match.params.lang;
  const {matchd, errorDetail} = props;
  let interval = null;
  useEffect(()=>{
    scrollToTop(0);
    updateHeader("3",'MATCH DETAILS', true);
    updateCricketDetail();
    interval = window.setInterval(()=>{
      if(document.querySelector(".cricket-refresh")) {
        document.querySelector(".cricket-refresh").click();
      }
    },10000);    
    return ()=>{
      clearInterval(interval);
    }
  },[]);

  const updateCricketDetail = () => {
    if(document.querySelector(".cricket-refresh")){
      document.querySelector(".cricket-refresh").classList.add("anim");
      window.setTimeout(()=>{
        document.querySelector(".cricket-refresh").classList.remove("anim");
      },2000);
    }
    forceUpdate(!update);
    if(!hasValue(matchd['Matchdetail']) || matchd['matchfile']!=match.params.matchfile){
      props.fetchCricketDetail({match});
      props.fetchCricketShortDetail({match});
      props.fetchCricketPlayers({match});
    }
  }  

  const changeTab = (event) => {
    let selectedTab = event.currentTarget.getAttribute("data-team");
    document.querySelector(".teamtab.active").classList.remove("active");
    document.querySelector(".teamtab[data-team='"+selectedTab+"']").classList.add("active");
    const elements = document.querySelectorAll(".detail-scorecard");
    for(let i=0;i<elements.length;i++) {
      elements[i].classList.add("hide");
    }
    const visibleElems = document.querySelectorAll(".detail-scorecard."+selectedTab);
    for(let i=0;i<visibleElems.length;i++) {
      visibleElems[i].classList.remove("hide");
    }
    gaEvent("Cricket","ScoreCard "+selectedTab);
  }

  if(errorDetail) {
    return <NoMatch  />;
  }


  if(typeof(matchd)!='undefined' && matchd.hasOwnProperty("Matchdetail") && match.params.matchfile+".xml"==matchd['Matchdetail']['$']['Filename']){
    let teama = matchd['Matchdetail']['FirstInnings']['d']['Battingteam'];
    let teamb = matchd['Matchdetail']['FirstInnings']['d']['Bowlingteam'];
    let teamaId = matchd['Matchdetail']['FirstInnings']['d']['Battingteam_Id'];
    let teambId = matchd['Matchdetail']['FirstInnings']['d']['Bowlingteam_Id'];      
    let battingTeam = (matchd['Matchdetail'][matchd['Matchdetail']['$']['currentinning']+'Innings'].d.Battingteam==teama)?teama:teamb;

    let lastWicket = "";
    let lastWicketId = "";
    if(typeof(matchd['Matchdetail'][matchd['Matchdetail']['$']['currentinning']+'Innings']['FallofWickets'])!='undefined'){
      for(let wKeys of Object.keys(matchd['Matchdetail'][matchd['Matchdetail']['$']['currentinning']+'Innings']['FallofWickets'])){
        if(matchd['Matchdetail'][matchd['Matchdetail']['$']['currentinning']+'Innings']['FallofWickets'][wKeys]!=""){
          lastWicket = matchd['Matchdetail'][matchd['Matchdetail']['$']['currentinning']+'Innings']['FallofWickets'][wKeys];
        }
      }    
    }
    

    if(lastWicket!=""){
      let lastWicketArr = lastWicket.split("|");
      if(lastWicketArr.length>0){
        lastWicketId = lastWicketArr[0];
        lastWicket = lastWicketArr[1];
      }
    }

    let metaScore = "Newspoint";
    if(typeof(matchd['Matchdetail'][matchd['Matchdetail']['$']['currentinning']+"Innings"]['Equation'])!='undefined'){        
      metaScore = getShortTeamName(matchd['Matchdetail'][matchd['Matchdetail']['$']['currentinning']+"Innings"]['d']['Battingteam']) +" "+ matchd['Matchdetail'][matchd['Matchdetail']['$']['currentinning']+"Innings"]['Equation']['Total']+"/"+matchd['Matchdetail'][matchd['Matchdetail']['$']['currentinning']+"Innings"]['Equation']['Wickets']+" in "+matchd['Matchdetail'][matchd['Matchdetail']['$']['currentinning']+"Innings"]['Equation']['Overs']+" Overs";
    }

    let url1 = "/"+languages+"/cricket";
    let url3 = location.pathname;

    let url2 = location.pathname.replace("live-scorecard-", "live-score-");
    if(url3.indexOf("//")>=0){
      url3 = url3.replace("//","/");
    }

    let teamAshortName = getShortTeamName(teama);

    if(typeof(matchd['Matchdetail']['$']['Folder'])!='undefined'){
      return(
        <>
        <div className="container mt15" data-update={update}>
          <div>
            <CricketAppTabs active="3" url1={url1} url2={url2} url3={url3} />
          </div>           
          <div className="mt15" >
            <CricketMatchSummary match={matchd} updateCricketDetail={updateCricketDetail} />
          </div>
        </div>

        
          <div className="summarytabs">
            {matchd['Matchdetail'].hasOwnProperty("FirstInnings")?
              <div data-team={getShortTeamName(teama)} className="teamtab active taba" onClick={changeTab}>{getShortTeamName(teama)}</div>
              :null
            }
            {matchd['Matchdetail'].hasOwnProperty("SecondInnings")?
              <div data-team={getShortTeamName(teamb)} className="teamtab tabb" onClick={changeTab}>{getShortTeamName(teamb)}</div>
              :null
            }
            <span className="magic-line"></span>
          </div>

          {
           matchd['Matchdetail'].hasOwnProperty("FirstInnings") && matchd['Matchdetail']['FirstInnings'].hasOwnProperty("d")?
           <CricketScore currentInning={matchd['Matchdetail']['$']['currentinning']} score={matchd['Matchdetail']['FirstInnings']} prefix="FI" type={matchd['Matchdetail']['$']['matchtype']} status={matchd['Matchdetail']['$']['Status']} players={matchd['players']} selectedteam={teamAshortName} />
           :null
          }

          {
           matchd['Matchdetail'].hasOwnProperty("SecondInnings") && matchd['Matchdetail']['SecondInnings'].hasOwnProperty("d")?
           <CricketScore currentInning={matchd['Matchdetail']['$']['currentinning']} score={matchd['Matchdetail']['SecondInnings']} prefix="SI" type={matchd['Matchdetail']['$']['matchtype']} status={matchd['Matchdetail']['$']['Status']} selectedteam={teamAshortName} />
           :null
          }

          {
           matchd['Matchdetail'].hasOwnProperty("ThirdInnings") && matchd['Matchdetail']['ThirdInnings'].hasOwnProperty("d")?
           <CricketScore currentInning={matchd['Matchdetail']['$']['currentinning']} score={matchd['Matchdetail']['ThirdInnings']} prefix="TI" type={matchd['Matchdetail']['$']['matchtype']} status={matchd['Matchdetail']['$']['Status']}  selectedteam={teamAshortName} />
           :null
          }

          {
           matchd['Matchdetail'].hasOwnProperty("FourthInnings") && matchd['Matchdetail']['FourthInnings'].hasOwnProperty("d")?
           <CricketScore currentInning={matchd['Matchdetail']['$']['currentinning']} score={matchd['Matchdetail']['FourthInnings']} prefix="FO" type={matchd['Matchdetail']['$']['matchtype']} status={matchd['Matchdetail']['$']['Status']}  selectedteam={teamAshortName} />
           :null
          }          
        <div className="sap"></div>
      </>
      )
    } else {
      return (
        <div className="container">
          <NewsListCardLoading first={true} cricket={true} d={true} />
          <NewsListCardLoading first={true} cricket={true} d={true} />
          <NewsListCardLoading first={true} cricket={true} d={true} />
          <NewsListCardLoading first={true} cricket={true} d={true} />
          <NewsListCardLoading first={true} cricket={true} d={true} />
        </div>      
      )      
    }
  } else if(typeof(matchd)!='undefined' && matchd['code']=='404'){
    return (
      <NoMatch />
    )
  } else {
    return (
      <div className="container">
        <NewsListCardLoading first={true} cricket={true} d={true} />
        <NewsListCardLoading first={true} cricket={true} d={true} />
        <NewsListCardLoading first={true} cricket={true} d={true} />
        <NewsListCardLoading first={true} cricket={true} d={true} />
        <NewsListCardLoading first={true} cricket={true} d={true} />
      </div>      
    )
  }
}

CricketScoreCard.fetching = ({ dispatch, match }) => {
	return [dispatch(fetchCricketDetail({ match })),dispatch(fetchCricketShortDetail({ match })) ,dispatch(fetchCricketPlayers({ match })) ];
}

CricketScoreCard.defaultProps = {
	value: []
};

function mapStateToProps(state) {
  return {
    ...state.cricket,
    app: state.app
  };
}

const mapDispatchToProps = {
  fetchCricketDetail,
  fetchCricketShortDetail, 
  fetchCricketPlayers
};

export default connect(mapStateToProps, mapDispatchToProps)(CricketScoreCard);