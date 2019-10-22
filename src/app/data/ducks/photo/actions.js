import { FETCH_PHOTO_LISTING, PHOTO_NEXT_LISTING, PHOTO_DETAIL, PHOTO_NEXT_DETAIL, PHOTO_FAILED, CLEAR_PHOTO_DETAIL } from "./types";
import config from './../../../../config/index';
import { hasValue } from '../../../../utils/util';

export function fetchListing({match, cookies, query}) {
    const { params } = match;
    let msid = 1;
    if(hasValue(params.msid)) msid = params.msid;

    let category = "";
    if(hasValue(params.id)) category = params.id;

    let utmSource = 'pwa';
    if(hasValue(query) && hasValue(query.utm_source)){
      utmSource = query.utm_source;
    }  
    
    let utmMedium = 'PG';
    if(hasValue(query) && hasValue(query.utm_medium)){
      utmMedium = query.utm_medium;
    }    


    let url = `/api_photolisting.cms?msid=${msid}&curpg=1&perpage=50&cat=${category}&utm_source=${utmSource}&utm_medium=${utmMedium}`;
    return {
        CALL_API: [
            {
                type: FETCH_PHOTO_LISTING,
                meta: {
                    apiDomain:`${config.API_URL}`,
                    path: url,
                    method: "GET"
                }
            }
        ]
    }
}

export function fetchNextListing({pg, match, query}) {
    const { params } = match;
    let msid = 1;
    if(hasValue(params.msid)) msid = params.msid;

    let category = "";
    if(hasValue(params.id)) category = params.id;

    let utmSource = 'pwa';
    if(hasValue(query) && hasValue(query.utm_source)){
      utmSource = query.utm_source;
    }  
    
    let utmMedium = 'PG';
    if(hasValue(query) && hasValue(query.utm_medium)){
      utmMedium = query.utm_medium;
    }    

    let curpg = (hasValue(pg) && hasValue(pg.cp) && pg.cp) || 2;
    curpg +=1;

    let url = `/api_photolisting.cms?msid=${msid}&curpg=${curpg}&perpage=50&cat=${category}&utm_source=${utmSource}&utm_medium=${utmMedium}`;

    return {
        CALL_API: [
            {
                type: PHOTO_NEXT_LISTING,
                meta: {
                    apiDomain:`${config.API_URL}`,
                    path: url,
                    method: "GET"
                }
            }
        ]
    }
}



export function fetchPhotoDetail({ match, query }) {


  const { params } = match;
  let msid = 1;
  if(hasValue(params.msid)) msid = params.msid;

  let id = 1;
  if(hasValue(params.id)) id = params.id;

  let category = "";
  if(hasValue(params.category)) category = params.category;

  let utmSource = 'pwa';
  if(hasValue(query) && hasValue(query.utm_source)){
    utmSource = query.utm_source;
  }  
  
  let utmMedium = 'PG';
  if(hasValue(query) && hasValue(query.utm_medium)){
    utmMedium = query.utm_medium;
  }    


  let url = `/api_photolisting.cms?msid=${msid}&curpg=1&perpage=50&cat=${category}&utm_source=${utmSource}&utm_medium=${utmMedium}`;
  return {
      CALL_API: [
          {
              type: FETCH_PHOTO_LISTING,
              meta: {
                  apiDomain:`${config.API_URL}`,
                  path: url,
                  method: "GET",
                  success:function(result){
                    
                    if(hasValue(result)){
                        const photo = result;
                        let listData = {};
                        let index = 0;
                        
                        if(hasValue(photo)  && hasValue(photo.items)){
                          for(let i=0;i<photo.items.length;i++) {
                            if(photo.items[i].fid == id) {
                              index = i;
                              break;
                            }
                          }    
                        }      
                        
                        let url = `/api_photoshow.cms?msid=${id}&curpg=1`;

                        return [
                            {
                                type: PHOTO_DETAIL,
                                meta: {
                                    apiDomain:`${config.API_URL}`,
                                    path: url,
                                    method: "GET",
                                    id,
                                    index,
                                    listData:photo
                                }
                            }
                        ]
                    }
                  }
              }
          }
      ]
  }
}


export function fetchNextPhotoDetail({photo, match}) {
    if(!hasValue(photo.detail[0])){
      return {type: PHOTO_FAILED};
    }
    const currentDetail = photo.detail[photo.detail.length-1];
    let curpg = 1;
    let id = 0;
    let  index = photo.index;
    if(currentDetail.pg.cp >= currentDetail.pg.tp){
      //fetch next gallery detail
      index = photo.index + 1;
      
      if(hasValue(photo.value) && hasValue(photo.value.items[index]) && photo.value.items[index].tn=='ad'){
        index++;
      }

      if(hasValue(photo.value.items[index])){
        let nextDetail = photo.value.items[index];
        id = nextDetail.fid;
      } else {
        return ({type: PHOTO_FAILED});
      }
    } else {
      //fetch same gallery detail
      curpg = currentDetail.pg.cp+1;
      id = currentDetail.fid;
    }
    
    let url = `/api_photoshow.cms?msid=${id}&curpg=${curpg}`;

    return {
      CALL_API: [
          {
              type: PHOTO_NEXT_DETAIL,
              meta: {
                  apiDomain:`${config.API_URL}`,
                  path: url,
                  method: "GET",
                  id,
                  index
              }
          }
      ]
    }    
}

export function clearPhotoDetail(){
  return {
    type: CLEAR_PHOTO_DETAIL,
  }
}