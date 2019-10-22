import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PhotoDetailCards from '../components/PhotoDetailCards';
import NewsListCardLoading from '../components/NewsListCardLoading';
import Ad from '../components/Ad';
import { hasValue,  scrollToTop, silentRedirect, elementInView, throttle, gaEvent, getQueryString, updateHeader } from "../../utils/util";
import useInfiniteScroll from '../../utils/useInfiniteScroll';
import { fetchListing, fetchNextListing ,fetchPhotoDetail, fetchNextPhotoDetail, clearPhotoDetail } from "../data/ducks/photo/actions";
import "../data/ducks/photo/reducers";
import NotFound from './NotFound';

const PhotoDetail = (props)=> {
  const { match, location } = props;
  const query = getQueryString(location);
  const lang = props.match.params.lang || 'english';
  let pushedUrl = location.pathname + location.search;


  const handleScroll = ( event ) => {
    let elements = document.querySelectorAll(".photocard");
    for(let i=0;i<elements.length;i++) {
      if(elementInView(elements[i])) {
        let newUrl = elements[i].getAttribute("data-href");
        if(pushedUrl != newUrl) {
          pushedUrl = newUrl;
          silentRedirect(window.location.origin + newUrl);  
          gaEvent("Perpetualscroll","Photogallery",lang);
        }
        break;
      }
    }
    
  }


  const throttleHandleScroll = throttle(handleScroll, 300);
  useEffect(()=>{
    const { detail } = props;
    updateHeader("3","PHOTO GALLERY", true);
    if(!hasValue(detail) || detail.length<=0){
      props.fetchPhotoDetail({match, query});
    }
    
    scrollToTop();
    
    window.addEventListener('scroll', throttleHandleScroll);
    return () => {
      props.clearPhotoDetail();
      window.removeEventListener('scroll', throttleHandleScroll);
    }

  },[props.match.params.id]);

  const [isFetching, setIsFetching] = useInfiniteScroll(()=>{
    try{
      let promiseThen = props.fetchNextPhotoDetail({ photo:props, match }).then(()=>{
        setIsFetching(false);
      });
    }catch(ex){}
  });

  return (
    <>
    {!(hasValue(props.detail) && props.detail.length>0)?
      <div className="container mt15">    
        <label className="dummy"></label><label className="dummy small"></label>
        <NewsListCardLoading first={true} />
        <NewsListCardLoading first={true} />
        <NewsListCardLoading first={true} />
      </div>
      :
      <>
        {
          hasValue(props.detail[0]) && hasValue(props.detail[0].status) && props.detail[0].status=="INTERNAL_SERVER_ERROR"?
          <NotFound />
          :
          <div className="container">
            { props.detail.map((items, i)=> <PhotoDetailCards key={i} detail={items} lang={lang} location={location} /> )  }
            { isFetching && props.error==false?<><NewsListCardLoading first={true} /><NewsListCardLoading first={true} /><NewsListCardLoading first={true} /></>:null }  
          </div>
        }
        <div className="mt15"></div>
      </>
    }
    </>

  );
}

PhotoDetail.fetching = ({ dispatch, match, query }) => {
	return [dispatch(fetchListing({match, query})), dispatch(fetchPhotoDetail({match, query})) ];
}

PhotoDetail.defaultProps = {
	value: []
};

function mapStateToProps(state) {
  return {
    ...state.photo
  };
}

const mapDispatchToProps = {
  fetchPhotoDetail,
  fetchListing,
  fetchNextListing,
  fetchNextPhotoDetail,
  clearPhotoDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetail);