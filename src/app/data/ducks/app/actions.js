import { FETCH_NAVIGATION, FETCH_TRANSLATIONS } from "./types";
import config from './../../../../config/index';
import { hasValue, getLanguageId, getPrefferedLangId } from '../../../../utils/util';

export function fetchAppNavigations({match, cookies, lang, query}) {
    let langIds = getLanguageId(match, cookies, lang);
    let prefLang = getPrefferedLangId(match, cookies, lang);
    return {
        CALL_API: [
            {
                type: FETCH_NAVIGATION,
                meta: {
                    apiDomain:config.API_URL,
                    path: `/api_hamburger.cms?langid=${langIds}&preflang=${prefLang}`,
                    method: "GET",
                    query
                }
            }
        ]
    }
}

export function fetchTranslations({match, cookies, lang}) {
    lang = getLanguageId(match, cookies, lang);
    lang = lang || "1";
    lang = lang.split(",")[0];
    return {
        CALL_API: [
            {
                type: FETCH_TRANSLATIONS,
                meta: {
                    apiDomain:config.NPRSS_API_URL,
                    path: `/feeds/applangtext.cms?version=511&platform=android&langcode=${lang}`,
                    method: "GET",
                }
            }
        ]
    }
}