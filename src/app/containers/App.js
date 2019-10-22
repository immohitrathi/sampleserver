import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Helmet from "react-helmet";
import ErrorBoundary from '../components/ErrorBoundary';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "../data/ducks/app/reducers";
import "../data/ducks/config/reducer";
import { fetchAppNavigations, fetchTranslations } from "../data/ducks/app/actions";
import { updateUrl } from "../data/ducks/config/actions";
import { useCookies } from 'react-cookie';
import { getLanguages, getQueryString, logPageView }  from '../../utils/util';
import LanguageSelection from '../components/LanguageSelection';
import LangContext from '../helper/LangContext';

const App  = (props) => {
	const [render, setRender] = useState(false);
	const { nav, locale, match, location, history } = props;
	const [cookies, setCookies] = useCookies();
	let lang = getLanguages(match, cookies);
	let query = getQueryString(location);
	let isArticleShow = typeof location != 'undefined' && location.pathname && (location.pathname.indexOf('articleshow') != '-1' || location.pathname.indexOf('moviereview') != '-1') ? true : false;
	//console.log("app", nav);
	const handleLocationChange = () => {
		logPageView(window.location.origin + window.location.pathname + window.location.search);
	}
	useEffect(()=>{
		fetchNavigationAndTranslations();
		history.listen(handleLocationChange);
	},[]);

	const updateLanguage = (lang) => {
		fetchNavigationAndTranslations(true, lang);
	}

	

	const fetchNavigationAndTranslations = (force, lang) => {
		if(nav.length == 0 || force){
			props.fetchAppNavigations({match, cookies, lang, query});
			props.fetchTranslations({match, cookies, lang}).then(()=>{
				if(force){
					setRender(!render);
				}
			});
		}
	}

	const saveCity = (city) => {
		setCookies('city', city, {path:'/',maxAge:(3600*24*365)});
	}
	
	return (
		<>
			<Helmet
				defaultTitle="Newspoint"
				titleTemplate="%s"
				titleAttributes={{itemprop: "name", lang: "en"}}
				meta={[
					{property: "og:site_name", content: "Newspoint"},
					{name: "twitter:card", content: "summary_large_image"},
					{property: "og:title", content: "%s"},
					{property: "og:type",  content: "website"},
					{name: "viewport",  content: "width=device-width, initial-scale=1.0"},
					{name: "theme-color",  content: "#fff"},
				]}
			/>
			<LangContext.Provider value={{
					locale: props.locale,
					updateLanguage: updateLanguage,
					selectedLang: lang,
					query: query,
					saveCity: saveCity
				}}>
				{
					query.frmapp?
						<div></div>
						:
						<Header nav={nav} lang={lang} history={history} />
				}
				
			
				{/* <ErrorBoundary> */}
					{renderRoutes(props.route.routes)}
				{/* </ErrorBoundary> */}
				{
					query.frmapp || isArticleShow?
						null
						:
						<Footer nav={nav} locale={locale} lang={lang} />
				}
				<LanguageSelection history={history} updateLanguage={updateLanguage} />
			</LangContext.Provider>
		</>
	)
}



App.fetching = ({ dispatch, match, cookies, query }) => {
	return [dispatch(fetchAppNavigations({match, cookies, query})), dispatch(fetchTranslations({match, cookies}))];
}

App.defaultProps = {
	nav: []
};

const mapStateToProps = (state) => ({
	nav: state.app.nav,
	locale: state.app.locale
});

const mapDispatchToProps = {
	fetchAppNavigations,
	fetchTranslations,
	updateUrl
};

export default connect(mapStateToProps, mapDispatchToProps)(App);


