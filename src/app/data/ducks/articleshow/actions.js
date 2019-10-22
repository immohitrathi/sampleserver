/* eslint-disable no-else-return */
/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import config from '../../../../config';
import { getLanguages } from '../../../../utils/util';
import {
  FETCH_ARTICLE,
  NEXT_ARTICLE
} from './types';

// eslint-disable-next-line import/prefer-default-export
export function getArticleShowUrl(params, query, nextId){
    if(typeof params == 'undefined' || typeof params.id == 'undefined') {
      return null;
    }
      
    let id = nextId ? "id="+nextId : "id="+params.id;
    let movieReviewStr = "";
    if( typeof params.feedSection != 'undefined' && params.feedSection.indexOf('movie') != -1 ){
      movieReviewStr = "&mrv=1";
    }
  
    let utmSource = 'pwa';
    if(typeof(query)!='undefined' && typeof(query.utm_source)!='undefined' && query.utm_source!=""){
      utmSource = query.utm_source;
    }
    let utmMedium = 'browser';
    if(typeof(query)!='undefined' && typeof(query.utm_medium)!='undefined' && query.utm_medium!=""){
      utmMedium = query.utm_medium;
    }
    movieReviewStr = "&utm_source="+utmSource+ "&utm_medium=" + utmMedium + movieReviewStr;
  
    let apiurl = `/api_articleshow.cms?v=v1&source=pwa&${id}${movieReviewStr}`;
    
    return apiurl;  
}

export function fetchArticleShow({match, query, cookies}) {
  let lang = getLanguages(match, cookies);
  const { params } = match;
  let url = getArticleShowUrl(params, query);
  return {
      CALL_API: [
          {
              type: FETCH_ARTICLE,
              meta: {
                  apiDomain:`${config.API_URL}`,
                  path: url,
                  method: "GET",
                  lang
              }
          }
      ]
  }
}

export function fetchNextArticleShow({match, query, cookies, id}) {
  let lang = getLanguages(match, cookies);
  const { params } = match;
  let url = getArticleShowUrl(params, query, id);
  return {
      CALL_API: [
          {
              type: NEXT_ARTICLE,
              meta: {
                  apiDomain:`${config.API_URL}`,
                  path: url,
                  method: "GET",
                  lang
              }
          }
      ]
  }
}
