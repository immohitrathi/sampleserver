import { POPULAR_CITIES, ALL_CITIES, FETCH_LOCATION, CITY_LISTING, CITY_NEARBY_LISTING, CITY_STATE_LISTING, CITY_NEXT_LISTING, CITY_NEXT_NEARBY_LISTING, CITY_NEXT_STATE_LISTING } from "./types";
import config from './../../../../config/index';
import { getPrefferedLangId, hasValue } from '../../../../utils/util';

export function fetchPopularCities({match, cookies}) {
    let langId = getPrefferedLangId(match, cookies);
    let url = `/api_fetchpopularcities.cms?lang=${langId}`;
    return {
        CALL_API: [
            {
                type: POPULAR_CITIES,
                meta: {
                    apiDomain:`${config.API_URL}`,
                    path: url,
                    method: "GET",
                    langId
                }
            }
        ]
    }
}


export function fetchAllCities({match, cookies}) {
    let langId = getPrefferedLangId(match, cookies);
    let url = `/api_fetchallcities.cms?lang=${langId}`;
    return {
        CALL_API: [
            {
                type: ALL_CITIES,
                meta: {
                    apiDomain:`${config.API_URL}`,
                    path: url,
                    method: "GET",
                    langId
                }
            }
        ]
    }
}

export function fetchLocation() {
    let url = `/api_fetchlocation`;
    return {
        CALL_API: [
            {
                type: FETCH_LOCATION,
                meta: {
                    apiDomain:`${config.API_URL}`,
                    path: url,
                    method: "GET"
                }
            }
        ]
    }
}


export function fetchCityListing({match, cookies}) {
    let langId = getPrefferedLangId(match, cookies);
    let city = match.params.city || "";
    let url = `/NPRSS/search/?lang=${langId}&searchTerm=${city}&curpg=1&perpage=10`;
    return {
        CALL_API: [
            {
                type: CITY_LISTING,
                meta: {
                    apiDomain:`${config.ENVOY_API_URL}`,
                    path: url,
                    method: "GET",
                    langId,
                    city
                }
            }
        ]
    }
}

export function fetchCityNearbyListing({match, cookies}) {
    let langId = getPrefferedLangId(match, cookies);
    let city = match.params.city || "";
    let url = `/NPRSS/search/city?lang=${langId}&searchTerm=${city}&curpg=1&perpage=4&feedFor=nearby`;
    return {
        CALL_API: [
            {
                type: CITY_NEARBY_LISTING,
                meta: {
                    apiDomain:`${config.ENVOY_API_URL}`,
                    path: url,
                    method: "GET",
                    langId,
                    city
                }
            }
        ]
    }
}

export function fetchCityStateListing({match, cookies}) {
    let langId = getPrefferedLangId(match, cookies);
    let city = match.params.city || "";
    let url = `/NPRSS/search/city?lang=${langId}&searchTerm=${city}&curpg=1&perpage=4&feedFor=state`;
    return {
        CALL_API: [
            {
                type: CITY_STATE_LISTING,
                meta: {
                    apiDomain:`${config.ENVOY_API_URL}`,
                    path: url,
                    method: "GET",
                    langId,
                    city
                }
            }
        ]
    }
}


export function fetchNextCityListing({pg, match, cookies}) {
    let langId = getPrefferedLangId(match, cookies);
    let city = match.params.city || "";
    let type = match.params.type || "listing";
    let curpg = (hasValue(pg) && hasValue(pg.cp) && pg.cp) || 1;
    curpg +=1;
    /* if(curpg > pg.tp){
        return {type:'NO_DATA'};
    } */

    let url = `/NPRSS/search/?lang=${langId}&searchTerm=${city}&curpg=${curpg}&perpage=10`;
    if(type=='nearby') {
        url = `/NPRSS/search/city?lang=${langId}&searchTerm=${city}&curpg=${curpg}&perpage=10&feedFor=nearby`;
    } else if(type=='statelisting') {
        url = `/NPRSS/search/city?lang=${langId}&searchTerm=${city}&curpg=${curpg}&perpage=10&feedFor=state`;
    }
    return {
        CALL_API: [
            {
                type: CITY_NEXT_LISTING,
                meta: {
                    apiDomain:`${config.ENVOY_API_URL}`,
                    path: url,
                    method: "GET",
                    langId,
                    city,
                    type
                }
            }
        ]
    }

}