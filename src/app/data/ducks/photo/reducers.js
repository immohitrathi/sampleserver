import reducerRegistry from '../../reducerRegistry';
import { FETCH_PHOTO_LISTING, PHOTO_NEXT_LISTING, PHOTO_DETAIL, PHOTO_NEXT_DETAIL, PHOTO_FAILED, CLEAR_PHOTO_DETAIL } from "./types";
import { hasValue } from "../../../../utils/util";

function photo(
    state = {
        value:{},
        index: 0,
        detail: [], 
        error: false       
    },
    action
  ) {
    switch (action.type) {
      case FETCH_PHOTO_LISTING:
        if(hasValue(action.payload)){
          state.value = action.payload;
        }
        return {
          ...state
        } 

      case PHOTO_NEXT_LISTING:
        if(hasValue(action.payload)){
          state.value.items = state.value.items.concat(action.payload.items);
          state.value.pg.cp = action.curpg;
        }      
        return {
          ...state
        }  
      
      case PHOTO_DETAIL:
        if(hasValue(action.payload)){
          action.payload.fid = action.meta.id;
          state.detail = [action.payload];
          state.index = action.meta.index;
        }
        if(hasValue(action.meta.listData) && hasValue(action.meta.listData.items)) {
          state.value = action.meta.listData;
        }          
        return {
          ...state
        }   
      
      case PHOTO_NEXT_DETAIL:
        if(hasValue(action.payload)){
          if(state.index == action.meta.index) {
            state.detail[state.detail.length-1].items = state.detail[state.detail.length-1].items.concat(action.payload.items);
            state.detail[state.detail.length-1].pg.cp = action.payload.pg.cp;
          } else {
            action.payload.fid = action.meta.id;
            state.detail.push(action.payload); 
            state.index = action.meta.index;         
          }
        }
        state.error=false;
        return {
          ...state
        } 
        
      case CLEAR_PHOTO_DETAIL:
        state.detail =[];
        state.error=false;
        return {
          ...state
        }        
      
      case PHOTO_FAILED:
        state.error = true;
        return {
          ...state
        }                   
      default:
        return state;
    }
}

reducerRegistry.register('photo',photo);
export default photo;
