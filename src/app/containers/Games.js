import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {Link as RLink} from 'react-router-dom';
import ReactLink from '../../utils/Link';
import NewsListCardLoading from "../components/NewsListCardLoading";
import {updateHeader , hasValue, gaEvent, scrollToTop, generateGameUserId, getGameUrl, goingToPlayGame  } from "../../utils/util";
import { fetchListing } from "../data/ducks/games/actions";
import Ad from "../components/Ad";
import "../data/ducks/games/reducers";
const Link = ReactLink(RLink);
import {useCookies} from 'react-cookie';
import GameCard from '../components/GameCard';
import InlineGames from '../components/InlineGames';

const Games = (props)=> {
  const { value } = props;
  const [cookies, setCookie] = useCookies();
  let gameUserId = generateGameUserId(cookies, setCookie);  

  useEffect(()=>{
    scrollToTop();
    updateHeader("3",'GAMES', true);
    if(!(hasValue(value) &&  hasValue(value.games) && value.games.length>0)){
      props.fetchListing();
    }
  },[]);


  if(!(hasValue(value) &&  hasValue(value.games) && value.games.length>0)){
    return( 
      <div className="container mt15">    
        <label className="dummy"></label><label className="dummy small"></label>
        <NewsListCardLoading first={true} />
        <NewsListCardLoading first={true} />
        <NewsListCardLoading first={true} />
      </div>
    );
  }


  let categories = hasValue(value.categoryGames)?Object.keys(value.categoryGames):[];

  let recentlyPlayed = [];
  if(typeof(window)!=='undefined' && hasValue(window) && hasValue(localStorage)) {
    recentlyPlayed = localStorage.getItem("games");
    recentlyPlayed = JSON.parse(recentlyPlayed);
  }

  return (
    <>
    <div className="container mt15">
        <div className="gamescss">
          <h1>{props.app.locale.games_text || 'GAMING'}</h1>  
          <label>{props.app.locale.cdgames || 'Play 100 +exciting games on your devices'}</label>
        </div>

      {/* 
        !props.asMenu?
        <Ad adtype={"ctn"} adcode={"327476"} />
        :null
       */}
      <div className="overflow-hidden">
      {
        hasValue(recentlyPlayed) && recentlyPlayed.length>0?
        <div className="gamescont mt15">
        <h3>RECENTLY PLAYED</h3>
        <div className="gridcont">
          {hasValue(recentlyPlayed) && recentlyPlayed.length==1?
            <InlineGames
              item={JSON.parse(recentlyPlayed[0])}
              key={0}
              list={true}
              />

            :
            <ul>
              {
                recentlyPlayed.map((v, i)=>{
                  let g = JSON.parse(v);
                  return (
                    <GameCard key={i} v={g} gameUserId={gameUserId} />
                  )
                })
              }
            </ul>

          }

        </div>
       </div>
        :null
      }
      </div>



       <div className="greybg gamescont">
        <h3>TOP GAMES</h3>
        <div className="scrlcontent">
          <ul>
            {
              value.games.map((v, i)=>{
                return (
                  <GameCard key={i} v={v} gameUserId={gameUserId} />
                )
              })
            }
          </ul>
        </div>
       </div>

       {
         hasValue(categories)?
         categories.map((cat, i)=>{
          return (
            <div className="gamescont" key={i}>
              <h3>{cat}</h3>
              <div className="gridcont">
              <ul>
                {
                  value.categoryGames[cat].map((v, i)=>{
                    let converImgObj = JSON.parse(v['assets']);
                    return (
                      <GameCard key={i} v={v} gameUserId={gameUserId} />
                    )
                  })
                }
              </ul>
            </div> 
              <Link className="seeall" to={`/games/${cat}`}>See All <span className="rightarrow">›</span></Link>             
            </div>
          )
         })
         :null
       }


    </div>
    <div className="sap"></div>
    </>
  );
}


Games.fetching = ({ dispatch }) => {
	return [dispatch(fetchListing())];
}

Games.defaultProps = {
	value: []
};

const mapStateToProps = (state) => ({
  ...state.games,
  app:state.app
});

const mapDispatchToProps = {
  fetchListing
};
export default connect(mapStateToProps, mapDispatchToProps)(Games);
