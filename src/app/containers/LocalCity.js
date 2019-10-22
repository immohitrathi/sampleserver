import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import {Link as RLink} from 'react-router-dom';
import ReactLink from '../../utils/Link';
import NewsLoader from "../components/NewsLoader";
import {updateHeader , hasValue, scrollToTop } from "../../utils/util";
import { fetchCityListing, fetchCityNearbyListing, fetchCityStateListing } from "../data/ducks/city/actions";
import Ad from "../components/Ad";
import "../data/ducks/city/reducers";
import { useCookies } from 'react-cookie';
const Link = ReactLink(RLink);
import LangContext from '../helper/LangContext';
import NewsListCard from '../components/NewsListCard';
import Weather from '../components/Weather';

const LocalCity = (props)=> {
  const { locale } = useContext(LangContext);
  const [cookies, setCookies] = useCookies();
  const { location, match } = props;
  const language = props.match.params.lang || 'english';
  const city = props.match.params.city || '';

  useEffect(()=>{
    updateHeader("2");
    scrollToTop();
    if(!(hasValue(props.listing.items) && props.listing.items.length>0) || match.params.city!=props.city) {
      props.fetchCityListing({match, cookies});
      props.fetchCityNearbyListing({match, cookies});
      props.fetchCityStateListing({match, cookies});
    }    
  },[match.params.lang, match.params.city]);


  if(!(hasValue(props.listing.items) && props.listing.items.length>0)){
    return <div className="container listc"><NewsLoader first={false} ad={true} /></div>;
  }

  //<NewsListCard first={i==0 && feedSection=='top-news'} key={i} item={item} /> 

  return (
    <>
    <div className="container listc">

      <Weather city={city} language={language} />

      {hasValue(props.listing.items) && props.listing.items.length>0?
        <>
        {
          props.listing.items.map((item, i)=>{
            if(i>5)
              return null;

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
        <Link className="seeall" to={`/${language}-news/local-news/${encodeURIComponent(city)}/listing`}>SEE MORE NEWS <span class="rightarrow">›</span></Link>
        </>
        : 
        <div className=""><NewsLoader /></div>
      }
    </div>


      {hasValue(props.nearby.items) && props.nearby.items.length>0?
        <>
      <div className="container mt15">
        <h1 className="heading">NEARBY {city.toUpperCase()}</h1>
        <div className="mt10"></div>
        {
          props.nearby.items.map((item, i)=>{
            if(i>5)
              return null;

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
        <Link class="seeall" to={`/${language}-news/local-news/${encodeURIComponent(city)}/nearby`}>SEE MORE NEWS <span class="rightarrow">›</span></Link>
        </div> 
        </>
        : 
        null
      }
    



      {hasValue(props.statelisting.items) && props.statelisting.items.length>0?
        <>
      <div className="container mt15">
      <h1 className="heading">{ props.statelisting.state.toUpperCase() }</h1>
      <div className="mt10"></div>
        {
          props.statelisting.items.map((item, i)=>{
            if(i>5)
              return null;

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
        <Link class="seeall" to={`/${language}-news/local-news/${encodeURIComponent(city)}/statelisting`}>SEE MORE NEWS <span class="rightarrow">›</span></Link>
        </div> 
        </>
        : 
        null
      }
    
    
    <div className="sap"></div>

    </>
  );
}


LocalCity.fetching = ({ dispatch, match, query, cookies }) => {
	return [dispatch(fetchCityListing({match, cookies})), dispatch(fetchCityNearbyListing({match, cookies})), dispatch(fetchCityStateListing({match, cookies}))];
}

LocalCity.defaultProps = {
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
  fetchCityStateListing
};
export default connect(mapStateToProps, mapDispatchToProps)(LocalCity);
