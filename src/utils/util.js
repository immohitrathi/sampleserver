import ReactGA from 'react-ga';
export const languageArr=[
  {
    languageCode:'2',
    languageNameEng:'Hindi',
    languageName:'हिन्दी',
    locale: "hi",
    chooseLanguage: "भाषा चुनें",
    readNowCTA: "अभी पढ़ें",
    watch:"विडियो",
    symbol: 'अ',
    icon:'https://nprssfeeds.indiatimes.com/feeds/photo/49273035.cms'
  },
  {
    languageCode:'1',
    languageNameEng:'English',
    languageName:'English',
    locale: "en",
    chooseLanguage: "Select Language(s)",
    readNowCTA: "Read Now",
    watch:"Watch",
    symbol: 'A',
    icon:'https://nprssfeeds.indiatimes.com/feeds/photo/49273036.cms'
  },
  {
    languageCode:'8',
    languageNameEng:'Tamil',
    languageName:'தமிழ்',
    locale: "ta",
    chooseLanguage: "மொழியை தேர்வு செய்க",
    readNowCTA: "இப்போது படிக்கவும்",
    watch:"காண",
    symbol: 'அ',
    icon:'https://nprssfeeds.indiatimes.com/feeds/photo/49273037.cms'
  },
  {
    languageCode:'9',
    languageNameEng:'Telugu',
    languageName:'తెలుగు',
    locale: "te",
    chooseLanguage: "భాషను ఎంచుకోండి",
    readNowCTA: "ఇప్పుడే",
    watch:"చూడండి",
    symbol: 'అ',
    icon:'https://nprssfeeds.indiatimes.com/feeds/photo/49273043.cms'
  },
  {
    languageCode:'4',
    languageNameEng:'Bengali',
    languageName:'বাংলা',
    locale: "bn",
    chooseLanguage: "ভাষা বাছুন",
    readNowCTA: "এখনই পড়ুন",
    watch:"দেখুন",
    symbol: 'অ',
    icon:'https://nprssfeeds.indiatimes.com/feeds/photo/49273038.cms'
  },
  {
    languageCode:'5',
    languageNameEng:'Kannada',
    languageName:'ಕನ್ನಡ',
    locale: "kn",
    chooseLanguage: "ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ",
    readNowCTA: "ಈಗ ಓದಿ",
    watch:"ವೀಕ್ಷಿಸಿ",
    symbol: 'ಅ',
    icon:'https://nprssfeeds.indiatimes.com/feeds/photo/49273040.cms'
  },
  {
    languageCode:'7',
    languageNameEng:'Malayalam',
    languageName:'മലയാളം',
    locale: "ml",
    chooseLanguage: "ഭാഷ തെരഞ്ഞെടുക്കുക",
    readNowCTA: "ഇപ്പോൾ",
    watch:"വാച്ച്",
    symbol: 'അ',
    icon:'https://nprssfeeds.indiatimes.com/feeds/photo/55720339.cms'
  },
  {
    languageCode:'6',
    languageNameEng:'Gujarati',
    languageName:'ગુજરાતી',
    locale: "gu",
    chooseLanguage: "ભાષા પસંદ કરો",
    readNowCTA: "અત્યારે વાંચો",
    watch:"જુઓ",
    symbol: 'અ',
    icon:'https://nprssfeeds.indiatimes.com/feeds/photo/49273041.cms'
  },
  {
    languageCode:'3',
    languageNameEng:'Marathi',
    languageName:'मराठी',
    locale: "mr",
    chooseLanguage: "भाषा निवडा",
    readNowCTA: "आत्ता वाचा",
    watch:"पाहा",
    symbol: 'अ',
    icon:'https://nprssfeeds.indiatimes.com/feeds/photo/49273039.cms'
  },
  {
    languageCode:'10',
    languageNameEng:'Urdu',
    languageName:'اُردُو',
    locale: "ur",
    chooseLanguage: "زبان منتخب کریں",
    readNowCTA: "Read Now",
    watch:"دیکھیں",
    symbol: 'الف‬',
    icon:'https://nprssfeeds.indiatimes.com/feeds/photo/55720367.cms'
  },
  {
    languageCode:'13',
    languageNameEng:'Punjabi',
    languageName:'पंजाबी',
    locale: "pa",
    chooseLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ",
    readNowCTA: "Read Now",
    watch:"Watch",
    symbol: 'ਓ',
    icon:'https://nprssfeeds.indiatimes.com/feeds/photo/56500135.cms'
  },
  {
    languageCode:'11',
    languageNameEng:'Odia',
    languageName:'ଓଡ଼ିଆ',
    locale: "or",
    chooseLanguage: "ଭାଷା ବାଛନ୍ତୁ",
    readNowCTA: "Read Now",
    watch:"Watch",
    symbol: 'ଅ',
    icon:'https://nprssfeeds.indiatimes.com/feeds/photo/55720356.cms'
  },
  {
    languageCode:'14',
    languageNameEng:'Asamiya',
    languageName:'অসমীয়া',
    locale: "as",
    chooseLanguage: "ভাষা মনোনীত কৰক",
    readNowCTA: "Read Now",
    watch:"Watch",
    symbol: 'অ',
    icon:'https://nprssfeeds.indiatimes.com/feeds/photo/57142045.cms'
  },
  {
    languageCode:'12',
    languageNameEng:'Nepali',
    languageName:'Nepali',
    locale: "hi",
    chooseLanguage: "भाषा छान्नुहोस्",
    readNowCTA: "Read Now",
    watch:"Watch",
    symbol: 'क',
    icon:'https://nprssfeeds.indiatimes.com/feeds/photo/55707745.cms'
  }     
];


export function hasValue(v) {
  if (typeof v !== 'undefined' && v && v !== '') {
    return true;
  }
  return false;
}

export function makeUrl(url){
  url = url.split(",").join("");
  url = url.split("/").join("-");
  if(typeof(url)!='undefined' && url!=""){
    return url.split(" ").join("-").toLowerCase();
  } else return url;
}

export function createArticleUrl(item){
  if(item.lid !='undefined' && item.lid == '1'){
    let title = makeUrl(item.hl);
    title = title.replace(" ","-");
    title = title.replace(/[^a-zA-Z0-9\-]/g, "");
    return "/"+title+"/articleshow/"+item.id; 
  }else{
    return "/"+item.tn+"/articleshow/"+item.id; 
  } 
}

export function gaEvent(category,action,label) {
  /* if(typeof ga != undefined && typeof(window)!='undefined' && action != undefined && label != undefined){
    //ReactGA.event({category: category, action: action, label: label});
    ga('send','event',"MX"+category,action,label,{'dimension2': 'true'});
  }else if(typeof ga != undefined && typeof(window)!='undefined'){
    //ReactGA.event({category: category, action: action});
    ga('send','event',"MX"+category,action, "", {'dimension2': 'true'});
  } */
}

export function slugify(str) {
  const a = 'àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
  const b = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
  const p = new RegExp(a.split('').join('|'), 'g');
  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}
export function getFunniesUrl(item, language) {
  const hl = slugify(item.hl) || item.category;
  return `/${language}/funnies/${hl}/${item.tn}/${item.id}`;
}

export function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}


export function setupItemsForPerpetual(state) {
  let dataArr = state.hasOwnProperty('value') && state.value.hasOwnProperty('items') && state.value.items.length > 0 ? state.value.items.slice() : [];
  let items = [];
  for (let i = 0; i < dataArr.length; i++) {
    if ( dataArr[i].tn=='news' || dataArr[i].tn == 'movie reviews' || typeof dataArr[i].tn == 'undefined') {
      let data = Object.assign({}, dataArr[i]);
      data.index = i;
      items.push(data);
      state.value.items[i].index = items.length - 1;
    }
  }
  state.value.newsItems = items;
  return state;
}

export function hasCookie(){
  if(typeof(window)=='undefined') return false;

  var persist= true;
  do {
      var c= 'gCStest='+Math.floor(Math.random()*100000000);
      document.cookie= persist? c+';expires=Tue, 01-Jan-2030 00:00:00 GMT' : c;
      if (document.cookie.indexOf(c)!==-1) {
          document.cookie= c+';expires=Sat, 01-Jan-2000 00:00:00 GMT';
          return persist;
      }
  } while (!(persist= !persist));
  return null; 
}

export function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
export function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
export function eraseCookie(name) {   
  document.cookie = name+'=; Max-Age=-99999999;';  
}

export function getAstroDates(){
  return ['Mar 21 - Apr 20','Apr 21 - May 21','May 22 - Jun 21','Jun 22 - Jul 22','23 Jul - 22 Aug','23 Aug - 23 Sep','24 Sep - 23 Oct','24 Oct - 22 Nov','23 Nov - 21 Dec','22 Dec - 20 Jan','21 Jan - 19 Feb','20 Feb - 20 Mar'];
}

export function resizeImage(image, width){
  if(typeof(image)!='undefined' && image!=""){
    if(image.indexOf("timesofindia.indiatimes.com")>=0 || image.indexOf("photogallery.indiatimes.com")>=0){
      let imgId = getNumberFromString(image);
      if(imgId!="" && !isNaN(imgId)){
        image = "https://static.toiimg.com/thumb/msid-"+imgId+",width-"+width+",resizemode-4/np.jpg";
      }
    } else {
      image = image.replace("native=true&","");
      if(image.indexOf("?")>0){
        image = image+"&width="+width;  
      } else {
        image = image+"?width="+width;  
      }
    }
  }
  return image;
}

export function getLanguages(match, cookies, lang){
  if(hasValue(match) && hasValue(match.params) && hasValue(match.params.lang)) {
    return match.params.lang;
  } else if(hasValue(cookies) && hasValue(cookies.userLanguages)) {
    return cookies.userLanguages;
  } else {
    return lang || "english";
  }
}


export function getLanguageListings(){
  return {
    'english':'1',
    'hindi':'2',
    'tamil':'8',
    'telugu':'9',
    'bengali':'4',
    'kannada':'5',
    'malayalam':'7',
    'gujarati':'6',
    'marathi':'3',
    'urdu':'10',
    'punjabi':'13',
    'odia':'11',
    'asamiya':'14',
    'nepali':'12'
  }
}

export function getLanguageId(match, cookies, lang){
  let languages = getLanguages(match, cookies, lang);
  let langArr = languages.split("-");
  let langObj = [];
  let languageListing = getLanguageListings();
  for(let i=0;i<langArr.length;i++) {
    if(hasValue(languageListing[langArr[i]]))  {
      langObj.push(languageListing[langArr[i]]);
    }
  }
  if(langObj.length>0){
    return langObj.join(",");
  } else {
    return "1";
  }
} 

export function getPrefferedLangId(match, cookies, lang){
  let langIds = getLanguageId(match, cookies, lang);
  return langIds.split(",")[0];
}

export function getPrefferedLang(match, cookies, lang){
  let langs = getLanguages(match, cookies, lang);
  return langs.split("-")[0];
}


export function getGameUrl(item, sub){
  return typeof sub != 'undefined' && sub ? item.url.indexOf('?') != -1 ? item.url + '&sub='+sub : item.url + '?sub='+sub : item.url;//"/games/"+parseUrl(item.name)+"/"+item.code;
}


export function updateHeader(header, title, back) {
  const myEvent = new CustomEvent('updateHeader', {
    detail: {
      header,
      title,
      back
    },
  });
  window.dispatchEvent(myEvent);
}

function paramsToObject(entries) {
  let result = {}
  for(let entry of entries) { // each 'entry' is a [key, value] tupple
    const [key, value] = entry;
    result[key] = value;
  }
  return result;
}

function queryStringToJSON(search) {            
  var pairs = search.slice(1).split('&');  
  var result = {};
  pairs.forEach(function(pair) {
      pair = pair.split('=');
      result[pair[0]] = decodeURIComponent(pair[1] || '');
  });

  return JSON.parse(JSON.stringify(result));
}



export function getQueryString(location){
  if(hasValue(location) && hasValue(location.search)){
    /* var urlParams = new URLSearchParams(location.search);
    const entries = urlParams.entries();
    const params = paramsToObject(entries); */
    const params = queryStringToJSON(location.search);
    return params;
  } else {
    return {};
  }

}

export function logPageView(url){
  //if(window.location.hostname=="devmx.newspointapp.com" || window.location.hostname=="mx.newspointapp.com" || window.location.hostname=="mxstg1.newspointapp.com" || window.location.hostname=="mxstg2.newspointapp.com") {
    //ReactGA.set({'dimension2': 'true'});
    ReactGA.pageview(url);
  //} 
}

export function silentRedirect(url){
  if(typeof(window)!='undefined'){
    try{
      window.history.replaceState({}, "",url);
      window.setTimeout(()=>{
        logPageView(url);  
        //Comscore.fireComscore();   
      },0);
    }catch(ex){}
  }
}

export function  scrollToTop(){
  window.scrollTo(0,0);
}


export function elementInView(el, partial, skew) {
  skew = skew || 0;

  // Check instanceof ele
  if (!el || typeof (el) != 'object') return false;

  let top = el.offsetTop; // elem top
  let left = el.offsetLeft; // elem left
  let width = el.offsetWidth;
  let height = el.offsetHeight/2;
  let bottom = top + height; // elem bottom
  let right = left + width; // elem right

  let docViewTop = window.pageYOffset - skew;
  let docViewBottom = docViewTop + window.innerHeight + skew;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  let in_view = false;

  if (partial === true) {
    in_view = (top < docViewBottom) && (bottom > docViewTop) // todo also handle horizontal movements as elementInViewport
  } else {
    in_view = (top >= docViewTop) && (bottom <= docViewBottom) // todo also handle horizontal movements as elementInViewport
  }

  return in_view;
}
/**
 * Load javascript file on a page
 * @function js
 * @param {String} url URL of the javascript file
 * @param {Function} [callback] function to be called when js is loaded
 * @param {String} [id] id to be given to the javascript tag
 * @param {Boolean} [async] true by default, set false to load synchronously
 * @returns {HTMLElement} generated script tag element
 * 
 */
export function loadJS( url, callback, id, async ) {
  var head = document.getElementsByTagName( "head" ) ? document.getElementsByTagName( "head" )[ 0 ] : null;
  if( head ) {
    var script = document.createElement( "script" );
    var done = false; // Handle Script loading
    if( id ) {
      script.id = id;
    }
    if( async ) {
      script.async = async;
    }
    if( !url ) {
      throw new Error( "Param 'url' not defined." );
    }
    script.src = url;
    script.onload = script.onreadystatechange = function () { // Attach handlers for all browsers
      if( !script.loaded && ( !this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) ) {
        script.loaded = true;
        var endTime = new Date().getTime();
        var timeSpent = endTime - script.startTime;
        if( callback ) {
          try {
            callback();
          } catch( e ) { //to handle
            throw new Error( "logger.error", e.stack );
          }
        }
        script.onload = script.onreadystatechange = null; // Handle memory leak in IE
      }
    };
    script.startTime = new Date().getTime();
    head.appendChild( script );
    return script;
  } else {
    throw new Error( "Head Element not found. JS '" + url + "' not loaded. " );
    return null;
  }
}


export function makeRandomId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 30; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

export function generateGameUserId(cookies, setCookies){
  let gameUserId = cookies["gameUserId"];
  if(!hasValue(gameUserId)){
    gameUserId = makeRandomId();
    setCookies("gameUserId",gameUserId,{path:'/',maxAge:(3600*24*365)});
  }
  return gameUserId;
}

export function goingToPlayGame(event){
  let data = event.currentTarget.getAttribute("data-json");
  if(hasValue(localStorage) && localStorage) {
    let playedGame = localStorage.getItem("games");
    if(!hasValue(playedGame)){
      playedGame = [];
    } else {
      playedGame = JSON.parse(playedGame);
    }
    playedGame.push(data);
    playedGame = playedGame.slice(-2);
    localStorage.setItem("games",JSON.stringify(playedGame));
  }  
}

export function removeClass(elements, className){
  if(typeof(elements)=='undefined' || !elements || elements.length<=0){
    return;
  }
  for(let elem of elements){
    elem.classList.remove(className);
  }
}

export function addClass(elements, className){
  if(typeof(elements)=='undefined' || !elements || elements.length<=0){
    return;
  }  
  for(let elem of elements){
    elem.classList.add(className);
  }
}

export function cleanText(str){
  return str.replace(/<\/?[^>]+(>|$)/g, "").trim();
}

export function stripLink(str){
  if(typeof str !=="undefined" && str!==""){
    return str.replace(/<a\b[^>]*>(.*?)<\/a>/ig,"$1")
  }
  return str;
}

export function getLanguageNameById(id, match){
    const languages = getLanguages(match); 
    for (let key in languages) {
      if(languages[key] == id) {
        return key;
      }
    }
    return 'english';
}

export function getAudience(lang){
  let langObj = {
      'hindi':'crd',
      'english':'crb',
      'tamil':'crk',
      'telugu':'crl',
      'bengali':'cra',
      'kannada':'cre',
      'malayalam':'crf',
      'gujarati':'crc',
      'marathi':'crg',
      'urdu':'crb',
      'punjabi':'crj',
      'odia':'cri',
      'asamiya':'cr9',
      'nepali':'crh'
    } 

  if(langObj.hasOwnProperty(lang)){
    return langObj[lang];
  } else {
    return langObj['english'];
  }
}

export function toTitleCase(str) {
  return str.replace(
      /\w\S*/g,
      function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
  );
}

export function formatHeaderText(str){
  str = str.replace(/-/g, ' ');
  let newStr = str.toUpperCase();
  return newStr;
}

export function getDeeplinkPattern(pagetype,langCode,channel,storyid,template, item){
  switch(pagetype){
    case 'home':
      return "newspoint://open-$|$-pub=0:Across Publication-$|$-subPub="+langCode+":"+channel+"-$|$-type="+(template ? template : 'news')+"-$|$-domain=t-$|$-id="+storyid+"-$|$-pubID=1-$|$-subPubID="+item.pid;
    case 'articlelist':
      return "newspoint://open-$|$-pub=0:Across Publication-$|$-subPub="+langCode+":"+channel+"-$|$-type="+(template ? template : 'news')+"-$|$-domain=t-$|$-id="+storyid+"-$|$-pubID=1-$|$-subPubID="+item.pid;
    case 'pubhome':
      let pubstring="";
      if(typeof(item)!='undefined' && typeof(item.pid)!='undefined'){
        pubstring="-$|$-pubID="+item.pid;
      }
      return "newspoint://open-$|$-pub="+langCode+":"+channel+"-$|$-type="+(template ? template : 'news')+"-$|$-domain=t-$|$-id="+storyid+pubstring;
    case 'photolist':
      let subPubString="-$|$-pubID=1";
      let subPubId = "";
      if(typeof(item)!='undefined' && typeof(item.pubInfo)!='undefined' && typeof(item.pubInfo.pid)!='undefined') {
        subPubString="-$|$-pubID=1-$|$-subPubID="+item.pubInfo.pid;
        subPubId="-$|$-subPub="+langCode+":"+channel;
      }
      return "newspoint://open-$|$-pub=0:Across Publication"+subPubId+"-$|$-type=photo-$|$-domain=p-$|$-id="+item.fid+"-$|$-category=toi-hand-picked"+subPubString;
    case 'articleshow':
      if(isNaN(storyid)){
        let pubstring="";
        if(typeof(item)!='undefined' && typeof(item.pid)!='undefined'){
          pubstring="-$|$-pubID=1-$|$-subPubID="+item.pid;
        }
        return "newspoint://open-$|$-pub=0:Across Publication-$|$-subPub="+langCode+":"+channel+"-$|$-type="+(template ? template : 'news')+"-$|$-domain=t-$|$-id="+storyid+pubstring;
      }else{
        return "newspoint://open-$|$-pub="+langCode+":"+channel+"-$|$-type="+(template ? template : 'news')+"-$|$-domain=t-$|$-id="+storyid;
      }
    case 'watch':
      if(isNaN(storyid)){
        return "newspoint://open-$|$-pub=0:Across Publication-$|$-subPub="+langCode+":"+channel+"-$|$-type="+(template ? template : 'news')+"-$|$-domain=t-$|$-id="+storyid;
      }else{
        return "newspoint://open-$|$-pub="+langCode+":"+channel+"-$|$-type="+(template ? template : 'news')+"-$|$-domain=t-$|$-id="+storyid;
      }
    case 'videoshow':
      return "newspoint://open-$|$-pub="+langCode+":"+channel+"-$|$-type="+(template ? template : 'news')+"-$|$-domain=t-$|$-id="+storyid;
    case 'funnies':
      return "newspoint://open-$|$-pub=0:Across Publication-$|$-type=gvm-$|$-domain=t-$|$-id="+storyid+"-$|$-subtemplate="+item.tn;
    default : 
     return "newspoint://open-$|$-pub="+langCode+":"+channel+"-$|$-type="+(template ? template : 'news')+"-$|$-domain=t-$|$-id="+storyid;
  }
}

export function getMobileOperatingSystem() {
  if(typeof(navigator)=='undefined'){
    return "android";
  }
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "windows";
    }

    if (/android/i.test(userAgent)) {
        return "android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "ios";
    }

    return "unknown";
}

export function nativeAppLauncher() {
  let that = this;
  var timers = [];
  let opSystem = getMobileOperatingSystem();
  return {
    // Stop any running timers.
    clearTimers: function () {
      timers.map(clearTimeout);
      timers = [];
    },
    openApp: function (deeplink, storeURI) {
      var launcher = this;
      var storeLaunched = false;
      var gotStoreURI = "string" == typeof storeURI;
      // If this handler is part of the UI thread, i.e. the `direct` result of a user action then
      // redirecting to the App Store will happen immediately. When not part of the UI thread however,
      // the redirect will bring up an Open in App dialog. Unless there is already a dialog showing,
      // in which case the redirect dialog will wait for the currently shown dialog to be dismissed.
      gotStoreURI && timers.push(window.setTimeout(function () {
        //console.log('Launching App Store: ' + storeURI);
        storeLaunched = true;
        window.location.href = storeURI;
        //window.open(storeURI);
      }, 1000));
      opSystem == 'ios' && timers.push(window.setTimeout(function () {
        //console.log('Reloading page');
        storeLaunched && window.location.reload()
      }, 2000));
      //console.log('Launching app: ' + deeplink);
      window.location = deeplink;
    },
    // Get the deep link URI to the NP app in the store appropriate for the OS.
    // Using a deep link guarantees that the app store opens even when using an alternate browser (e.g. Puffin or Firefox)
    getStoreURI: function () {
      return "https://go.onelink.me/azoo?pid=Np_as_wap_app&c=wap_app";
    },
    // Try to launch the native app on iOS/Android. Redirect to the app store if launch fails.
    init: function () {
      var launcher = this;
      var events = ["pagehide", "blur"];
      if (opSystem == 'ios') {
        events.push("beforeunload");
      }
      //console.log("Listening window events: " + events.join(", "));
      window.addEventListener(events.join(" "), function (e) {
        //console.log("Window event: " + e.type);
        launcher.clearTimers();
      });
      if(document.getElementById('openInApp')){
        document.getElementById('openInApp').addEventListener('click', function(e) {
          if(typeof(navigator.onLine)!='undefined' && navigator.onLine==false) {
            if(document.getElementById("toastmsg")){
              document.getElementById("toastmsg").style.display='block';
              window.setTimeout(()=>{
                document.getElementById("toastmsg").style.display='none';
              },2000);
            }    
            return;          
          }
          gaEvent('Wap to App Install','Click','Article Top - View In App Button');
          let dl = e.target.getAttribute('data-href');  
          // Detach the app launcher from the UI thread so that the Open in App dialog won't be
          // interrupted when the delayed redirect to the App Store fires.
          setTimeout(function() {
            launcher.openApp.call(launcher, dl, launcher.getStoreURI());
          }.bind(this), 0)
        });
      }
    }
  }
}

export function enableNativeSharing(){
  return ['samsung','samsung_qaicon'];
}

export function replaceUtm(url, utm, type){
  if(typeof(url)=='undefined' || url=="" || typeof(utm)=='undefined' || utm==""){
    return url;
  }
  type = type || 'utm_source';
  let utmArr = url.split("&");
  for(let i=0;i<utmArr.length;i++){
    if(utmArr[i].indexOf(type)!==-1){
      let temp = utmArr[i].split("=");
      if(temp.length>=2){
        utmArr[i] = temp[0]+"="+utm;
      }
    }
  }
  return utmArr.join("&");
}


export function disablePushNotifications(){
  return ['vivo', 'tata_sky', 'samsung', 'oppo'];
}