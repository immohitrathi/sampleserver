import { FETCH_LISTING, NEXT_LISTING } from "./types";
import config from './../../../../config/index';
import { hasValue, getLanguages } from '../../../../utils/util';

export function fetchListing({match, cookies}) {
    let lang = getLanguages(match, cookies);
    lang = lang.split("-").join(",");
    const { params } = match;
    let feedSection = (hasValue(params) && hasValue(params.feedSection) && params.feedSection) || 'top-news';
    let url = `/api_listing.cms?v=v1&source=pwa&curpg=1&section=${feedSection}&lang=${lang}&pp=20`;
    return {
        CALL_API: [
            {
                type: FETCH_LISTING,
                meta: {
                    apiDomain:`${config.API_URL}`,
                    path: url,
                    method: "GET",
                    feedSection,
                    lang
                }
            }
        ]
    }
}

export function fetchNextListing({pg, match, cookies}) {
    let lang = getLanguages(match, cookies);
    lang = lang.split("-").join(",");
    const { params } = match;
    let feedSection = (hasValue(params) && hasValue(params.feedSection) && params.feedSection) || 'top-news';
    
    
    let curpg = (hasValue(pg) && hasValue(pg.cp) && pg.cp) || 1;
    curpg +=1;
    let url = `/api_listing.cms?v=v1&source=pwa&curpg=${curpg}&section=${feedSection}&lang=${lang}&pp=20`;
    console.log(url);
    return {
        CALL_API: [
            {
                type: NEXT_LISTING,
                meta: {
                    apiDomain:`${config.API_URL}`,
                    path: url,
                    method: "GET",
                    feedSection,
                    lang
                }
            }
        ]
    }
}
