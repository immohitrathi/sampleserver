import React, {useContext, useEffect} from 'react';
import LangContext from '../helper/LangContext';
import {getDeeplinkPattern, nativeAppLauncher} from '../../utils/util';
import Share from './Share';

export default ({ article })  => {
  const { locale, query } = useContext(LangContext);
  let deeplink = "";
  useEffect(() => {
    if(article){
      createDeeplink(article);
      nativeAppLauncher().init(); //open in app init
    }
    return () => {
      deeplink = "";
    };
  }, [article]);
  
  const getShareDetail = () => {
    let sharedata = {
     title: document.title,
     url: article.m ? article.m : location.href
    }
    return sharedata;
  }

  const createDeeplink = (article) => {
    const pagetype = "articleshow";
    let channel = "";
    if(typeof article != 'undefined' && typeof article.pn != 'undefined'){
      channel = article.pn;
    }
    deeplink = getDeeplinkPattern(pagetype, article.lid, channel, article.id, 'news');
    if(document.getElementById('openInApp')){
      document.getElementById('openInApp').setAttribute('data-href', deeplink);
    }
  }

  return (
		<div className="as-footer">
      <div className="openInapp">
        <a data-href={deeplink} id="openInApp" rel="noopener" className="aViewInApp " target="_blank">
          { typeof(locale.astro_read_on_app) != 'undefined' ? locale.astro_read_on_app : 'READ ON APP' }
        </a>
      </div>
      <div><Share utmSource={query.utm_source} utmCampaign="article" sharedata={getShareDetail} shareTitle="Newspoint" sharetext='' /></div>
    </div>
	)
}