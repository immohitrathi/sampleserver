import React from 'react';
import Loadable from 'react-loadable';
import loading from './Loading';

export const Home = Loadable({
	loader: () => import( /* webpackChunkName: "home" */ '../app/containers/Home'),
	loading
});

export const Videos = Loadable({
	loader: () => import( /* webpackChunkName: "videos" */ '../app/containers/Videos'),
	loading
});

export const VideoShow = Loadable({
	loader: () => import( /* webpackChunkName: "videoshow" */ '../app/containers/VideoShow'),
	loading
});

export const Photos = Loadable({
	loader: () => import( /* webpackChunkName: "photos" */ '../app/containers/Photos'),
	loading
});

export const PhotoDetail = Loadable({
	loader: () => import( /* webpackChunkName: "photod" */ '../app/containers/PhotoDetail'),
	loading
});

export const Astro = Loadable({
	loader: () => import( /* webpackChunkName: "astro" */ '../app/containers/Astro'),
	loading
});

export const AstroDetail = Loadable({
	loader: () => import( /* webpackChunkName: "astrod" */ '../app/containers/AstroDetail'),
	loading
});

export const Cricket = Loadable({
	loader: () => import( /* webpackChunkName: "cricket" */ '../app/containers/Cricket'),
	loading
});

export const CricketScoreCard = Loadable({
	loader: () => import( /* webpackChunkName: "cricketscorecard" */ '../app/containers/CricketScoreCard'),
	loading
});

export const CricketDetail = Loadable({
	loader: () => import( /* webpackChunkName: "cricketdetail" */ '../app/containers/CricketDetail'),
	loading
});

export const Gaana = Loadable({
	loader: () => import( /* webpackChunkName: "gaana" */ '../app/containers/Gaana'),
	loading
});

export const Games = Loadable({
	loader: () => import( /* webpackChunkName: "games" */ '../app/containers/Games'),
	loading
});

export const GamesCategory = Loadable({
	loader: () => import( /* webpackChunkName: "gamesc" */ '../app/containers/GamesCategory'),
	loading
});

export const Funnies = Loadable({
	loader: () => import( /* webpackChunkName: "funnies" */ '../app/containers/Funnies'),
	loading
});

export const ArticleShow = Loadable({
	loader: () => import( /* webpackChunkName: "article" */ '../app/containers/ArticleShow'),
	loading
});

export const More = Loadable({
	loader: () => import( /* webpackChunkName: "more" */ '../app/containers/More'),
	loading
});

export const Local  = Loadable({
	loader: () => import( /* webpackChunkName: "local" */ '../app/containers/Local'),
	loading
});

export const LocalSearch  = Loadable({
	loader: () => import( /* webpackChunkName: "localsearch" */ '../app/containers/LocalSearch'),
	loading
});

export const LocalCity  = Loadable({
	loader: () => import( /* webpackChunkName: "localcity" */ '../app/containers/LocalCity'),
	loading
});

export const LocalCityDetail  = Loadable({
	loader: () => import( /* webpackChunkName: "localcityd" */ '../app/containers/LocalCityDetail'),
	loading
});

export const Loot  = Loadable({
	loader: () => import( /* webpackChunkName: "loot" */ '../app/containers/loot/Loot'),
	loading
});
