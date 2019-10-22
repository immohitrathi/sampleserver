import { UPDATE_URL } from "./types";

export function updateUrl({ query }) {
    return {
        type: UPDATE_URL,
        meta:{
            query
        }
    }
}