import { FUNNIES_SUCCESS, FUNNIES_SINGLE_ITEM, FUNNIES_NEXT_SUCCESS, CLEAR_FUNNIES } from './types';
import config from './../../../../config/index';
import { hasValue, getLanguageId , getPrefferedLang } from '../../../../utils/util';
import fetch from '../../utils/fetch';

export function fetchFunniesListing({match, cookies}) {
    const { params } = match;
    let curpg = 1;
    const langId = getLanguageId(match, cookies);
    const lang = getPrefferedLang(match, cookies);
    const id = params.id || null;
    const type = params.type || null;
    let detailUrl = null;
    let utmSource = 'pwa';
    let utmMedium = 'funnies';
    if (id && type) {
        switch (type) {
            case 'meme':
            detailUrl = `/funnies/meme/${id}`;
            break;
            case 'gif':
            detailUrl = `/funnies/gif/${id}`;
            break;
            case 'video':
            detailUrl = `/funnies/video/${id}`;
            break;
            default:
            detailUrl = `/funnies/meme/${id}`;
        }
    }
    const url = `/funnies?perpage=20&lang=${langId}&curpg=${curpg}&utm_source=${utmSource}&utm_medium=${utmMedium}`;
    return {
        CALL_API: [
            {
                type: FUNNIES_SUCCESS,
                meta: {
                    apiDomain:`${config.API_URL}`,
                    path: url,
                    method: "GET",
                    lang
                }
            },
            hasValue(detailUrl)?
            {
                type: FUNNIES_SINGLE_ITEM,
                meta: {
                    apiDomain:`${config.API_URL}`,
                    path: detailUrl,
                    method: "GET",
                    lang
                }
            }
            :null
        ]
    }    
}



export function fetchNextFunniesListing({pg, match, cookies, query}) {
    let langId = getLanguageId(match, cookies);
    const { params } = match;
    let curpg = (hasValue(pg) && hasValue(pg.cp) && pg.cp) || 1;
    curpg = parseInt(curpg);
    curpg +=1;

    let utmSource = 'pwa';
    if(typeof(query)!='undefined' && typeof(query.utm_source)!='undefined'){
      utmSource = query.utm_source;
    }
    let utmMedium = 'funnies';
    if(typeof(query)!='undefined' && typeof(query.utm_medium)!='undefined'){
      utmMedium = query.utm_medium;
    }    

    let url = `/funnies?lang=${langId}&curpg=${curpg}&utm_source=${utmSource}&utm_medium=${utmMedium}`;


    return {
        CALL_API: [
            {
                type: FUNNIES_NEXT_SUCCESS,
                meta: {
                    apiDomain:`${config.API_URL}`,
                    path: url,
                    method: "GET"
                }
            }
        ]
    }
}

export function clearFunnies(){

}

export function updateLikesCount(type,id,count) {
    let apiUrl = `${config.API_URL}/updatelikescount?type=${type}&id=${id}&count=${count}&t=`+Date.now();
    return fetch(apiUrl);
}