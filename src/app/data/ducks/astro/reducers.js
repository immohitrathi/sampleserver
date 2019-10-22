import reducerRegistry from '../../reducerRegistry';
import { ASTRO_LISTING, ASTRO_DETAIL } from "./types";
import { hasValue } from '../../../../utils/util';
function astro(
    state = {
      value: {},
      lang:'english',
    },
    action
  ) {
    switch (action.type) {
      case ASTRO_LISTING:
        if(typeof(action.payload)!='undefined'){
          state.value = action.payload;
          state['lang'] = action.meta.lang;  
        }
        return {
          ...state
        } 
      case ASTRO_DETAIL:
        if(typeof(action.payload)!='undefined') {
          state.detail = action.payload;
        }
        return {
          ...state
        }; 
      default:
        return state;
    }
}
reducerRegistry.register('astro',astro);
export default astro;
