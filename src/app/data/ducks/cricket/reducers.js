import reducerRegistry from '../../reducerRegistry';
import {
  CRICKET_SUCCESS,
  POINT_SUCCESS,
  CRICKET_DETAIL_SUCCESS,
  NEXT_COMMENTRY_SUCCESS,
  CRICKET_REMOVE_ERROR,
  CRICKET_SHORT_DETAIL_SUCCESS,
  CRICKET_PLAYERS_SUCCESS
} from './types';
import { hasValue } from "../../../../utils/util";

let matched = false;

function cricket(
  state = {
    value: {},
    points: {},
    live: {},
    matchd: {},
    commentary: {},
    cUpdate:false,
    error:false,
    errorDetail:false,
  },
  action
) {
  switch (action.type) {      
    
    case CRICKET_SUCCESS:
      if(typeof(action.payload)!='undefined'){
        state.value = action.payload;
      }
      state.error = state.errorDetail = false;
      return {
        ...state
      } 
    case POINT_SUCCESS:
      if(hasValue(action.payload) && hasValue(action.payload[0])){
        state.points = action.payload[0];
      }
      state.error = state.errorDetail = false;
      return {
        ...state
      } 
    case CRICKET_DETAIL_SUCCESS:
      state.error = state.errorDetail = false;
      if(typeof(state.matchd)!='undefined' && state.matchd.hasOwnProperty("Matchdetail") && state.matchd['matchfile']==action.matchfile && action.refresh!='1'){
        for(let key of  Object.keys(action.payload['Matchdetail'])){
          if(key!='commentary'){
            state.matchd['Matchdetail'][key] = action.payload['Matchdetail'][key];
          }
        }
      } else {
        if(typeof(action)!='undefined' && typeof(action.payload)!='undefined'){
          state.matchd = action.payload;
          state.matchd['lang'] = action.meta.lang;
          state.matchd['matchfile'] = action.meta.matchfile;  
        } 
      }
      //state.matchd['players'] = action.players;
      state.errorDetail = action.error;
      return {
        ...state
      };  
      
    case CRICKET_SHORT_DETAIL_SUCCESS:
      if(!hasValue(state.matchd['Matchdetail'])) {
        state.matchd = action.payload;
        state.matchd['matchfile'] = action.meta.matchfile; 
      }
      return {
        ...state
      };
    case CRICKET_PLAYERS_SUCCESS:
      //state.error = state.errorDetail = false;
      state.matchd['players'] = action.payload;
      state.matchd['matchfile'] = action.meta.matchfile; 
      return {
        ...state
      };  
      
    case NEXT_COMMENTRY_SUCCESS:
      if(hasValue(state.matchd.Matchdetail) && !hasValue(state.matchd.Matchdetail.commentary)) {
        state.matchd.Matchdetail['commentary'] = {'detail':{comm:[]}}
      }
      try{
        if(action.refresh) {
          state.matchd.Matchdetail.commentary.detail.comm = action.payload.commentary.detail.comm;
        } else {
          state.matchd.Matchdetail.commentary.detail.comm = state.matchd.Matchdetail.commentary.detail.comm.concat(action.payload.commentary.detail.comm);
        }
        
        state.error = action.error;
      }catch(ex){}     
      return {
        ...state,
      }; 
    case CRICKET_REMOVE_ERROR:
      state.error = state.errorDetail = false;
      return {
        ...state
      }      
    default:
      return state;
  }
}

reducerRegistry.register('cricket',cricket);
export default cricket;
