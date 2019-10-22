import { GAMES_LISTING, GAMES_CATEGORY, GAMES_NEXT_LISTING } from "./types";
import config from './../../../../config/index';
import { hasValue } from '../../../../utils/util';

export function fetchListing() {
    let url = `/games-home`;
    return {
        CALL_API: [
            {
                type: GAMES_LISTING,
                meta: {
                    apiDomain:`${config.API_URL}`,
                    path: url,
                    method: "GET"
                }
            }
        ]
    }
}

export function fetchCategory({match}) {
    let category = match.params.category || "";
    let url = `/gamescat/${category}`;
    return {
        CALL_API: [
            {
                type: GAMES_CATEGORY,
                meta: {
                    apiDomain:`${config.API_URL}`,
                    path: url,
                    method: "GET",
                    category
                }
            }
        ]
    }
}


export function fetchNextCategoryListing({pg, match}) {
    let category = match.params.category || "";
    
    
    let curpg = (hasValue(pg) && hasValue(pg.cp) && pg.cp) || 1;
    curpg +=1;
    let url = `/gamescat/${category}?pg=${curpg}`;

    return {
        CALL_API: [
            {
                type: GAMES_NEXT_LISTING,
                meta: {
                    apiDomain:`${config.API_URL}`,
                    path: url,
                    method: "GET",
                    category
                }
            }
        ]
    }
}