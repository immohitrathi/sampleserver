import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import FunniesLoader from '../components/FunniesLoader';
import FunnyCard from "../components/FunnyCard";
import { updateHeader, hasValue, elementInView, silentRedirect, throttle, scrollToTop } from "../../utils/util";
import useInfiniteScroll from '../../utils/useInfiniteScroll';
import { fetchFunniesListing, fetchNextFunniesListing, clearFunnies } from "../data/ducks/funnies/actions";
import "../data/ducks/funnies/reducers";
import config from '../../config';
import {useCookies}  from 'react-cookie';
import MetaData from '../helper/metadata';
import LangContext from '../helper/LangContext';

const Funnies = (props)=> {
  const { locale } = useContext(LangContext);
  const [cookies, setCookies] = useCookies();
  const { match, location, value, app } = props;
  const { params } = match;
  let pushedUrl = location.pathname + location.search;

  const handleScroll = ( event ) => {
    let elements = document.querySelectorAll(".funny-card");
    for( let i = 0; i < elements.length; i++ ) {
      if( elementInView(elements[i]) ) {
        let newUrl = elements[i].getAttribute("data-href");
        if(pushedUrl != newUrl) {
          pushedUrl = newUrl;
          //carry forward the same utm params
          let transformedUrl = transformURL(newUrl);
          silentRedirect(transformedUrl);          
        }
        break;
      }
    }
  }

  const throttleHandleScroll = throttle(handleScroll, 300);
  
  useEffect(()=>{
    updateHeader("3",'FUNNIES', true);
    scrollToTop();
    if(!hasValue(value.items) || value.items.length<=0){
      props.fetchFunniesListing({match, cookies});
    }
    
    window.addEventListener('scroll', throttleHandleScroll);
    return () => {
      //props.clearFunnies();
      window.removeEventListener('scroll', throttleHandleScroll);
    }
  },[match.params.lang]);

  const [isFetching, setIsFetching] = useInfiniteScroll(()=>{
    if(!props.error) {
      props.fetchNextFunniesListing({pg: props.value.pg, match, cookies}).then(()=>{
        setIsFetching(false);
      });
    }else{
      setIsFetching(false);
    }
  });
  //const theme = typeof props.location != 'undefined' && props.location.search && props.location.search.indexOf('dark') != -1 ? 'dark' : 'white';
  
  const onChangeHandler = (isVisible, index) => {
    let videoType = props.value.items[index].hasOwnProperty('yt') ? 'youtube' : 'video';
    let video = null;
    if(videoType == 'youtube'){
      let it = document.querySelectorAll('.funny-card')[index];
      if(typeof(it)!='undefined'){
        video = it.querySelector('iframe');
      }
    }else{
      let it = document.querySelectorAll('.funny-card')[index];
      if(typeof(it)!='undefined'){
        video = it.querySelector('video');
      }      
    }
    if(isVisible){
      //let item = props.value.items[index];
      //let lang = (typeof(props.params)!='undefined' && props.params.hasOwnProperty('lang')) ? props.params.lang : 'english';
      let playPromise = null;
      if(video && videoType == 'video' && video.paused){
        video.onwaiting = function(){
          video.classList.remove('playing');
        };
        video.onplaying = function(){
          video.classList.add('playing');
        };
        playPromise = video.play();
      }
        

      // In browsers that don’t yet support this functionality,
      // playPromise won’t be defined.
      if (playPromise !== undefined && playPromise != null) {
        playPromise.then(function() {
          //gaEvent('VideContent-Portrait-FunniesAutoPlay','Play-'+item.pubInfo.pid+'-'+lang,item.publiser+'-'+item.hl);
          console.log('Automatic playback started!');
        }).catch(function(error) {
          console.log('Automatic playback failed', error);
          // Automatic playback failed.
          // Show a UI element to let the user manually start playback.
        });
      }
    }else{
      //console.log('pausing videooooo')
      if(video && videoType == 'video'){
        video.pause();
      }else if(video && videoType == 'youtube'){
        let src = video.getAttribute("src");
        video.setAttribute("src","");
        video.setAttribute("src",src);
      }
      
      //video.stop();
    }
  }

  const transformURL = (u) => {
    let base = config.SITE_URL;
    try{
      let url1 = new URL(location.href, base);
      let url1Search = url1.search;
      let url2 = new URL(u, base);
      return url2.pathname + url1Search;
    }catch(e){
      console.log('Invalid URL: ', e);
      u = u.replace(base,'');
      return u;
    }
    
  }

  return (
    <>
    <div className="container mt15">
      {
        hasValue(value) && hasValue(value.items) && value.items.length > 0 ?
          <>
            <MetaData seo={props.head}/>
            

            {
              !props.asMenu?
              <div className="funnies-banner">
                <div className="text-content">
                  <h1>{locale.home_funnies_txt || 'VIRAL'}</h1>
                  <label>{locale.mx_lol || 'Laugh out loud with viral content from around the web'}</label>
                </div>
                <div className="smiley"></div>
              </div>
              :
              null
            }
            <div className="funnies-listing">
              {
                props.value.items.map((item, index)=>{
                  if(typeof item != 'undefined' && item && item.hasOwnProperty('tn') && item.tn != 'ad_dfp' && item.tn != 'ad'){
                    return (
                      <FunnyCard 
                        params={props.match.params} 
                        minTopValue={true} 
                        partialVisibility={false} 
                        onChange={onChangeHandler} 
                        dataIndex={index} 
                        item={item} 
                        key={index} 
                        applaudText={hasValue(locale.gvmApplaudText)?locale.gvmApplaudText:'Applaud'} 
                        shareText={hasValue(locale.gvmShareText)?locale.gvmShareText:'Share'}
                        />
                    )
                  }else if(typeof item != 'undefined' && item && item.hasOwnProperty('tn') && (item.tn === 'ad' || item.tn === 'ad_dfp')){
                    return null;
                  }
                  
                })
              } 
              {isFetching && !props.error ? <FunniesLoader ad={true} first={true}/> : null} 
            </div>
          </>
        : 
        <FunniesLoader ad={true} first={true}/>
      }
    </div>
    </>
  );
}


Funnies.fetching = ({ dispatch, match, query, cookies }) => {
	return [dispatch(fetchFunniesListing({match, query, cookies}))];
}

Funnies.defaultProps = {
	value: []
};

const mapStateToProps = (state) => ({
  ...state.funnies,
  app:state.app
});

const mapDispatchToProps = {
  fetchFunniesListing, 
  fetchNextFunniesListing, 
  clearFunnies
};
export default connect(mapStateToProps, mapDispatchToProps)(Funnies);
