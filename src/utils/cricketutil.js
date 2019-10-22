import dateFormat from 'dateformat';
import {makeUrl} from './util';
export function roundedToFixed(_float, _digits){
  var rounder = Math.pow(10, _digits);
  return (Math.round(_float * rounder) / rounder).toFixed(_digits);
}

export function replaceTeamName(str, teamaname, teamashortname, teambname, teambshortname){
  str = str.replace(teamaname, teamashortname);
  str = str.replace(teambname, teambshortname);
  return str;
}

export function cricketUrl(item, languages){
  return  "/"+languages+"/cricket/live-score-"+makeUrl(item['$'].teama_short)+"-vs-"+makeUrl(item['$'].teamb_short)+"-"+makeUrl(item['$'].matchnumber)+"-"+makeUrl(item['$'].matchtype)+"-"+makeUrl(item['$'].seriesname)+"-"+getYear(item['$'].matchdate_ist)+"/"+item['$'].matchfile;
}

export function getYear(dt){
  let dtArr = dt.split("/");
  if(dtArr.length>0){
    return dtArr[dtArr.length-1];
  } else {
    return new Date().getYear();
  }
}

export function getNbLbClass(run){
  return run.substring(1).toLowerCase();
}

export function requiredRunRate(allottedOvers, target, currentOvers, currentRuns){
  currentOvers = parseFloat(currentOvers);
  let runRequiredToWin = parseInt(target) - parseInt(currentRuns);
  let ballsRemaining = (parseFloat(allottedOvers)*6) - (((parseInt(currentOvers)*6)+(currentOvers-parseInt(currentOvers))*10));
  let rRR = (runRequiredToWin/ballsRemaining)*6;
  if(isNaN(rRR) || rRR=='Infinity'){
    return "-";
  }
  return Math.round(rRR * 100) / 100;
}

export function matchScore(score, matchtype){
  if(typeof(score)=='undefined'){
    return "";
  }
  if(matchtype=='Test'){
    let scoreArr = score.split("(");
    if(scoreArr.length>0){
      return scoreArr[0];
    } else {
      return score;
    }
  } else {
    return score;
  }
}

export function getShortTeamName(teamname){
  let tempTeamname = teamname.toLowerCase();
  switch(tempTeamname){
    case 'australia'    : return 'AUS';
    case 'south africa' : return 'SA';
    case 'india'        : return 'IND';
    case 'afghanistan'  : return 'AFG';
    case 'scotland'     : return 'SCO';
    case 'papua new guinea'    : return 'PNG';
    case 'united arab emirates'    : return 'UAE';
    case 'new zealand'     : return 'NZ';
    case 'england'      : return 'ENG';
    case 'ireland'     : return 'IRE';
    case 'west indies'     : return 'WI';
    case 'zimbabwe'     : return 'ZIM';
    case 'delhi daredevils'     : return 'DD';
    case 'delhi capitals'     : return 'DC';
    case 'kings xi punjab'     : return 'KXIP';
    case 'kolkata knight riders'     : return 'KKR';
    case 'mumbai indians'     : return 'MI';
    case 'royal challengers bangalore'     : return 'RCB';
    case 'sunrisers hyderabad'     : return 'SRH';
    case 'rajasthan royals'     : return 'RR';
    case 'chennai super kings'     : return 'CSK';
    case 'hong kong': return 'HKG';
    case 'sri lanka': return 'SL';
    case 'bangladesh': return 'BAN';
    case 'pakistan': return 'PAK';
    case 'netherlands': return 'NED';
    case 'nepal': return 'NEP';
    case 'belgium': return 'BEL';
    case 'germany': return 'GER';
    case 'namibia': return 'NAM';
    case 'nigeria': return 'NGA';
    case 'botswana': return 'BOTSW';
    case 'uganda': return 'UGA';
    case 'kenya': return 'KEN';
    case 'ghana': return 'GHANA';
    case 'guernsey': return 'GUERN';
    case 'jersey': return 'JERSY';
    case 'norway': return 'NORWY';
    case 'sweden': return 'SWE';
    case 'czech republic': return 'CZK-R';
    case 'israel': return 'ISR';
    case 'gibraltar': return 'GIBR';
    case 'italy': return 'ITLY';
    case 'denmark': return 'DEN';
    case 'singapore': return 'SING';
    case 'malaysia': return 'MALAY';
    case 'qatar': return 'QTR';
    case 'kuwait': return 'KUWT';
    default: return teamname;
  }
}

export function bowlerEco(runs, overs){
  if((runs==0 && overs==0) || (runs=="" && overs=="")){
    return "";
  }
  return parseFloat(runs/overs).toFixed(2);  
}


export function strikeRates(runs, balls){
  if((runs==0 && balls==0) || (runs=="" && balls=="")){
    return "";
  }
  return parseFloat((runs*100)/balls).toFixed(2);
}

export function matchDateFormat(dt, tm, format, timeonly){
  let dateStrArr = dt.split("/");
  let timeStrArr = typeof(tm)!='undefined'?tm.split(":"):[];
  let matchDate = new Date(dateStrArr[2], dateStrArr[0]-1, dateStrArr[1], timeStrArr[0], timeStrArr[1], 0,0);
  if(dateFormat(Date.now(), "d-mm")==dateFormat(matchDate,"d-mm") && (typeof(timeonly)=='undefined' || timeonly==false)) {
    return "TODAY";
  }

  if(parseInt(dateFormat(Date.now(), "d"))+1==dateFormat(matchDate,"d") && dateFormat(Date.now(), "mm")==dateFormat(matchDate,"mm")  && (typeof(timeonly)=='undefined' || timeonly==false)) {
    return "TOMORROW";
  }

  if(typeof(format)!='undefined' && format!=""){
    return dateFormat(matchDate,format)+ (typeof(timeonly)!='undefined' && timeonly?' IST':'');
  } else {
    return dateFormat(matchDate,"d mmm, yyyy");
  }
}

export function matchDateTimeStamp(dt, tm){
  let dateStrArr = dt.split("/");
  let timeStrArr = tm.split(":");
  let matchDate = new Date(dateStrArr[2], dateStrArr[0]-1, dateStrArr[1], timeStrArr[0], timeStrArr[1], 0,0);  
  return matchDate.getTime();
}


export function getMatchOver(score){
  if(typeof(score)=='undefined'){
    return "";
  }
  score= score.split("(");
  if(score.length>1){
    score=score[1];
    score = score.replace(")",""); 
    return score;
  }
  return score;
}
