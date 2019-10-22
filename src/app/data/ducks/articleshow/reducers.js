/* eslint-disable comma-dangle */
import reducerRegistry from '../../reducerRegistry';
import {hasValue} from '../../../../utils/util';
import {
  FETCH_ARTICLE,
  NEXT_ARTICLE
} from './types';

function articleshow(
  state = {
    isFetching: false,
    error: false,
    section:'topnews',
    index:0,
    feedSection:'top-news',
    items: []
  },
  action
) {
  switch (action.type) {
    case FETCH_ARTICLE:
      if (typeof action.payload != 'undefined' && action.payload.hasOwnProperty('status') && action.payload.status.toLowerCase() == 'ok') {
        state.items = []; // empty storylist items 
        action.payload.fetched = false;
        state.items = state.items.concat(action.payload);
        state.error = false;
      } else {
        state.error = true;
      }
      return {
        ...state,
        isFetching: false
      };
    case NEXT_ARTICLE:
      let item = action.payload;
      state.items[state.items.length -1].fetched = true;
      if(typeof item != 'undefined' && item && item.hasOwnProperty('status') && item.status.toLowerCase() == 'ok') {
        state.items = state.items.concat(item);
      }
      return {
        ...state,
        isFetching: false,
        error: false
      };
    default:
      return state;
  }
}
reducerRegistry.register('articleshow', articleshow);

export default articleshow;
