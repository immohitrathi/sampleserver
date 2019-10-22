import reducerRegistry from '../../reducerRegistry';
import { FETCH_VIDEO_NAV, FETCH_VIDEO_LISTING, NEXT_VIDEO_LISTING } from "./types";
import { hasValue } from '../../../../utils/util';
function videos(
    state = {
        value:{},
        lang:'english',
        category:'top videos',
        nav:{}
    },
    action
  ) {
    switch (action.type) {
      case FETCH_VIDEO_NAV:
        if(hasValue(action.payload)){
          state.nav = action.payload;
        }
        return {
          ...state
        } 
      case FETCH_VIDEO_LISTING:
        if(hasValue(action.payload)){
          state.value = action.payload;
          state.lang = action.meta.lang;
          state.category = action.meta.category;
        }
        return {
          ...state
        } 
      case NEXT_VIDEO_LISTING:
        if(hasValue(action.payload)){
          state.value.items = state.value.items.concat(action.payload.items);
          state.value.pg.cp = action.payload.pg.cp;
        }
        return {
          ...state
        }
      default:
        return state;
    }
}
reducerRegistry.register('videos',videos);
export default videos;
