import reducerRegistry from '../../reducerRegistry';
import { FETCH_NAVIGATION, FETCH_TRANSLATIONS } from "./types";

function app(
    state = {
        nav:[],
        locale:[]
    },
    action
  ) {
    switch (action.type) {
      case FETCH_NAVIGATION:
        state.nav = action.payload;
        return {
          ...state
        };
        case FETCH_TRANSLATIONS:
        state.locale = action.payload;
        return {
          ...state
        };

      default:
        return state;
    }
}
reducerRegistry.register('app',app);
export default app;
