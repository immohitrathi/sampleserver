import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import PhotoListCard from '../components/PhotoListCard';
import PhotoLoader from '../components/PhotoLoader';
import Ad from '../components/Ad';
import { hasValue, updateHeader, scrollToTop } from "../../utils/util";
import useInfiniteScroll from '../../utils/useInfiniteScroll';
import { fetchListing, fetchNextListing } from "../data/ducks/photo/actions";
import "../data/ducks/photo/reducers";
import LangContext from '../helper/LangContext';

const Photos = (props)=> {
  const { match, value } = props;
  const { locale, query } = useContext(LangContext);


  useEffect(()=>{
    updateHeader("3",locale.bookmark_photo_title || "PHOTOS");
    scrollToTop();
    if(!hasValue(value.items) ||  value.items.length<=0){
			props.fetchListing({match:match, query});
		}
	},[]);

  const [isFetching, setIsFetching] = useInfiniteScroll(()=>{
    props.fetchNextListing({pg:value.pg, match, query}).then(()=>{
			setIsFetching(false);
		});
  });	
  
  return (
    <>
    {!hasValue(props.value.items)?
      <div className="container" key={1}>
        <PhotoLoader />
      </div>
      :
      <div className="container" key={2}>
        { props.value.items.map((item, i)=> item.tn=='ad'?<Ad mt={i==1?'mt28':''} adcode={item.adcode} key={'ad'+i} />:<PhotoListCard key={i} item={item} odd={i%2} /> )  }
        {isFetching?<PhotoLoader key={9} />:null}
      </div>
    }
    </>

  );
}


Photos.fetching = ({ dispatch, match, query }) => {
	return [dispatch(fetchListing({match, query}))];
}

Photos.defaultProps = {
	value: []
};

const mapStateToProps = (state) => ({
	...state.photo
});

const mapDispatchToProps = {
  fetchListing,
  fetchNextListing
};

export default connect(mapStateToProps, mapDispatchToProps)(Photos);