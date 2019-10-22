import reducerRegistry from '../../reducerRegistry';
import { FETCH_VIDEO } from "./types";
import { hasValue } from '../../../../utils/util';
function videoshow(
    state = {
        lang:'english',
        currentVideo:{}
    },
    action
  ) {
    switch (action.type) {
      case FETCH_VIDEO:
        if(hasValue(action.payload)){
          state.currentVideo = action.payload;
        }
        return {
          ...state
        } 
      default:
        return state;
    }
}
reducerRegistry.register('videoshow',videoshow);
export default videoshow;
