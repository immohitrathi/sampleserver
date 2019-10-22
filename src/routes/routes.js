import React from 'react';
import App from "../app/containers/App";
import { 	
	Home, 
	Videos, 
	Photos, 
	PhotoDetail, 
	Astro, AstroDetail, 
	Cricket, 
	CricketScoreCard, 
	CricketDetail, 
	Gaana, 
	Games, 
	Funnies,
	GamesCategory,
	ArticleShow,
	Local,
	LocalSearch,
	LocalCity,
	LocalCityDetail,
	VideoShow,
	More,
	Loot
} from "./splitcomponent";
	
import NotFound from "../app/containers/NotFound";

const routes = [
	{
		component: App,
		routes: [
			{
				path: "/",
				component: Home,
				exact: true,
			},
			{
				path: "/gaana",
				component: Gaana,
				exact: true,
			},
			
			{
				path: "/games/:category",
				component: GamesCategory,
				exact: true,
			},
			{
				path: "/games",
				component: Games,
				exact: true,
			},
			{
				path: "/:lang/more",
				component: More,
				exact: true,
			},
			{
				path: "/loot/:page/:lang?/:ssoid?",
				component: Loot,
				exact: true,
			},

			{
				path: "/tp/:page/:lang?",
				component: Loot,
				exact: true,
			},
			{
				path: "/:lang/funnies/:title/:type/:id",
				component: Funnies,
				exact: true
			},
			{
				path: "/:lang/funnies",
				component: Funnies,
				exact: true,
			},
			{
				path: "/:lang-news/photos-news",
				component: Photos,
				exact: true,
			},
			{
				path: "/:lang-news/cricket/:tab",
				component: Cricket,
				exact: true,
			},
			{
				path: "/:lang/cricket/live-score-*/:matchfile",
				component: CricketDetail,
				exact: true
			},
			{
				path: "/:lang/cricket/live-scorecard-*/:matchfile",
				component: CricketScoreCard,
				exact: true
			},
			{
				path: "/:lang-news/horoscope-news/:id/:type",
				component: AstroDetail,
				exact: true,
			},
			{
				path: "/:lang-news/horoscope-news",
				component: Astro,
				exact: true,
			},
			{
				path: "/:lang-news/local-news/search",
				component: LocalSearch,
				exact: true,
			},
			{
				path: "/:lang-news/local-news/:city",
				component: LocalCity,
				exact: true,
			},
			{
				path: "/:lang-news/local-news/:city/:type",
				component: LocalCityDetail,
				exact: true,
			},
			{
				path: "/:lang-news/local-news",
				component: Local,
				exact: true,
			},
			{
				path: "/:lang-news",
				component: Home,
				exact: true,
			},
			{
				path: "/:lang-news/:feedSection-news",
				component: Home,
				exact: true,
			},
			{
				path: "/:lang/videos/:category",
				component: Videos,
				exact: true,
			},
			{
				path: "/:lang/videos/:channel/:category/videoshow/:id",
				component: VideoShow,
				exact: true,
			},
			{
				path: "/news/photoshow/:id",
				component: PhotoDetail,
				exact: true,
			},
			{
				path: "/:lang-news/publisher-:channelkey/:feedSection/articleshow/:id",
				component: ArticleShow,
				exact: true,
			},
			{
				path: "/:lang-news/publisher-:channelkey/:feedSection/*/articleshow/:id",
				component: ArticleShow,
				exact: true,
			},
			{
				path: "/:lang-news/publisher-:channelkey/:feedSection/moviereview/:id",
				component: ArticleShow,
				exact: true,
			},
			{
				path: "/:lang-news/publisher-:channelkey/:feedSection/*/moviereview/:id",
				component: ArticleShow,
				exact: true,
			},
			{
				path: "/:country/:channel/:lang/:feedSection/articleshow/:id",
				component: ArticleShow,
				exact: true,
			},
			{
				path: "/:country/:channel/:lang/:feedSection/*/articleshow/:id",
				component: ArticleShow,
				exact: true,
			},
			{
				path: "/:country/:channel/:lang/:feedSection/moviereview/:id",
				component: ArticleShow,
				exact: true,
			},
			{
				path: "/:country/:channel/:lang/:feedSection/*/moviereview/:id",
				component: ArticleShow,
				exact: true,
			},
			{
				path: "/*/articleshow/:id",
				component: ArticleShow,
				exact: true,
			},
			{
				path: "/*/moviereview/:id",
				component: ArticleShow,
				exact: true,
			},
			{
				component: NotFound
			}
		]
	}
];

export default routes;