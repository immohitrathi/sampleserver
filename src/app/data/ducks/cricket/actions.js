import {   
  CRICKET_SUCCESS, 
  POINT_SUCCESS, 
  CRICKET_DETAIL_SUCCESS, 
  NEXT_COMMENTRY_SUCCESS, 
  CRICKET_REMOVE_ERROR,
  CRICKET_SHORT_DETAIL_SUCCESS,
  CRICKET_PLAYERS_SUCCESS
} from "./types";
import config from './../../../../config/index';
import { hasValue } from '../../../../utils/util';

export function fetchCricketListing({match}) {
  let lang = match.params.lang || "english";
  let url = `/getmatchlist?lang=${lang}`;
  return {
      CALL_API: [
          {
              type: CRICKET_SUCCESS,
              meta: {
                  apiDomain:`${config.API_URL}`,
                  path: url,
                  method: "GET"
              }
          }
      ]
  }
}

export function fetchPoints({match}) {
  let lang = match.params.lang || "english";
  let url = `/iplpoints?lang=${lang}`;
  return {
      CALL_API: [
          {
              type: POINT_SUCCESS,
              meta: {
                  apiDomain:`${config.API_URL}`,
                  path: url,
                  method: "GET"
              }
          }
      ]
  }
}

export function fetchCricketDetail({match}) {
  let lang = match.params.lang || "english";
  let matchfile = match.params.matchfile;
  let url1 = `/getmatchdetail/${matchfile}?lang=${lang}`;
  return {
      CALL_API: [
          {
              type: CRICKET_DETAIL_SUCCESS,
              meta: {
                  apiDomain:`${config.API_URL}`,
                  path: url1,
                  method: "GET",
                  matchfile,
                  lang
              }
          }
      ]
  }
}


export function fetchCricketShortDetail({match}) {
  let lang = match.params.lang || "english";
  let matchfile = match.params.matchfile;
  let url = `/getmatchshortdetail/${matchfile}?lang=${lang}`;
  return {
      CALL_API: [
          {
              type: CRICKET_SHORT_DETAIL_SUCCESS,
              meta: {
                  apiDomain:`${config.API_URL}`,
                  path: url,
                  method: "GET",
                  matchfile
              }
          }
      ]
  }
}

export function fetchCricketPlayers({match}) {
  let lang = match.params.lang || "english";
  let matchfile = match.params.matchfile;
  let url = `/getmatchplayers/${matchfile}?lang=${lang}`;
  return {
      CALL_API: [
          {
              type: CRICKET_PLAYERS_SUCCESS,
              meta: {
                  apiDomain:`${config.API_URL}`,
                  path: url,
                  method: "GET",
                  matchfile
              }
          }
      ]
  }
}






export function fetchNextCommentry({match, matchd, refresh}) {
  let lang = match.params.lang || "english";
  let matchfile = match.params.matchfile;
  if(typeof(matchfile)=='undefined' || matchfile==""){
    return ;
  }
  var commentId = "";
  if(hasValue(matchd) && matchd.matchfile==matchfile){
    try{
      if(matchd.Matchdetail.commentary.detail.comm[matchd.Matchdetail.commentary.detail.comm.length-1].hasOwnProperty('detail')){
        commentId = matchd.Matchdetail.commentary.detail.comm[matchd.Matchdetail.commentary.detail.comm.length-1].detail.Id;
      } else {
        commentId = matchd.Matchdetail.commentary.detail.comm[matchd.Matchdetail.commentary.detail.comm.length-2].detail.Id;
      }      
    }catch(ex){} 
  }
  if(refresh){
    commentId="";
  }

  
  let url = `/loadcommentary/${matchfile}?lang=${lang}&id=${commentId}`;
  
  return {
      CALL_API: [
          {
              type: NEXT_COMMENTRY_SUCCESS,
              meta: {
                  apiDomain:`${config.API_URL}`,
                  path: url,
                  method: "GET",
                  refresh
              }
          }
      ]
  }

}