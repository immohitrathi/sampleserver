import reducerRegistry from '../../reducerRegistry';
import { GAMES_LISTING, GAMES_CATEGORY, GAMES_NEXT_LISTING } from "./types";
import { hasValue } from '../../../../utils/util';
function games(
    state = {
        value:{},
        category:'',
        listing:{}
    },
    action
  ) {
    switch (action.type) {
      case GAMES_LISTING:
        if(hasValue(action.payload)){
          state.value = action.payload;
        }
        return {
          ...state
        } 
      case GAMES_CATEGORY:
        if(hasValue(action.payload)){
          state.listing = action.payload;
          state.category = action.meta.category;
        }
        return {
          ...state
        } 
      case GAMES_NEXT_LISTING:
        if(hasValue(action.payload)){
          state.listing.games = state.listing.games.concat(action.payload.games);
          state.listing.pg.cp = action.payload.pg.cp;
        }
        return {
          ...state
        }
      default:
        return state;
    }
}
reducerRegistry.register('games',games);
export default games;
