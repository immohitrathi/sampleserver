import reducerRegistry from '../../reducerRegistry';
import { FETCH_NAVIGATION } from '../app/types';
function config(
  state = {
    appStatus:false,
    utmSource:'',
    utmMedium:'',
    utmCampaign:'',
  },
  action
) {
  switch (action.type) {       
    case FETCH_NAVIGATION:
      let query = action.meta.query;
      if(typeof(query)!='undefined' && typeof(query.frmapp)!='undefined' && query.frmapp=='yes'){
          state.appStatus = true;
      }
      if(typeof(query)!='undefined' && typeof(query.utm_source)!='undefined'){
        state.utmSource = query.utm_source;
      }
      if(typeof(query)!='undefined' && typeof(query.utm_medium)!='undefined'){
          state.utmMedium = query.utm_medium;
      }
      if(typeof(query)!='undefined' && typeof(query.utm_campaign)!='undefined'){
          state.utmCampaign = query.utm_campaign;
      } 

         
      return {
        ...state
      }       
    default:
      return state;
  }
}
reducerRegistry.register('config', config);
export default config;