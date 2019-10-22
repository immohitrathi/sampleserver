import reducerRegistry from '../../reducerRegistry';
import { POPULAR_CITIES, ALL_CITIES, FETCH_LOCATION, CITY_LISTING, CITY_NEARBY_LISTING, CITY_STATE_LISTING, CITY_NEXT_LISTING, CITY_NEXT_NEARBY_LISTING, CITY_NEXT_STATE_LISTING } from "./types";
import { hasValue } from '../../../../utils/util';

function city(
    state = {
      popular:{},
      value: {},
      langId:'1',
      cities:{},
      listing:{},
      nearby:{},
      statelisting:{},
      city:""
    },
    action
  ) {
    switch (action.type) {
      case POPULAR_CITIES:
        if(hasValue(action.payload)){
          state.popular = action.payload;
          state['langId'] = action.meta.langId;  
        }
        return {
          ...state
        } 
      case ALL_CITIES:
          if(hasValue(action.payload)){
            state.cities = action.payload;  
          }
          return {
            ...state
          } 
      case CITY_LISTING:
        if(hasValue(action.payload)){
          state.listing = action.payload; 
          state.city = action.meta.city;
        }
        return {
          ...state
        } 
      case CITY_NEARBY_LISTING:
        if(hasValue(action.payload)){
          state.nearby = action.payload; 
          state.city = action.meta.city;
        }
        return {
          ...state
        } 
      case CITY_STATE_LISTING:
        if(hasValue(action.payload)){
          state.statelisting = action.payload; 
          state.city = action.meta.city;
        }
        return {
          ...state
        }     
      case CITY_NEXT_LISTING:
        if(hasValue(action.payload)){
          state[action.meta.type].items = state[action.meta.type].items.concat(action.payload.items);
          state[action.meta.type].pg.cp = action.payload.pg.cp;
        }
        return {
          ...state
        }              
      default:
        return state;
    }
}
reducerRegistry.register('city',city);
export default city;
