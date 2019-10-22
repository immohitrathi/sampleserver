import { ASTRO_LISTING, ASTRO_DETAIL } from "./types";
import config from './../../../../config/index';
import { getPrefferedLang } from '../../../../utils/util';

export function fetchAstroListing({match, cookies}) {
    let lang = getPrefferedLang(match, cookies);
    let url = `/astrosigns/${lang}`;
    return {
        CALL_API: [
            {
                type: ASTRO_LISTING,
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

export function fetchAstroDetail({match, cookies}) {
    let lang = getPrefferedLang(match, cookies);
    let id = match.params.id || cookies["sign"] || "1";
    let url = `/horoscope/${id}/${lang}`;
    return {
        CALL_API: [
            {
                type: ASTRO_DETAIL,
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
