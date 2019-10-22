import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import Helmet from "react-helmet";
import "../data/ducks/videos/reducers";
import {fetchNavigations, fetchListing, fetchNextListing} from '../data/ducks/videos/actions';
import {updateHeader, getLanguages, scrollToTop, hasValue} from '../../utils/util';
import config from '../../config';
//import VideosSection from '../components/VideosSection';
import { useCookies } from 'react-cookie';
import LangContext from '../helper/LangContext';
import NewsListCardLoading from '../components/NewsListCardLoading';
import Ad from '../components/Ad';
import useInfiniteScroll from '../../utils/useInfiniteScroll';
import Navigations from '../components/Navigations';
import VideoListCard from '../components/VideoListCard';
import LiveTvCard from '../components/LiveTvCard';

const Videos = (props) => {
	const { locale } = useContext(LangContext);
	const { match } = props;
	const [cookies, setCookie] = useCookies();
	const { value, location, category, nav } = props;
	let lang = getLanguages(match, cookies);
	const {params} = match;
	let cat = params.hasOwnProperty('category') ? params.category : '';
    let categoryId = cat.replace("-"," ");
    

	useEffect(()=>{
		scrollToTop();
		if(!hasValue(nav.items) ||  nav.items.length<=0){
			props.fetchNavigations({match:props.match, cookies});
		}
		if(!hasValue(value.items) ||  value.items.length<=0 || categoryId !== props.category){
			props.fetchListing({match:props.match, cookies});
		}
		updateHeader("3", locale.el_videos? locale.el_videos.toUpperCase() : 'VIDEOS', false);
	},[match.params.category, match.params.lang]);

  	const [isFetching, setIsFetching] = useInfiniteScroll(()=>{
		  if(category != 'livetv') {
			props.fetchNextListing({pg:value.pg, match, cookies}).then((data)=>{
				setIsFetching(false);
			});
		  }
	});		

  return (  
    <>
		<div className="stickynav"><Navigations lang={lang} nav={nav} /></div>
		<div className="videos pt60">
		{
			hasValue(value) && hasValue(value.items) && value.items.length > 0 && category == categoryId ?
				<>
					<Helmet
						defaultTitle={typeof value.items[0] != 'undefined' && value.items[0].hl ? value.items[0].hl : "Watch Latest Videos of " + categoryId}
						titleTemplate={"%s - "+config.SITE_TITLE}
						meta={[
						{"name": "title", "content": typeof value.items[0] != 'undefined' && value.items[0].hl ? value.items[0].hl : "Watch Latest Videos of " + categoryId},
						{"name": "description", "content": "Find latest news, photos, and videos of "+categoryId+" from across all publishers on NewsPoint"},
						{"name": "keywords", "content": categoryId+" News, "+categoryId+" photos, latest "+categoryId+" news, "+categoryId+" videos"}
						]}
					/>
					<div className={`video-listing ${categoryId}`}>
						<ul className="video-list">
						{ 
							value.items.map((item, i) => {
								if(item && item.tn == 'video') {
									return <VideoListCard key={item.id} item={item} lang={lang}/> 
								} else if(categoryId == 'livetv') {
									return <LiveTvCard key={item.channel_id} item={item} lang={lang}/> 
								}else{
									return null;
								}
							})
						}
						</ul>
					</div>
				</>
			: 
			<div className="container mt15">    
				<NewsListCardLoading first={true} />
				<label className="dummy"></label><label className="dummy small"></label>
				<NewsListCardLoading first={true} />
				<label className="dummy"></label><label className="dummy small"></label>
				<NewsListCardLoading first={true} />
				<label className="dummy"></label><label className="dummy small"></label>
			</div>
		}
		{isFetching && category != 'livetv' ? 
			<>
				<NewsListCardLoading first={true} />
				<label className="dummy"></label><label className="dummy small"></label>
				<NewsListCardLoading first={true} />
				<label className="dummy"></label><label className="dummy small"></label>
				<NewsListCardLoading first={true} />
				<label className="dummy"></label><label className="dummy small"></label>
			</>
		: null	
		}
		</div>
	</>
    )      
}

Videos.fetching = ({ dispatch, match, cookies }) => {
	return [dispatch(fetchNavigations({match, cookies})), dispatch(fetchListing({match, cookies}))];
}

Videos.defaultProps = {
	value: []
};

const mapStateToProps = (state) => ({
	value: state.videos.value,
	category: state.videos.category,
	nav: state.videos.nav
});
const mapDispatchToProps = {
	fetchNavigations,
	fetchListing,
	fetchNextListing
};

export default connect(mapStateToProps, mapDispatchToProps)(Videos);