import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {Link as RLink} from 'react-router-dom';
import ReactLink from '../../utils/Link';
import NewsListCardLoading from "../components/NewsListCardLoading";
import {updateHeader , hasValue, gaEvent, scrollToTop, generateGameUserId, getGameUrl, goingToPlayGame } from "../../utils/util";
import { fetchCategory, fetchNextCategoryListing } from "../data/ducks/games/actions";
import Ad from "../components/Ad";
import "../data/ducks/games/reducers";
const Link = ReactLink(RLink);
import useInfiniteScroll from '../../utils/useInfiniteScroll';
import {useCookies} from 'react-cookie';
import GameCard from '../components/GameCard';

const GamesCategory = (props)=> {
  const { listing, match } = props;
  const { category } = match.params;
  const [cookies, setCookie] = useCookies();
  let gameUserId = generateGameUserId(cookies, setCookie);
  let shouldFetch = true;
  useEffect(()=>{
    scrollToTop();
    updateHeader("3",category, true);
    console.log("Here i am", category,props.category);
    if(!(hasValue(listing)  && hasValue(listing.games) && listing.games.length>0 && category==decodeURIComponent(props.category))){
      props.fetchCategory({match});
    }
  },[match.params.category]);

  const [isFetching, setIsFetching] = useInfiniteScroll(()=>{
    if(!hasValue(listing.pg) || listing.pg.cp<listing.pg.tp){
      props.fetchNextCategoryListing({pg:listing.pg, match}).then((data)=>{
        setIsFetching(false);
      });
    } else {
      shouldFetch = false;
      setIsFetching(false);
    }
  });	  


  
  if(!(hasValue(listing)  && hasValue(listing.games) && listing.games.length>0 && category==decodeURIComponent(props.category))){
    return( 
      <div className="container mt15">    
        <label className="dummy"></label><label className="dummy small"></label>
        <NewsListCardLoading first={true} />
        <NewsListCardLoading first={true} />
        <NewsListCardLoading first={true} />
      </div>
    );
  }


  return (
    <>
      <div className="container mt15">
        <div className="gamescont" style={{borderBottom:'none'}}>
          <div className="gridcont">
            <ul>
              {
                listing.games.map((v, i)=>{
                  let converImgObj = JSON.parse(v['assets']);
                  let url = getGameUrl(v, gameUserId);
                  return (
                    <GameCard key={i} v={v} gameUserId={gameUserId} />
                  )
                })
              }
            </ul>
          </div> 
        </div>
      </div>

      {isFetching && shouldFetch?
        <>
          <NewsListCardLoading first={true} />
          <NewsListCardLoading first={true} />
          <NewsListCardLoading first={true} />
        </>
        :null
      }

      <div className="sap"></div>
    </>
  );
}


GamesCategory.fetching = ({ dispatch, match }) => {
	return [dispatch(fetchCategory({match}))];
}

GamesCategory.defaultProps = {
	listing: []
};

const mapStateToProps = (state) => ({
  ...state.games,
  app:state.app
});

const mapDispatchToProps = {
  fetchCategory,
  fetchNextCategoryListing
};
export default connect(mapStateToProps, mapDispatchToProps)(GamesCategory);
