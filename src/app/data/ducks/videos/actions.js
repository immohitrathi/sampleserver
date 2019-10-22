import { FETCH_VIDEO_NAV, FETCH_VIDEO_LISTING, NEXT_VIDEO_LISTING } from "./types";
import config from './../../../../config/index';
import { hasValue, getLanguages } from '../../../../utils/util';

export function fetchNavigations({match, cookies}) {
    let lang = getLanguages(match, cookies);
    lang = lang.split("-").join(",");
    let url = `/api_videocats?lang=${lang}`;
    return {
        CALL_API: [
            {
                type: FETCH_VIDEO_NAV,
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

export function fetchListing({match, cookies}) {
    let lang = getLanguages(match, cookies);
    lang = lang.split("-").join(",");
    const { params } = match;
    let perpage = 20;
    let category = (hasValue(params) && hasValue(params.category) && params.category) || 'top videos';
    category = category.replace("-"," ");
    let url = `/feed/video?categories=${category}&lang=${lang}&curpg=1&perpage=${perpage}`;
    if(category === 'livetv') {
        url = `/api_livetv.cms?lang=${lang}&preflang=${lang}`;
    }
    return {
        CALL_API: [
            {
                type: FETCH_VIDEO_LISTING,
                meta: {
                    apiDomain:`${category === 'livetv' ? config.API_URL : config.NPRSS_API_URL}`,
                    path: url,
                    method: "GET",
                    category,
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
    let curpg = (hasValue(pg) && hasValue(pg.cp) && pg.cp) || 1;
    curpg +=1;
    let perpage = 20;
    let category = (hasValue(params) && hasValue(params.category) && params.category) || 'top videos';
    category = category.replace("-"," ");
    let url = `/feed/video?categories=${category}&lang=${lang}&curpg=${curpg}&perpage=${perpage}`;
    if(category === 'livetv') {
        url = `/api_livetv.cms?lang=${lang}&preflang=${lang}`;
    }
    return {
        CALL_API: [
            {
                type: NEXT_VIDEO_LISTING,
                meta: {
                    apiDomain:`${category === 'livetv' ? config.API_URL : config.NPRSS_API_URL}`,
                    path: url,
                    method: "GET",
                    category,
                    lang
                }
            }
        ]
    }
}
