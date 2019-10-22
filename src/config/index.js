let DOMAIN_NAME = "test.newspointapp.com";
let SITE_URL = "https://"+DOMAIN_NAME;
if(process.env.CONFIG=='stg'){
	DOMAIN_NAME = "stg.newspointapp.com"
	SITE_URL = "https://"+DOMAIN_NAME;
} else if(process.env.CONFIG=='stg1'){
	DOMAIN_NAME = "stg1.newspointapp.com"
	SITE_URL = "https://"+DOMAIN_NAME;	
} else if(process.env.CONFIG=='test'){
	DOMAIN_NAME = "test.newspointapp.com"
	SITE_URL = "https://"+DOMAIN_NAME;
} else if(process.env.NODE_ENV=='local'){
  SITE_URL = "http://localhost";
} else if(process.env.NODE_ENV=='development' || !process.env.NODE_ENV){
  DOMAIN_NAME = "localhost:3003";
	SITE_URL = "http://"+DOMAIN_NAME;
}

let config = {
  DOMAIN_NAME:DOMAIN_NAME,
  SITE_URL: SITE_URL,
  API_URL: SITE_URL+"/api",
  NPRSS_API_URL:SITE_URL+"/nprss",
  ENVOY_API_URL:SITE_URL+"/envoy",
  SEO_API_URL:SITE_URL+"/seo",
  IMAGE_URL: "https://toifeeds.indiatimes.com",
  SITE_TITLE: "NewsPoint",
  channel:'newspoint',
  API_DOMAIN:"https://api.newspointapp.com/",
  SOLR_API_DOMAIN:"https://pwanp.indiatimes.com/",
  GOOGLE_CLIENT_ID:"430931898682-okpbpm3u8ejfgr97bcfgq99qubrh3eqn.apps.googleusercontent.com",
  GRX_APP_ID: 'a82145',
  IPL_ACTIVE: true,
  GA_APP_ID: 'UA-29031733-13',
  ADS_CONFIG: {
		dfpads : {
			'home' : {
				atf:{
					id:'div-gpt-ad-8391532928852-0',name:'/7176/Newspoint_Mweb/NWP_Mweb_Home/NWP_Mweb_HP_ATF', size:[[320,50],[320,100]]
				},
				btf:{
					id:'div-gpt-ad-8391532928852-1',name:'/7176/Newspoint_Mweb/NWP_Mweb_Home/NWP_Mweb_HP_BTF',  size:[[320,50]]
				},
				fbn:{
					id:'div-gpt-ad-8391532928852-2',name:'/7176/Newspoint_Mweb/NWP_Mweb_Home/NWP_Mweb_HP_FBN',  size:[[320,50]]
				},
				mrec1:{
					id:"div-gpt-ad-8391532928852-3",name:'/7176/Newspoint_Mweb/NWP_Mweb_Home/NWP_Mweb_HP_Mrec_1',  size:[[300,250]]
				},
				mrec2:{
					id:"div-gpt-ad-8391532928852-4",name:'/7176/Newspoint_Mweb/NWP_Mweb_Home/NWP_Mweb_HP_Mrec_2',  size:[[300,250]]
				},
				mrec3:{
					id:"div-gpt-ad-8391532928852-5",name:'/7176/Newspoint_Mweb/NWP_Mweb_Home/NWP_Mweb_HP_Mrec_3', size:[[300,250]]
				},
				mrec4:{
					id:"div-gpt-ad-8391532928852-6",name:'/7176/Newspoint_Mweb/NWP_MWEB_EXIT/NWP_MWEB_Ext_Mrec', size:[[300,250]]
				},
				fbn_v:{
					id:"div-gpt-ad-8619124694926-7",name:'/7176/Newspoint_Mweb/Newspoint_Mweb_VIVO/VIVO_PG/NWP_Mweb_VIVO_PG_FBN', size:[[320,50]]
				},
				fbn_vc:{
					id:"div-gpt-ad-8619124694926-8",name:'/7176/Newspoint_Mweb/Newspoint_Mweb_VIVO_CHROME/VIVO_CHROME_PG/NWP_Mweb_VIVO_Chrome_PG_FBN', size:[[320,50]]
				},
				fbn_vls:{
					id:"div-gpt-ad-8619124694926-9",name:'/7176/Newspoint_Mweb/VIVO_LOCKSCREEN/VIVO_LockScreen_PhotoGallery/NWP_Mweb_LCK_PTG_FBN', size:[[320,50]]
				}

			} ,
			'horoscope' : {
				fbn:{
					id:'div-gpt-ad-7127619830986-0',name:'/7176/Newspoint_Mweb/NWP_Mweb_Astro/NWP_Mweb_ASTRO_FBN',  size:[[320,50]]
				},
				fbn_v:{
					id:'div-gpt-ad-7127619830986-1',name:'/7176/Newspoint_Mweb/Newspoint_Mweb_VIVO/VIVO_ASTRO/NWP_Mweb_VIVO_BWSR_ASTRO_FBN',  size:[[320,50]]
				},
				mrec1:{
					id:"div-gpt-ad-1549524858344-3",name:'/7176/Newspoint_Mweb/NWP_Mweb_Articlelist/NWP_Mweb_AL_Mrec_1',  size:[[300,250]]
				}
			} ,
			'comics' : {
				fbn:{
					id:'div-gpt-ad-1523452008055-0',name:'/7176/Newspoint_Mweb/NWP_MWEB_COMIC/NWP_MWEB_COMIC_FBN',  size:[[320,50]]
				}
			} ,
			'cricket' : {
				atf:{
					id:'div-gpt-ad-1523452008055-1',name:'/7176/Newspoint_Mweb/NWP_MWEB_SCORE/NWP_MWEB_SCO_ATF',  size:[[320,50]]
				},
				atf_wv:{
					id:'div-gpt-ad-1523452008055-2',name:'/7176/NewsPoint_App_Android/Newspoint_APP_AOS_SCORE/Newspoint_APP_AOS_SCO_WV_ATF',  size:[[320,50]]
				},
				fbn:{
					id:'div-gpt-ad-6269693103906-3',name:'/7176/Newspoint_Mweb/NWP_Mweb_Others/NWP_Mweb_OTH_FBN',size:[[320,50]]
				},
				mrec1:{
					id:"div-gpt-ad-6269693103906-4",name:'/7176/Newspoint_Mweb/NWP_Mweb_Others/NWP_Mweb_OTH_Mrec_1',size:[[300,250]]
				},
				mrec2:{
					id:"div-gpt-ad-6269693103906-5",name:'/7176/Newspoint_Mweb/NWP_Mweb_Others/NWP_Mweb_OTH_Mrec_2',size:[[300,250]]
				},
				mrec3:{
					id:"div-gpt-ad-6269693103906-6",name:'/7176/Newspoint_Mweb/NWP_Mweb_Others/NWP_Mweb_OTH_Mrec_3',size:[[300,250]]
				}
			} ,
			'articlelist' : {
				atf:{
					id:'div-gpt-ad-8619124694926-0',name:'/7176/Newspoint_Mweb/NWP_Mweb_Articlelist/NWP_Mweb_AL_ATF', size:[[320,50],[320,100]]
				},
				btf:{
					id:'div-gpt-ad-8619124694926-1',name:'/7176/Newspoint_Mweb/NWP_Mweb_Articlelist/NWP_Mweb_AL_BTF',  size:[[320,50]]
				},
				fbn:{
					id:'div-gpt-ad-8619124694926-2',name:'/7176/Newspoint_Mweb/NWP_Mweb_Articlelist/NWP_Mweb_AL_FBN',  size:[[320,50]]
				},
				mrec1:{
					id:"div-gpt-ad-1549524858344-3",name:'/7176/Newspoint_Mweb/NWP_Mweb_Articlelist/NWP_Mweb_AL_Mrec_1',  size:[[300,250]]
				},
				mrec2:{
					id:"div-gpt-ad-1549524858344-4",name:'/7176/Newspoint_Mweb/NWP_Mweb_Articlelist/NWP_Mweb_AL_Mrec_2',  size:[[300,250]]
				},
				mrec3:{
					id:"div-gpt-ad-1549524858344-5",name:'/7176/Newspoint_Mweb/NWP_Mweb_Articlelist/NWP_Mweb_AL_Mrec_3', size:[[300,250]]
				},
				mrec4:{
					id:"div-gpt-ad-8391532928852-6",name:'/7176/Newspoint_Mweb/NWP_MWEB_EXIT/NWP_MWEB_Ext_Mrec', size:[[300,250]]
				},
				fbn_v:{
					id:"div-gpt-ad-8619124694926-7",name:'/7176/Newspoint_Mweb/Newspoint_Mweb_VIVO/VIVO_PG/NWP_Mweb_VIVO_PG_FBN', size:[[320,50]]
				},
				fbn_vc:{
					id:"div-gpt-ad-8619124694926-8",name:'/7176/Newspoint_Mweb/Newspoint_Mweb_VIVO_CHROME/VIVO_CHROME_PG/NWP_Mweb_VIVO_Chrome_PG_FBN', size:[[320,50]]
				},
				fbn_samsung:{
					id:"div-gpt-ad-8391532928852-9",name:'/7176/Newspoint_Mweb/Samsung_MyGalaxy/Samsung_MyGalaxy_Photogallery/NWP_Mweb_Mygxy_PTG_FBN', size:[[320,50]]
				},
				fbn_vls:{
					id:"div-gpt-ad-8391532928852-10",name:'/7176/Newspoint_Mweb/VIVO_LOCKSCREEN/VIVO_LockScreen_PhotoGallery/NWP_Mweb_LCK_PTG_FBN', size:[[320,50]]
				}

			},
			'funnies' : {
				atf:{
					id:'div-gpt-ad-8619124694926-0',name:'/7176/Newspoint_Mweb/NWP_Mweb_Articlelist/NWP_Mweb_AL_ATF', size:[[320,50],[320,100]]
				},
				btf:{
					id:'div-gpt-ad-8619124694926-1',name:'/7176/Newspoint_Mweb/NWP_Mweb_Articlelist/NWP_Mweb_AL_BTF',  size:[[320,50]]
				},
				fbn:{
					id:'div-gpt-ad-8619124694926-2',name:'/7176/Newspoint_Mweb/NWP_Mweb_Articlelist/NWP_Mweb_AL_FBN',  size:[[320,50]]
				},
				mrec1:{
					id:"div-gpt-ad-8619124694926-3",name:'/7176/Newspoint_Mweb/NWP_Mweb_Articlelist/NWP_Mweb_AL_Mrec_1',  size:[[300,250]]
				},
				mrec2:{
					id:"div-gpt-ad-8619124694926-4",name:'/7176/Newspoint_Mweb/NWP_Mweb_Articlelist/NWP_Mweb_AL_Mrec_2',  size:[[300,250]]
				},
				mrec3:{
					id:"div-gpt-ad-8619124694926-5",name:'/7176/Newspoint_Mweb/NWP_Mweb_Articlelist/NWP_Mweb_AL_Mrec_3', size:[[300,250]]
				},
				mrec4:{
					id:"div-gpt-ad-8391532928852-6",name:'/7176/Newspoint_Mweb/NWP_MWEB_EXIT/NWP_MWEB_Ext_Mrec', size:[[300,250]]
				},
				fbn_v:{
					id:"div-gpt-ad-8619124694926-7",name:'/7176/Newspoint_Mweb/Newspoint_Mweb_VIVO/VIVO_LOL/NWP_Mweb_VIVO_LOL_FBN', size:[[320,50]]
				},
				fbn_vc:{
					id:"div-gpt-ad-8619124694926-8",name:'/7176/Newspoint_Mweb/Newspoint_Mweb_VIVO_CHROME/VIVO_CHROME_LOL/NWP_Mweb_VIVO_Chrome_LOL_FBN', size:[[320,50]]
				},
				fbn_samsung:{
					id:'div-gpt-ad-8619124694926-9',name:'/7176/Newspoint_Mweb/NWP_Mweb_Articlelist/NWP_Mweb_AL_FBN',  size:[[320,50]]
				}

			},
			'articleshow' : {
				atf:{
					id:'div-gpt-ad-9561752025251-0',name:'/7176/Newspoint_Mweb/NWP_Mweb_Articleshow/NWP_Mweb_AS_ATF', size:[[320,50],[320,100]]
				},
				btf:{
					id:'div-gpt-ad-9561752025251-1',name:'/7176/Newspoint_Mweb/NWP_Mweb_Articleshow/NWP_Mweb_AS_BTF', size:[[320,50]]
				},
				fbn:{
					id:'div-gpt-ad-9561752025251-2',name:'/7176/Newspoint_Mweb/NWP_Mweb_Articleshow/NWP_Mweb_AS_FBN', size:[[320,50]]
				},
				mrec1:{
					id:"div-gpt-ad-9561752025251-3",name:'/7176/Newspoint_Mweb/NWP_Mweb_Articleshow/NWP_Mweb_AS_Mrec_1',size:[[300,250]]
				},
				mrec2:{
					id:"div-gpt-ad-9561752025251-4",name:'/7176/Newspoint_Mweb/NWP_Mweb_Articleshow/NWP_Mweb_AS_Mrec_2',size:[[300,250]]
				},
				masthead:{
					id:"div-gpt-ad-9561752025251-5",name:'/7176/Newspoint_Mweb/NWP_Mweb_Articleshow/NWP_Mweb_AS_Masthead',size:[[300,250]]
				},
				mrec4:{
					id:"div-gpt-ad-8391532928852-6",name:'/7176/Newspoint_Mweb/NWP_MWEB_EXIT/NWP_MWEB_Ext_Mrec', size:[[300,250]]
				},
				fbn_v:{
					id:'div-gpt-ad-9561752025251-7',name:'/7176/Newspoint_Mweb/Newspoint_Mweb_VIVO/VIVO_NewsFeed/NWP_Mweb_VIVO_NF_FBN', size:[[320,50]]
				},
				fbn_vc:{
					id:'div-gpt-ad-9561752025251-8',name:'/7176/Newspoint_Mweb/Newspoint_Mweb_VIVO_CHROME/VIVO_CHROME_NewsFeed/NWP_Mweb_VIVO_Chrome_NF_FBN', size:[[320,50]]
				},
				fbn_samsung:{
					id:'div-gpt-ad-9561752025251-9',name:'/7176/Newspoint_Mweb/NWP_Mweb_Articleshow/NWP_Mweb_AS_FBN', size:[[320,50]]
				},
				fbn_vls:{
					id:'div-gpt-ad-9561752025251-10',name:'/7176/Newspoint_Mweb/VIVO_LOCKSCREEN/VIVO_LockScreen_Articleshow/NWP_Mweb_LCK_AS_FBN', size:[[320,50]]
				}

			} ,
			'photoshow' : {
				atf:{
					id:'div-gpt-ad-7132110671913-0',name:'/7176/Newspoint_Mweb/NWP_Mweb_PhotoGallery/NWP_Mweb_PTG_ATF',size:[[320,50],[320,100]]
				},
				btf:{
					id:'div-gpt-ad-7132110671913-1',name:'/7176/Newspoint_Mweb/NWP_Mweb_PhotoGallery/NWP_Mweb_PTG_BTF', size:[[320,50]]
				},
				fbn:{
					id:'div-gpt-ad-7132110671913-2',name:'/7176/Newspoint_Mweb/NWP_Mweb_PhotoGallery/NWP_Mweb_PTG_FBN', size:[[320,50]]
				},
				mrec1:{
					id:"div-gpt-ad-7132110671913-3",name:'/7176/Newspoint_Mweb/NWP_Mweb_PhotoGallery/NWP_Mweb_PTG_Mrec_1',size:[[300,250]]
				},
				mrec2:{
					id:"div-gpt-ad-7132110671913-4",name:'/7176/Newspoint_Mweb/NWP_Mweb_PhotoGallery/NWP_Mweb_PTG_Mrec_2',size:[[300,250]]
				},
				mrec3:{
					id:"div-gpt-ad-7132110671913-5",name:'/7176/Newspoint_Mweb/NWP_Mweb_PhotoGallery/NWP_Mweb_PTG_Mrec_3',size:[[300,250]]
				},
				mrec4:{
					id:"div-gpt-ad-8391532928852-6",name:'/7176/Newspoint_Mweb/NWP_MWEB_EXIT/NWP_MWEB_Ext_Mrec', size:[[300,250]]
				},
				fbn_v:{
					id:"div-gpt-ad-8391532928852-7",name:'/7176/Newspoint_Mweb/Newspoint_Mweb_VIVO/VIVO_PG/NWP_Mweb_VIVO_PG_FBN', size:[[320,50]]
				},
				fbn_vc:{
					id:"div-gpt-ad-8391532928852-8",name:'/7176/Newspoint_Mweb/Newspoint_Mweb_VIVO_CHROME/VIVO_CHROME_PG/NWP_Mweb_VIVO_Chrome_PG_FBN', size:[[320,50]]
				},
				fbn_samsung:{
					id:"div-gpt-ad-8391532928852-9",name:'/7176/Newspoint_Mweb/Samsung_MyGalaxy/Samsung_MyGalaxy_Photogallery/NWP_Mweb_Mygxy_PTG_FBN', size:[[320,50]]
				},
				fbn_vls:{
					id:"div-gpt-ad-8391532928852-10",name:'/7176/Newspoint_Mweb/VIVO_LOCKSCREEN/VIVO_LockScreen_PhotoGallery/NWP_Mweb_LCK_PTG_FBN', size:[[320,50]]
				}

			} ,
			'elections' : {
				atf:{
					id:'div-gpt-ad-2890751700280-1',name:'/7176/Newspoint_Mweb/NWP_Mweb_Election/NWP_MWEB_ELE_ATF',size:[[320,50],[320,100]]
				},
				fbn:{
					id:'div-gpt-ad-2890751700280-0',name:'/7176/Newspoint_Mweb/NWP_Mweb_Election/NWP_MWEB_ELE_FBN',size:[[320,50]]
				}
			},
			'others' : {
				atf:{
					id:'div-gpt-ad-6269693103906-0',name:'/7176/Newspoint_Mweb/NWP_Mweb_Others/NWP_Mweb_OTH_ATF',size:[[320,50],[320,100]]
				},
				btf:{
					id:'div-gpt-ad-6269693103906-1',name:'/7176/Newspoint_Mweb/NWP_Mweb_Others/NWP_Mweb_OTH_BTF',size:[[320,50]]
				},
				fbn:{
					id:'div-gpt-ad-6269693103906-2',name:'/7176/Newspoint_Mweb/NWP_Mweb_Others/NWP_Mweb_OTH_FBN',size:[[320,50]]
				},
				mrec1:{
					id:"div-gpt-ad-6269693103906-3",name:'/7176/Newspoint_Mweb/NWP_Mweb_Others/NWP_Mweb_OTH_Mrec_1',size:[[300,250]]
				},
				mrec2:{
					id:"div-gpt-ad-6269693103906-4",name:'/7176/Newspoint_Mweb/NWP_Mweb_Others/NWP_Mweb_OTH_Mrec_2',size:[[300,250]]
				},
				mrec3:{
					id:"div-gpt-ad-6269693103906-5",name:'/7176/Newspoint_Mweb/NWP_Mweb_Others/NWP_Mweb_OTH_Mrec_3',size:[[300,250]]
				},
				mrec4:{
					id:"div-gpt-ad-8391532928852-6",name:'/7176/Newspoint_Mweb/NWP_MWEB_EXIT/NWP_MWEB_Ext_Mrec', size:[[300,250]]
				},
				fbn_v:{
					id:'div-gpt-ad-6269693103906-7',name:'/7176/Newspoint_Mweb/NWP_Mweb_Others/NWP_Mweb_OTH_FBN',size:[[320,50]]
				},
				fbn_vc:{
					id:'div-gpt-ad-6269693103906-8',name:'/7176/Newspoint_Mweb/NWP_Mweb_Others/NWP_Mweb_OTH_FBN',size:[[320,50]]
				}

			},
			'watch' : {
				atf:{
					id:'div-gpt-ad-1476036324568-0',name:'/7176/Newspoint_Mweb/NWP_Mweb_Video/NWP_Mweb_VIDEO_ATF',  size:[[320,50]]
				},
				mrec1:{
					id:"div-gpt-ad-1549524858344-3",name:'/7176/Newspoint_Mweb/NWP_Mweb_Articlelist/NWP_Mweb_AL_Mrec_1',  size:[[300,250]]
				},
			}
    }
  }
};

export default config;
