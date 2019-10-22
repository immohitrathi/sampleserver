import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {Link as RLink } from 'react-router-dom';
import NewsListCardLoading from '../components/NewsListCardLoading';
import CricketAppTabs from '../components/CricketAppTabs';
import CricketMatchSummary from '../components/CricketMatchSummary';
import { hasValue, scrollToTop, gaEvent, updateHeader} from "../../utils/util";
import { getShortTeamName, matchDateFormat, getNbLbClass } from "../../utils/cricketutil";
import { fetchCricketDetail, fetchCricketShortDetail, fetchCricketPlayers, fetchNextCommentry } from "../data/ducks/cricket/actions";
import useInfiniteScroll from '../../utils/useInfiniteScroll';
import NoMatch  from "../components/NoMatch";
import "../data/ducks/cricket/reducers";
import ReactLink from '../../utils/Link';
const Link = ReactLink(RLink);


const CricketDetail = (props)=> {
  const [update, forceUpdate] = useState(false);
  const languages = props.match.params.lang;
  const {matchd, error, errorDetail, location, match} = props;
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

    try{
      let label = getShortTeamName(matchd['Matchdetail']['FirstInnings']['d']['Battingteam']);
      label = label+" "+getShortTeamName(matchd['Matchdetail']['FirstInnings']['d']['Bowlingteam']);
      label = label+" "+matchd['Matchdetail']['$'].Event;
      if(hasValue(matchd['Matchdetail']['$'].Event)) {
        gaEvent("Cricket","ScoreCardSummary", label);
      }
    }catch(ex){}

    return ()=>{
      clearInterval(interval);
      //removeErrorDetail(props);
    }    
  },[]);

  const updateCricketDetail = () => {
    if(document.querySelector(".cricket-refresh")){
      document.querySelector(".cricket-refresh").classList.add("anim");
      window.setTimeout(()=>{
        document.querySelector(".cricket-refresh").classList.remove("anim");
      },2000);
    }
    
    if(!hasValue(matchd['Matchdetail']) || matchd['matchfile']!=match.params.matchfile){
      props.fetchCricketDetail({match});
      props.fetchCricketShortDetail({match});
      props.fetchCricketPlayers({match});
    }
    props.fetchNextCommentry({match, matchd});
    forceUpdate(!update);
    
  }

  const [isFetching, setIsFetching] = useInfiniteScroll(()=>{
    props.fetchNextCommentry({match, matchd}).then(()=>{
      setIsFetching(false);
    });
  })

  if(typeof(matchd)!='undefined' && matchd.hasOwnProperty("Matchdetail") && props.match.params.matchfile+".xml"==matchd['Matchdetail']['$']['Filename']){
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
    let url2 = location.pathname;

    let url3 = location.pathname.replace("live-score-","live-scorecard-");
    if(url3.indexOf("//")>=0){
      url3 = url3.replace("//","/");
    }

    if(errorDetail) {
      return <NoMatch />;
    } else if(typeof(matchd['Matchdetail']['$']['Folder'])!='undefined'){
      return(
        <div className="container mt15 cricket" data-update={update}>
          <div>
            <CricketAppTabs active="2" url1={url1} url2={url2} url3={url3} />
          </div>           
          <div className="mt15" >
            <CricketMatchSummary match={matchd}  updateCricketDetail={updateCricketDetail} />
          </div>

          {typeof(matchd['Matchdetail']['commentary'])!='undefined' && matchd['Matchdetail']['commentary'].hasOwnProperty("detail") && matchd['Matchdetail']['commentary'].detail.hasOwnProperty("comm") && matchd['Matchdetail']['commentary']['detail'].comm.length>0?
            <div className="mt15">
              <div className="heading">
                Commentary
              </div>
              <div className="scorecard-cont" style={{marginTop:'0px',paddingTop:'0px'}}>
                <ul className="commentary">
                  {
                    matchd['Matchdetail']['commentary']['detail'].comm.map((commentry, idx)=>{
                      if(commentry.hasOwnProperty('totalrun') && typeof(matchd['Matchdetail']['commentary']['detail'].comm[idx-1])!='undefined' && !matchd['Matchdetail']['commentary']['detail'].comm[idx-1].hasOwnProperty('totalrun') && commentry.over!='0'){
                        return (
                          <li className="over-detail" key={idx}>
                            END OF OVER {commentry.over} | {commentry.run} Runs &amp;  {commentry.wkt} Wkt | {getShortTeamName(battingTeam)} {commentry.score?commentry.score:commentry.totalrun+"/"+commentry.totalwkt} 
                          </li>
                        )
                      } else if(commentry.hasOwnProperty('detail')){
                        return (
                          <li className={commentry.detail.Over==""?"comm-no-ball":""} key={idx}>
                            {
                              commentry.detail.Over!=""?
                                <div>
                                  <div className="margin-bottom-5px text-center width100per">{commentry.overball?commentry.overball:(commentry.detail.Over-1)+"."+commentry.detail.Ball} </div>
                                  {
                                    commentry.detail.Wicket=='Yes'?
                                    <div className={"run run_w"}>W</div>
                                    :
                                    <div className={"run run_"+commentry.runs+" "+getNbLbClass(commentry.runs)}>{commentry.runs}</div>
                                  }
                                 
                                </div>                          
                              :
                              <div></div>
                            }

                            <div className="padding-right-10px">
                              {commentry.commentary}
                            </div>

                          </li>
                        )                        
                      }
                    })
                  }

                  {isFetching && error==false?
                    <><NewsListCardLoading first={true} cricket={true} />
                      <NewsListCardLoading first={true} cricket={true} />
                      <NewsListCardLoading first={true} cricket={true} />
                      <NewsListCardLoading first={true} cricket={true} />
                      <NewsListCardLoading first={true} cricket={true} />
                    </>
                  :null}
                </ul>
              </div>   
            </div>
            :null
          }

          
        </div>
      )
    } else if(typeof(matchd)!='undefined' && matchd['code']=='404'){
      return (
        <NoMatch />
      )
    } else {
      const {matchd, location, isFetching, appStatus, params, error} = this.props;    
      let languages = params.lang;
      return (
        <div className="scorecardP cricket">
          
          <div className="paddingrl paddingtb">
            <CricketAppTabs active="2" url1={url1} url2={url2} url3={url3} nocontent={true} />
          </div>            
        
          <div className="scorecard-cont paddingrl" style={{marginTop:appStatus?'0px':'65px'}}>

          <div className="margin-bottom-6px ">
            <span className="islive">LIVE</span>
            

            {this.props.currentTab=='upcoming'?
              <span className="matchdate">{matchDateFormat(matchd['Matchdetail']['$'].matchdate_ist, matchd['Matchdetail']['$'].matchtime_gmt,'dS mmm')}</span>
              :null
            }

            <span className="title matchended" style={{background:'none', fontSize:'1.1rem',color:'#c2c2c2'}}>{matchd['Matchdetail']['$'].MatchNo}  ({matchd['Matchdetail']['$'].matchtype})</span>

          </div>
          <div className="series-title margin-bottom-4px">
            {matchd['Matchdetail']['$'].Event}
          </div>
          <div className="match-date margin-bottom-12px" style={{fontSize:'1.1rem',color:'#c2c2c2',lineHeight:'1.3rem'}}>
            {matchd['Matchdetail']['$'].Venue}
          </div>

          <table className="upcoming-tabs-table" >
            <tbody>
            <tr>

            <td className="scorecard-tb" style={{width:'35%'}}>
              <div className="teamname">
                <img alt="" className="flag" src={"/img/flags/"+(matchd['Matchdetail']['FirstInnings']['d']['Battingteam_Id']!=""?matchd['Matchdetail']['FirstInnings']['d']['Battingteam_Id']:"default")+".svg"} /><span className="teamname">&nbsp;&nbsp;{getShortTeamName(matchd['Matchdetail']['FirstInnings']['d']['Battingteam'])}</span>
              </div>
            </td>
            <td className="matchtime text-center"  style={{width:'30%'}}>
              {/*matchDateFormat(matchd['Matchdetail']['$'].matchdate, matchd['Matchdetail']['$'].matchtime_ist,'HH:MM', true)*/}
            </td>
            <td className="scorecard-tb last-child" style={{width:'35%'}}>
              <div className="teamname" style={{width:'auto',float:'right'}}>
                <img alt="" className="flag" src={"/img/flags/"+(matchd['Matchdetail']['FirstInnings']['d']['Bowlingteam_Id']!=""?matchd['Matchdetail']['FirstInnings']['d']['Bowlingteam_Id']:"default")+".svg"} /><span className="teamname">&nbsp;&nbsp;{getShortTeamName(matchd['Matchdetail']['FirstInnings']['d']['Bowlingteam'])}</span>
              </div>
            </td>
            </tr>
            </tbody>
          </table>
          </div>

            <div id="cricNoContent" className="cricket-nocontent" style={{border:'0px',borderRadius:'none'}}>
              <div className="stump" style={{margin:'0px auto 25px'}}></div>
              Stay Tuned! Scorecard is coming soon
              <div className="paddingrl text-center" style={{marginTop:'20px'}}>
                <a className="view-full-score" href="javascript:void(0)" style={{width:'50%', margin:'0 auto'}} onClick={this.refreshScore.bind(this)}>REFRESH</a>
              </div>
            </div>            

        </div>
      )
    }



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

CricketDetail.fetching = ({ dispatch, match }) => {
	return [dispatch(fetchCricketDetail({ match })),dispatch(fetchCricketShortDetail({ match })) ,dispatch(fetchCricketPlayers({ match })) ];
}

CricketDetail.defaultProps = {
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
  fetchCricketPlayers,
  fetchNextCommentry
};

export default connect(mapStateToProps, mapDispatchToProps)(CricketDetail);