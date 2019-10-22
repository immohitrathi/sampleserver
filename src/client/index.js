import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import {configureStore} from "../app/data/store";
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { CookiesProvider } from 'react-cookie';
import Routes from '../routes/routes';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
import config from '../config';
import ctnAds from '../utils/ctnAds';
import dfpAds from '../utils/dfpAds';
import { hasValue, logPageView } from '../utils/util';

const adsObj = config.ADS_CONFIG;
let isLandingPage = true;
ReactGA.initialize(config.GA_APP_ID, { debug: false });
dfpAds.initialize({ wapads: adsObj.dfpads.others }); //Initialize ads , currently dfp
ctnAds.initialize();

const history = createBrowserHistory();

history.listen((eve) => {
  ReactGA.pageview(window.location.origin + window.location.pathname + window.location.search);
  onRouteUpdate();
});

logPageView(window.location.origin + window.location.pathname + window.location.search);
onRouteUpdate();

window.tempHistory = history;


window.onload = () => {
  	Loadable.preloadReady().then(() => {
		let store = configureStore(window.INITIAL_STATE);
		ReactDOM.hydrate(
			<Provider store={ store }>
				<CookiesProvider>
					
						<BrowserRouter>
							<div>{renderRoutes(Routes)}</div>
						</BrowserRouter>
					
				</CookiesProvider>
			</Provider>
		, document.getElementById('app'));
  	});
};

function onRouteUpdate() {
    let { pathname } = window.location;
    //let { params } = this.state;
    adsHandler(pathname, null, {});
    // update landing page flag
    isLandingPage = false;
    if(typeof colombia != 'undefined' && typeof colombia.update == 'function' && typeof window != 'undefined') {
      setTimeout(function(){colombia.update()},1000);
    }
}

function adsHandler(pathname, params, query){
  let pagetype = "";
	try {
		pagetype = getPageType(pathname, params, true);
	}catch(ex){}
	
	// trigger refresh of ads
	window.wapads = adsObj.dfpads[pagetype];
	//check if landing page or not , return if landing page
	if (isLandingPage) {
	  return;
	} else if(pagetype != ''){
	  if(query && query.frmapp && query.frmapp === 'yes') {
		dfpAds.recreateAds(['atf_wv','btf_wv'] , {wapads:adsObj.dfpads[pagetype]}, {}, pagetype, query.utm_source);
	  }else if(query && query.utm_source && query.utm_source === 'vivo') {
		if(query.utm_medium && query.utm_medium.indexOf('chrome') != -1) {
			dfpAds.recreateAds(['fbn_vc'] , {wapads:adsObj.dfpads[pagetype]}, {}, pagetype, query.utm_source);
		}else if(query.utm_medium && query.utm_medium.indexOf('lockscreen') != -1) {
			dfpAds.recreateAds(['fbn_vls'] , {wapads:adsObj.dfpads[pagetype]}, {}, pagetype, query.utm_source);
		}else{
			dfpAds.recreateAds(['fbn_v'] , {wapads:adsObj.dfpads[pagetype]}, {}, pagetype, query.utm_source);
		}
	  }else if(query && query.utm_source && query.utm_source === 'samsung') {
		dfpAds.recreateAds(['fbn_samsung'] , {wapads:adsObj.dfpads[pagetype]}, {}, pagetype, query.utm_source);
	  }else{
		dfpAds.recreateAds(['atf','btf','fbn'] , {wapads:adsObj.dfpads[pagetype]}, {}, pagetype, query.utm_source);
	  }
	}else{
		dfpAds.recreateAds(['atf','btf','fbn'] , {wapads:adsObj.dfpads.others});
	}
}

function getPageType(pathname, params, forAds) {
	let pagetype = (pathname.indexOf('/articleshow/') > -1 ) ? 'articleshow' : (pathname.indexOf('/moviereview/') > -1 ) ? 'moviereview' : 
	(pathname.indexOf('/photoshow/') > -1 ) ? 'photoshow' : (pathname.length == 1 || (typeof(params) == 'undefined' && typeof(params.feedSection) == 'undefined' && typeof(params.matchfile) == 'undefined') && typeof params.subsection == 'undefined') ? 'home' :
	(hasValue(params) && typeof(params.feedSection) != 'undefined' && params.feedSection != 'top-news' && params.feedSection != 'comics' && params.feedSection != 'cricket' && params.feedSection != 'ipl' && params.feedSection != 'worldcup' && params.feedSection != 'featured' && params.feedSection != 'horoscope') ? 'articlelist' : 
	(hasValue(params) && (typeof(params.feedSection) != 'undefined' && params.feedSection == 'cricket' || params.feedSection == 'ipl' || params.feedSection == 'worldcup') || typeof(params.matchfile) != 'undefined') || typeof params.subsection != 'undefined' ? 'cricket' :
	(hasValue(params) && typeof(params.feedSection) != 'undefined' && params.feedSection == 'comics') ? 'comics' :
	'others' 
  
	if(pathname.indexOf('/horoscope') > -1) pagetype = 'horoscope';
	if(pathname.indexOf('/elections/') > -1) pagetype = 'others';
	if(pathname.indexOf('funnies') > -1) pagetype = 'funnies';
	if(pathname.indexOf('comics') > -1) pagetype = 'comics';
	if(pathname.indexOf('video/watch') > -1 || pathname.indexOf('/videos/') > -1) pagetype = 'watch';
	if(pathname.indexOf('/local-news') > -1 || pathname.indexOf('/photos-news') > -1) pagetype = 'articlelist';
	if(pathname.indexOf('/gaana') > -1 || pathname.indexOf('/games') > -1) pagetype = 'others';
	
  
	//check pathname in router and handle ads data 
	if(forAds) {
	  return pagetype === 'moviereview' ? 'articleshow' : pagetype;
	}
	return pagetype;
}

if ('serviceWorker' in navigator) {
	navigator.serviceWorker
	  .register('/sw.js')
	  .then(reg => {})
	  .catch(() => {});
}