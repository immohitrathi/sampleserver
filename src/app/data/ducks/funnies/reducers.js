import reducerRegistry from '../../reducerRegistry';
import { FUNNIES_SUCCESS, FUNNIES_SINGLE_ITEM, FUNNIES_NEXT_SUCCESS, CLEAR_FUNNIES } from './types';
import { hasValue, getFunniesUrl, cleanText } from '../../../../utils/util';

function funnies(
  state = {
    value: {items:[]},
    lang: 'english',
    head: {}
  },
  action
) {
  switch (action.type) {
    case FUNNIES_SUCCESS:
      //console.log("FUNNIES_SUCCESS", state.value.items.length);
      if(hasValue(action.payload)){
        state.value.items = state.value.items.concat(action.payload.items);
        state.value.pg = action.payload.pg;
      } 
      return {
        ...state,
        isFetching: false,
        error: false
      };
    
    case FUNNIES_SINGLE_ITEM:
      //console.log("FUNNIES_SINGLE_ITEM", action.payload);
      if(hasValue(action.payload) && hasValue(state.value.items)){
        state.value.items.unshift(action.payload);

        let head = prepareMeta(action.payload,action.meta.lang);
        state.head = head;
      } 
      return {
        ...state,
        isFetching: false,
        error: false
      };

      

    case FUNNIES_NEXT_SUCCESS:
      if(typeof(action.payload) != 'undefined' && action.payload.length > 0 && action.payload[0].hasOwnProperty('status') && action.payload[0].status.toLowerCase() == 'ok'){
        if(state.hasOwnProperty('value')){
          state.value.pg.cp = action.payload[0].pg.cp;
          state.value.items = state.value.items.concat(action.payload[0].items);
        }else{
          state.value = action.payload[0];
        }
        state.error = false;
      }else {
        state.error = true;
      }
      return {
        ...state,
        isFetching: false
      };
    case CLEAR_FUNNIES:
      state.value ={};
      return {
        ...state
      }
    default:
      return state;
  }
}


function prepareMeta(funny,lang) {
  if(funny.hasOwnProperty('id')){
    let head = Object.assign({},{});
    
    let description = cleanText(typeof(funny.Story)!='undefined'?funny.Story:'');
    head['description'] = description.substr(0,250);
    head['keywords'] = 'newspoint, funnys';
    
    let title = typeof(funny.hl)!='undefined'?funny.hl:'NewsPoint';
    head['headline'] = title;
    let url = "https://www.newspointapp.com"+getFunniesUrl(funny,lang);
    head['url'] = url;
    head['mainEntityOfPage'] = url;
    
    let image = typeof(funny.imageid)!='undefined'?funny.imageid:'https://www.newspointapp.com/img/53612457.png';
    head['image'] = image;
    head['mlogo'] = 'https://www.newspointapp.com/android-icon-36x36.png';
    head['mlogo'] = '/';
    head['meta'] = [
                    {name:'ROBOTS',content:"NOINDEX, NOFOLLOW"},
                    {property:'fb:admins',content:"556964827"},
                    {property:'fb:app_id',content:"972612469457383"},
                    {name:'tpngage:name',content:"SSM4580016100404216113TIL"},
                    {name:'google-site-verification',content:"g6NLtv2K4hVhEOYxiHNrYfEWb_EFvUcf3PmUBPNyo54"},
                    {name:'content-language',content:"en"},
                    
                    {name:'description',content:description},
                    {key:'name', name:'keywords',content:"top latest news, english news, top news, english top news, NewsPoint"},
                    {'@name':'keywords','@content':"top latest news, english news, top news, english top news, NewsPoint "},
                    {name:'article:section',content:"News"},
                    
                    {itemprop:'name',content:title+" - Newspoint"},
                    {itemprop:'description',content:description},
                    {key:'itemprop', name:'image',content:image},
                    {itemprop:'url',content:url},
                    {itemprop:'provider',content:'News Point'},
                    {name:'twitter:card',content:"summary"},
                    {name:'twitter:domain',content:"https://www.newspointapp.com/"},
                    {name:'twitter:title',content:title},
                    {name:'twitter:description',content:description},
                    {name:'twitter:image',content:image},
                    {name:'twitter:url',content:url},
                    {name:'twitter:site',content:"NP_App"},
                    {name:'twitter:creator',content:"NP_App"},
                    {property:'og:type',content:"article"},
                    {property:'og:title',content:title},
                    {property:'og:site_name',content:"News Point"},
                    {property:'og:image',content:image},
                    {property:'og:url',content:url},
                    {property:'og:description',content:description},
                    {property:'og:locale',content:"en"},
                    {property:'og:image:width',content:"600"},
                    {property:'og:image:height',content:"492"},
                    {property:'al:ios:url',content:"com.mt.deeplink://a|"},
                    {property:'al:ios:app_store_id',content:"656093141"},
                    {property:'al:ios:app_name',content:"News Point App"},
                    {property:'al:android:url',content:"mt.index.deeplink://a%7C"},
                    {property:'al:android:app_name',content:"News Point App"},
                    {property:'al:android:package',content:"com.mt.reader"},                  
                  ];
    head['title'] = title;
    head['link'] = [
                    {
                      rel: "publisher",
                      title: "News Point",
                      href: "https://plus.google.com/+newspointapp"
                    },
                    {
                      rel: "canonical",
                      href: url
                    },
                    {
                      rel: "alternate",
                      href: "android-app://com.mt.reader/mt.index.deeplink/a%7C"
                    }
                  ];
    return head;
  } else {
    return {};
  }
  
}


reducerRegistry.register('funnies', funnies);





export default funnies;
