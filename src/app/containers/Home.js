import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from "react-helmet";
import "../data/ducks/home/reducers";
import { fetchListing, fetchNextListing } from "../data/ducks/home/actions";
import { hasValue, getLanguages, updateHeader, makeUrl, getQueryString, scrollToTop } from '../../utils/util';

import NewsListCard from '../components/NewsListCard';
import NewsLoader from '../components/NewsLoader';
import Ad from '../components/Ad';
import LiveMatchCard from '../components/LiveMatchCard';
import PhotoListCard from '../components/PhotoListCard';
import InlineLol from '../components/InlineLol';
import InlineAstro from '../components/InlineAstro';
import ErrorBoundary from '../components/ErrorBoundary';
import useInfiniteScroll from '../../utils/useInfiniteScroll';
import InlineVideoCard from '../components/InlineVideoCard';
import InlineGames from '../components/InlineGames';
import { useCookies } from 'react-cookie';

const Home = (props) => {
	const { match } = props;
	const feedSection = match.params.feedSection || "top-news";
	const [cookies, setCookie] = useCookies();
	const { value, locale } = props;
	let lang = getLanguages(match, cookies);

	useEffect(()=>{
		scrollToTop();
		if(!hasValue(value.items) ||  value.items.length<=0 || props.feedSection !== feedSection || match.params.lang !== props.lang){
			props.fetchListing({match:props.match, cookies});
		}
		if(feedSection=='top-news'){
			updateHeader("1");
		} else {
			updateHeader("2");
		}
	},[match.params.feedSection, match.params.lang]);

  const [isFetching, setIsFetching] = useInfiniteScroll(()=>{
    props.fetchNextListing({pg:value.pg, match, cookies}).then((data)=>{
			setIsFetching(false);
		});
	});	
	

	const renderAstro = () => {
		return (
			
				<InlineAstro 
							lang={lang} 
							key={"astro"} 
							readmore={locale.readmore_text || 'Read More'} 
							yourhoroscope={locale.mx_yhoroscope || 'Your Horoscope'}
							choosesunsign={locale.mx_cusunsign || 'Choose your sunsign'}
							allsunsign={locale.mx_sasunsign || 'SEE ALL SUNSIGNS'} 
						/>
			
		)
	}

	return (
		<>
		{!hasValue(value.items) || props.feedSection !== feedSection?
		  <div className={`container listc ${makeUrl(feedSection)}`} key={1}>
				<NewsLoader first={feedSection=='top-news'} ad={true} />
		  </div>
		  :
		  <div className={`container listc ${makeUrl(feedSection)}`} key={2}>
			
			{ value.items.map((item, i)=> item && (item.tn=='news' || item.tn=='movie reviews')?
			  <>
					
					<NewsListCard first={i==0 && feedSection=='top-news'} key={i} item={item} /> 
					
					{i==0 && feedSection=='top-news'?<ErrorBoundary blank={true} key={"error"+i}><LiveMatchCard lang={lang} key={"cricket"+i} /></ErrorBoundary>:null}
					{i==8 && feedSection=='top-news'?
						renderAstro()
						:null
					}
			  </>
			  : 
			  <>
				{item && (item.tn == 'ad' || item.tn == 'ad_dfp')?
				
					(()=>{
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
					})()
					: (item && item.tn=='photopreview'?
						
					  	<PhotoListCard key={`${item.tn}_${i}`} item={item} odd={i%2} lang={lang} isHome={true} />
						
						:
						
						(item && item.tn=='meme_inline'?			
							
						  	<InlineLol key={`${item.tn}_${i}`} item={item} lang={lang} loltxt={locale.mx_loloud || 'Laugh out Loud'} seealltxt={locale.mx_samemes || 'SEE ALL MEMES'} />
							
						:
							(item && item.tn=='videopreview_inline'?
								
									<InlineVideoCard
										utm={props.utmSource}
										params={props.params}
										item={item}
										key={`${item.tn}_${i}`}
										see_all={locale.see_all || 'See All'}
										videoLanguage={lang}
									/>
								
								:
								(item && item.tn=="game_inline"?
										
											<InlineGames
												item={item}
												key={`${item.tn}_${i}`}
												see_all={locale.see_all || 'See All'}
												/>
										
									:null
								)
							)
					  )
					) 
				}

				{i==8  && feedSection=='top-news'?
				  renderAstro()
				:null} 
			  </>
			  )
			  
			}
			
			{isFetching?<NewsLoader />:null}
		  </div>
		}
		</>
	  );	
}

Home.fetching = ({ dispatch, match, cookies }) => {
	return [dispatch(fetchListing({match, cookies}))];
}

Home.defaultProps = {
	value: []
};

const mapStateToProps = (state) => ({
	value: state.home.value,
	feedSection: state.home.feedSection,
	locale: state.app.locale
});

const mapDispatchToProps = {
	fetchListing,
	fetchNextListing
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);