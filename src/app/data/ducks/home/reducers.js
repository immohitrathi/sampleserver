import reducerRegistry from '../../reducerRegistry';
import { FETCH_LISTING, NEXT_LISTING } from "./types";
import { hasValue ,setupItemsForPerpetual } from '../../../../utils/util';
function home(
    state = {
        value:{},
        feedSection:'top-news',
        lang:'english'
    },
    action
  ) {
    switch (action.type) {
      case FETCH_LISTING:
        if(hasValue(action.payload)){
          state.value = action.payload;
          state = setupItemsForPerpetual(state);
          state.feedSection = action.meta.feedSection;
          state.lang = action.meta.lang;
        }
        return {
          ...state
        } 
      case NEXT_LISTING:
        if(hasValue(action.payload)){
          state.value.items = state.value.items.concat(action.payload.items);
          state.value.pg.cp = action.payload.pg.cp;
          state = setupItemsForPerpetual(state);
        }
        return {
          ...state
        }
      default:
        return state;
    }
}
reducerRegistry.register('home',home);
export default home;
