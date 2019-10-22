import { FETCH_VIDEO } from "./types";
import config from './../../../../config/index';
import { hasValue, getLanguages } from '../../../../utils/util';

export function fetchVideo({match, cookies}) {
    const {params} = match;
    let lang = getLanguages(match, cookies);
    lang = lang.split("-").join(",");
    let id = hasValue(params) && hasValue(params.id) && params.id;
    let url = `/feed/videodetail?id=${id}`;
    return {
        CALL_API: [
            {
                type: FETCH_VIDEO,
                meta: {
                    apiDomain:`${config.NPRSS_API_URL}`,
                    path: url,
                    method: "GET",
                    lang
                }
            }
        ]
    }
}