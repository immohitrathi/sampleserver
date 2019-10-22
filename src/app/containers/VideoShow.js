import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import Helmet from "react-helmet";
import "../data/ducks/videos/reducers";
import "../data/ducks/videoshow/reducers";
import {fetchListing, fetchNextListing} from '../data/ducks/videos/actions';
import {fetchVideo} from '../data/ducks/videoshow/actions';
import {updateHeader, getLanguages, scrollToTop, hasValue, cap} from '../../utils/util';
import config from '../../config';
//import VideosSection from '../components/VideosSection';
import { useCookies } from 'react-cookie';
import LangContext from '../helper/LangContext';
import NewsListCardLoading from '../components/NewsListCardLoading';
import Ad from '../components/Ad';
import useInfiniteScroll from '../../utils/useInfiniteScroll';
import VideoListCard from '../components/VideoListCard';
import VideoPlayer from '../components/VideoPlayer';
import VideoTitle from '../components/VideoTitleCard';
import LiveTvCard from '../components/LiveTvCard';

const VideoShow = (props) => {
	const { locale } = useContext(LangContext);
	const { match } = props;
	const [cookies, setCookie] = useCookies();
	const { value, location, category, currentVideo } = props;
	let lang = getLanguages(match, cookies);
	const {params} = match;
	let cat = params.hasOwnProperty('category') ? params.category : '';
    let categoryId = cat.replace("-"," ");
    let videoid = params.hasOwnProperty('id') ? params.id : '';
	let isLiveTV = cat.toLowerCase() === 'livetv' ? true : false;
	let ytPlayer = false, videoUrl = "", poster = "", shareUrl = "", videoTitle = "";
	
	const createVideoShowUrl = (params, id) => {
		if(params && params.channel && params.category) {
		  let path = config.SITE_URL + '/' + lang + '/videos/' + params.channel + '/' + params.category + "/videoshow/" + id;
		  return path;
		}else{
		  return config.SITE_URL;
		}
	}

    if(isLiveTV) {
        ytPlayer = false; 
        let itemArr = videoid && value.hasOwnProperty('items') && value.items;
        let curItem = null;
        for(let i = 0; i < itemArr.length; i++) {
            if(itemArr[i].channel_id === videoid) {
                curItem = itemArr[i];
            }
        }
        videoUrl = curItem? curItem.videourl : '';
        videoTitle = curItem && curItem.caption ? curItem.caption : curItem.channelname;
        poster = curItem? curItem.imageurl: '/images/appicon.svg';
        shareUrl = curItem ? createVideoShowUrl(params, curItem.channel_id) : '';
    }else if(videoid && currentVideo.hasOwnProperty('id') && videoid === currentVideo.id){
        ytPlayer = currentVideo.pu.includes('youtube') || currentVideo.pu.includes('veblr') ? true : false;
        videoUrl = currentVideo.pu ? currentVideo.pu : '';
        videoTitle = currentVideo.hl ? currentVideo.hl : '';
        poster = currentVideo.imageid ? currentVideo.imageid : '/images/appicon.svg';
        shareUrl = createVideoShowUrl(params, videoid);
    }else{
        //ytPlayer = videoid && value.hasOwnProperty('items') && typeof value.items[this.state.index] != 'undefined' && (value.items[this.state.index].pu.includes('youtube') || value.items[this.state.index].pu.includes('veblr')) ? true : false;
        //videoUrl = videoid && value.hasOwnProperty('items') && typeof value.items[this.state.index] != 'undefined' && value.items[this.state.index].pu ? value.items[this.state.index].pu : '';
        //videoTitle = videoid && value.hasOwnProperty('items') && typeof value.items[this.state.index] != 'undefined' && value.items[this.state.index].hl ? value.items[this.state.index].hl : '';
        //poster = videoid && value.hasOwnProperty('items') && typeof value.items[this.state.index] != 'undefined' && value.items[this.state.index].imageid ? value.items[this.state.index].imageid : '/img/placeholder.png';
        //shareUrl = videoid && value.hasOwnProperty('items') && typeof value.items[this.state.index] != 'undefined' ? this.createVideoShowUrl(params, videoid) : '';
    }
	useEffect(()=>{
		scrollToTop();
		if(!hasValue(currentVideo) ||  !currentVideo.id || currentVideo.id !== videoid){
			if(cat != 'livetv') {
				props.fetchVideo({match:props.match, cookies});
			}
		}
		if(!hasValue(value.items) ||  value.items.length<=0 || categoryId !== props.category){
			props.fetchListing({match:props.match, cookies});
		}
		updateHeader("3", category.toUpperCase(), true);
	},[match.params.id, match.params.lang]);

  	const [isFetching, setIsFetching] = useInfiniteScroll(()=>{
		if(cat != 'livetv') {
    		props.fetchNextListing({pg:value.pg, match, cookies}).then((data)=>{
				setIsFetching(false);
			});
		}
	});		
	
  	return (  
    <>
		<div className="videoshow">
		{
			hasValue(value) && hasValue(value.items) && value.items.length > 0 && category == categoryId ?
				<>
					<Helmet
						defaultTitle={typeof currentVideo != 'undefined' && currentVideo.hl ? currentVideo.hl : "Watch Latest Videos of " + categoryId}
						titleTemplate={"%s - "+config.SITE_TITLE}
						meta={[
						{"name": "title", "content": typeof currentVideo != 'undefined' && currentVideo.hl ? currentVideo.hl : "Watch Latest Videos of " + categoryId},
						{"name": "description", "content": "Find latest news, photos, and videos of "+categoryId+" from across all publishers on NewsPoint"},
						{"name": "keywords", "content": categoryId+" News, "+categoryId+" photos, latest "+categoryId+" news, "+categoryId+" videos"}
						]}
					/>
					<div className="stickynav width100"><VideoPlayer key={1} isLiveTV={isLiveTV} poster={poster} params={params} id={videoid} videoUrl={videoUrl} yt={ytPlayer}/></div>
                    <div className="pt250">
						<VideoTitle key={2} title={videoTitle} shareUrl={shareUrl}/>
						<div className="listing-title container">{locale.more_videos? locale.more_videos : 'More Videos'}</div>
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

VideoShow.fetching = ({ dispatch, match, cookies }) => {
	return [dispatch(fetchVideo({match, cookies})), dispatch(fetchListing({match, cookies}))];
}

VideoShow.defaultProps = {
	value: []
};

const mapStateToProps = (state) => ({
	value: state.videos.value,
	category: state.videos.category,
	currentVideo: state.videoshow.currentVideo
});
const mapDispatchToProps = {
	fetchVideo,
	fetchListing,
	fetchNextListing
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoShow);