import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import {Link as RLink} from 'react-router-dom';
import ReactLink from '../../utils/Link';
import NewsLoader from "../components/NewsLoader";
import {updateHeader , hasValue, scrollToTop } from "../../utils/util";
import { fetchCityListing, fetchCityNearbyListing, fetchCityStateListing, fetchNextCityListing } from "../data/ducks/city/actions";
import Ad from "../components/Ad";
import "../data/ducks/city/reducers";
import { useCookies } from 'react-cookie';
const Link = ReactLink(RLink);
import LangContext from '../helper/LangContext';
import NewsListCard from '../components/NewsListCard';
import useInfiniteScroll from '../../utils/useInfiniteScroll';

const LocalCityDetail = (props)=> {
  const { locale } = useContext(LangContext);
  const [cookies, setCookies] = useCookies();
  const { location, match } = props;
  const language = props.match.params.lang || 'english';
  const city = props.match.params.city || '';
  const type = props.match.params.type || 'listing';
  console.log("Inside LocalCityDetail", props);

  useEffect(()=>{
    updateHeader("3",city.toUpperCase(), true);
    scrollToTop();
    if(!(hasValue(props[type].items) && props[type].items.length>0) || props.city!==match.params.city) {
      if(type=='listing'){
        props.fetchCityListing({match, cookies});
      } else if(type=='nearby') {
        props.fetchCityNearbyListing({match, cookies});
      } else if(type=='statelisting') {
        props.fetchCityStateListing({match, cookies});
      }
    }    
  },[props.match.params.lang, props.match.params.city, props.match.params.type]);

  const [isFetching, setIsFetching] = useInfiniteScroll(()=>{
    if(props[type].cp >= props[type].tp) {
      return;
    }

    try{
      props.fetchNextCityListing({pg:props[type].pg, match, cookies}).then((data)=>{
        setIsFetching(false);
      });
    }catch(ex){
      setIsFetching(false);
    }
	});	


  if(!(hasValue(props[type].items) && props[type].items.length>0)){
    return <div className="container mt15"><NewsLoader first={false} ad={true} /></div>;
  }


  return (
    <>
    <div className="container mt15">

      {hasValue(props[type].items) && props[type].items.length>0?
        <>
        {
          props[type].items.map((item, i)=>{
            if(!hasValue(item)) return null;

            if(item.tn == 'ad' || item.tn == 'ad_dfp') {
              let mstype = 'mrec1';
              if (item.tn === 'ad_dfp' && item.adcode) {
                const temp = item.adcode.match(/Mrec.*|BTF|ATF|Masthead/i)[0];
                mstype = temp ? temp.replace(/[_]/g, '').toLowerCase() : 'mrec1';
              }
              return (
                <Ad
                  key={`${item.tn}_${i}`}
                  adtype={item.tn == 'ad' ? 'ctn' : 'dfp'}
                  mstype={item.tn == 'ad' ? 'inline' : mstype}
                  adcode={item.adcode ? item.adcode : ''}
                />
              );
            } else if(item.tn=='news'){
              return (
                <NewsListCard key={i} item={item} /> 
              )
            }
            
          })
        }

        {isFetching ? <NewsLoader />:null }
        </>
        : 
        <div className=""><NewsLoader /></div>
      }
    </div>
    
    <div className="sap"></div>

    </>
  );
}


LocalCityDetail.fetching = ({ dispatch, match, query, cookies }) => {
  let type = match.params.type || "listing";
  if(type=='listing'){
    return [dispatch(fetchCityListing({match, cookies}))];
  } else if(type=='nearby') {
    return [dispatch(fetchCityNearbyListing({match, cookies}))];
  } else if(type=='statelisting') {
    return [dispatch(fetchCityStateListing({match, cookies}))];
  }
}

LocalCityDetail.defaultProps = {
  listing: {},
  statelisting: {},
  nearby: {}
};

const mapStateToProps = (state) => ({
  ...state.city
});

const mapDispatchToProps = {
  fetchCityListing,
  fetchCityNearbyListing, 
  fetchCityStateListing,
  fetchNextCityListing
};
export default connect(mapStateToProps, mapDispatchToProps)(LocalCityDetail);
