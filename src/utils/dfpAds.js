import {loadJS, gaEvent} from './util';


const gpturl = 'https://www.googletagservices.com/tag/js/gpt.js';

let _dummywapads = {
    atf:{
        id:'div-gpt-ad-9561752025251-0',name:'/7176/TOI_App_Test/TOI_App_Test_ATF',size:[[320,50]]
    },
    btf:{
        id:'div-gpt-ad-9561752025251-1',name:'/7176/TOI_App_Test/TOI_App_Test_BTF',size:[[320,50]]
    },
    fbn:{
        id:'div-gpt-ad-9561752025251-2',name:'/7176/TOI_App_Test/TOI_App_Test_FBN',size:[[320,50]]
    },
    mrec1:{
        id:"div-gpt-ad-9561752025251-3",name:'/7176/TOI_App_Test/TOI_App_Test_Mrec1',size:[[300,250]]
    },
    mrec2:{
        id:"div-gpt-ad-9561752025251-4",name:'/7176/TOI_App_Test/TOI_App_Test_Mrec2',size:[[300,250]]
    }
}

let default_config = {
    isSlotrenderEndedAttached:false,
    currentIndex:0,
    position : 0,
    defSlots: [
    	[320, 50],
    	[468, 60],
    	[728, 90]
    ],
    resizeAdInfo: {
      
        'fbn': {
            resize: () => {
              var fbnHeight = document.querySelector('.ad1.fbn') ? document.querySelector('.ad1.fbn').clientHeight: 0;
              var footElem = document.querySelector('[data-node="footer"]');
              //check to fix extra space below footer when ad not visible
              if(footElem && fbnHeight > 0) footElem.style.marginBottom = fbnHeight;
            }
        },
        'btf': {
            resize: () => {
                var footElem = document.querySelector('[data-node="footer"]');
                if(footElem) footElem.style.marginTop = '10px';
            }
        },
        'mtf': {
            // add border if in middle of news list
            resize: () => {addBorder('div.ad1.mtf'); }
        }
    
    }
}

let mod_wapads = {adSlots:{}};
//let googletag = {cmd:[]};

const addBorder = (selector) => {
	if(document.querySelector(selector).queryAll('div').style.display !== 'none'){
		document.querySelector(selector).classList.add('news');
	}
}

/*  loading google ad js from google site
 * then push defineAdSlots & createAds
 */
const loadGoogleAdJs =  (item,_options) => {
    // window.setTimeout(()=>{
      	if (googletag && googletag.apiReady) {
        	googletag.cmd.push(defineAdSlots.bind(this,item,_options));
        	if(!mod_wapads.config.isSlotrenderEndedAttached){
                mod_wapads.config.isSlotrenderEndedAttached = true;
                googletag.pubads().addEventListener('slotRenderEnded',(event) => {
                    if (event && event.slot) {
                        let slotName = event.slot.getAdUnitPath().toLowerCase();
                        
                        //fire ad ga for atf slot rendered
                        if(slotName.indexOf('_atf') >= 0){
                            gaEvent('adtracker', document.location.pathname , event.isEmpty ? 'atf_empty' : 'atf_filled') 
                        }

                        for (let i in mod_wapads.config.resizeAdInfo) {
                            if (slotName.indexOf(i) != -1) {
                            mod_wapads.config.resizeAdInfo[i].resize();
                            break;
                            }
                        }  
                        
                        let adUnit = document.getElementById(event.slot.getSlotElementId());
                        let adUnitParent = adUnit ? adUnit.parentElement : undefined;
                        
                        if(adUnitParent){
                            adUnitParent.style.display = event.isEmpty ? 'none' : 'block';
                            
                        }
                    }
                })
            }

            //start creating ads div on gpt sequence , removed from here and moved to defineAds sequence
            // googletag.cmd.push(createAds.bind(this,item));
		}
    // },1000);
}

/**
 * creating ads div for the page
 *{'ATF':{id:'div-gpt-ad-1394689654028-3','name':'/7176/TOI_MWeb/TOI_MWeb_Home/TOI_MWeb_HP_PT_MTF'}}
 * @param elem : will come for the articleshow with perpetual scroll
 */
const createAds = (elem , adtype) => { 
    // let elems = elem ? ((typeof elem === 'string') ? [document.getElementById(elem)] : [elem] ): document.querySelectorAll('[data-adtype]') ;
    // let elems = document.querySelectorAll('[data-adtype]');
    let el =  elem;
    // for(let el of elems) {
        if(el){
            // let ad = el.getAttribute('data-adtype') ? el.getAttribute('data-adtype').toLowerCase() : null;
            let ad = adtype && adtype != '' ? adtype.toLowerCase() : null;
            let v = mod_wapads.wapads[ad];

            if( !v || v == '' ){
                v = { "id" : el.getAttribute('data-id')}
            }else{
                //FIX for settimeout making display the last div id in case of multiple same type of ads.
                if(v['id'] != el.getAttribute('data-id')) {
                    v['id'] = el.getAttribute('data-id');
                }
            }

            // if(!v['id'] || v['id'] == '')continue;
            if(!v['id'] || v['id'] == '')return false;

            let tmpScript = document.createElement('script');
            tmpScript.type = 'text/javascript';
            let divElem =  document.createElement('div');
            divElem.setAttribute('id', v['id']);
            divElem.appendChild(tmpScript);

            el.appendChild(divElem);
            // el.removeAttribute('data-adtype');
            
            /*if (mod_wapads.config.isGDPR) {
                googletag.pubads().setRequestNonPersonalizedAds(1)
            }*/

            googletag.cmd.push( () => {
                //ga for ads
                (typeof gaEvent != 'undefined') ? 
                    (ad == 'atf' ) ? gaEvent('adtracker',document.location.pathname,'atf') 
                    : (ad == 'fbn' ) ? gaEvent('adtracker',document.location.pathname,'fbn') 
                    : (ad == 'topatf' ) ? gaEvent('adtracker',document.location.pathname,'topatf')  
                    : null
                    : null;
                googletag.display(v['id']);
            });
            
        }
    // };
}

/**
 * Google ad js for defining ad slots based on the location and msid
 * {'ATF':{id:'div-gpt-ad-1394689654028-3','name':'/7176/TOI_MWeb/TOI_MWeb_Home/TOI_MWeb_HP_PT_MTF'}}
 */
const defineAdSlots = (elem, targeting) => {
    let _auds = new Array();
    window.ad_slots = {};

    if (typeof(_ccaud) != 'undefined') {
        for (let i = 0; i < _ccaud.Profile.Audiences.Audience.length; i++)
            if (i < 200)
                _auds.push(_ccaud.Profile.Audiences.Audience[i].abbr);
    }

    let _HDL = '';
    let _ARC1 = 'strong';
    let _Ref = document.referrer.indexOf('facebook') != -1 ? 'facebook' : (document.referrer.indexOf('google') != -1 ? 'google' :'np');
    let _isTizen = (navigator.userAgent.indexOf('Tizen') != -1) ? true : false;
    if(_isTizen){_Ref = 'tizen';}
    let _Hyp1 = '';
    let _article = '';
    let utmval= new URL(window.location.href).searchParams.get("utm_source");
    if(utmval==null || utmval==undefined){window.oem=""}else{window.oem=utmval;}
                        
    let _tval =  (v) => {
        if (typeof(v) == 'undefined') return '';
        if (v.length > 100) return v.substr(0, 100);
        return v;
    };

    let elems = elem ? ((typeof elem === 'string') ? [document.getElementById(elem)] : [elem] ): document.querySelectorAll('[data-adtype]') ;
    // let elems = document.querySelectorAll('[data-adtype]');
    
    for(let el of elems) {
        let ad = el.getAttribute('data-adtype') ? el.getAttribute('data-adtype').toLowerCase() : null;
        let v = mod_wapads.wapads[ad];

        if( !v || v == '' ){
            v = { "id" : el.getAttribute('data-id'), "name" : el.getAttribute('data-name'), "mlb" : el.getAttribute('data-mlb'), "size" : el.getAttribute('data-size')}
        }

        //use adcode from feed 
        let dataAds = el.getAttribute('data-ads');
        if(dataAds && typeof dataAds != 'undefined') {
            v['name'] = dataAds;
        }

        if(!v['id'] || v['id'] == '')continue;//if ad has no data or data-attribute skip
        // convert size to array from string
        if(v.size && !(v.size instanceof Array)) {
            try {v.size = JSON.parse(v.size)}
            catch(e){v.size = [[320,50]]} 
        }

        v['id'] = v['id'] + mod_wapads.config.position;

        if(el && el.innerHTML == ''){
            el.setAttribute('data-id',v['id']);//reset id as-per record
            let gtag = googletag.defineSlot(v['name'], (v['size'] && v['size'] != '' ? v['size'] : mod_wapads.config.defSlots), v['id']);
            let mlb;
            if (v['mlb'] && v['mlb'].length > 0) {
                mlb = googletag.sizeMapping();
                for (let j = 0; j < v['mlb'].length; j++) {
                    mlb = mlb.addSize(v['mlb'][j][0], v['mlb'][j][1]);
                }
                if(gtag) gtag.defineSizeMapping(mlb.build());
            }
            if(gtag) {
                if(typeof targeting != 'undefined' && Object.keys(targeting).length > 0) {
                    gtag.setTargeting("Lang", targeting['Lang']).
                        setTargeting("PUBID", targeting['PUBID']).
                        setTargeting("Ptype", targeting['Ptype']).
                        setTargeting("Section", targeting['Section']).
                        setTargeting("PID", targeting['PID']).
                        setTargeting("OEM", targeting['OEM']).
                        setTargeting("OEMPID", targeting['OEMPID']).
                        setTargeting("SubSCN", targeting['SubSCN']);
                }
                gtag.addService(googletag.pubads());
                mod_wapads.adSlots[ad] = gtag;
                mod_wapads.config.position++ ; //update position for next
            }
            el.removeAttribute('data-adtype');
            // start creating inner Ad divs
            //createAds(el,ad);
            setTimeout(function(){createAds(el,ad);}, 0);
        }
    }

    googletag.pubads().setTargeting('sg', _auds).setTargeting('HDL', _tval(_HDL)).setTargeting('ARC1', _tval(_ARC1)).setTargeting('Hyp1', _tval(_Hyp1)).setTargeting('article', _tval(_article)).setTargeting('_Ref', _tval(_Ref));
    googletag.pubads().enableSingleRequest();
    googletag.pubads().collapseEmptyDivs(true);
    googletag.enableServices();
}

export const render  = (ads ,item , targeting) => {
	if (typeof window === 'undefined') {
      return false;
    }

	mod_wapads.wapads = (ads && ads.wapads) ? ads.wapads : window.wapads;
	mod_wapads.config = default_config;
    
	if(typeof mod_wapads.wapads === 'object' && typeof googletag != 'undefined' && googletag.cmd ){
        googletag.cmd.push(loadGoogleAdJs.bind(this,item,targeting))
	}
} 

export const initialize  = (options) => {
	if (typeof window === 'undefined') {
      return false;
    }
    if(!window.googletag){
        loadJS(gpturl , 
            function(){
                googletag = window.googletag || {};
                googletag.cmd = googletag.cmd || [];
            } 
            , 'gpt_js', true);
    }

    window.wapads = options.wapads || _dummywapads ;
  
    return true;
}

export const refreshAds = (refresh_slots , options) => {
    if(typeof window === 'undefined' || typeof googletag  == 'undefined' || typeof googletag.pubads === 'undefined') {
      return false;
    }

    if(options && options.wapads)  window.wapads = options.wapads ;
    
    if (typeof refresh_slots == "object" && refresh_slots.length > 0) {
        for(let i = 0 ; i < refresh_slots.length ; i++){
            let slot = refresh_slots[i]
            if(typeof slot == 'string'){
                googletag.cmd.push(()=> {
                    googletag.pubads().refresh([mod_wapads.adSlots[slot]]);
                });
            }else{
                googletag.pubads().refresh(slot);
            }
            //ga for ads
            if(typeof gaEvent != 'undefined') {
                if(slot == 'atf' ) gaEvent('adtracker',document.location.pathname,'atf') ;
                if(slot == 'fbn' ) gaEvent('adtracker',document.location.pathname,'fbn') ;
            }
        }
    } else {
        googletag.pubads().refresh();
    }
};

export const recreateAds = (recreate_slots , options , targeting, page, utmSource ) => {
    let utm = utmSource;
    if(typeof window === 'undefined' || typeof googletag == 'undefined' || typeof googletag.pubads === 'undefined') {
      if(page == 'cricket') {
        let oldAd = document.querySelector(`.ad1.fbn`);
        if(oldAd) oldAd.style.display = 'none';
      }
      return false;
    }
    
    if (typeof recreate_slots == "object" && recreate_slots.length > 0) {
        for(let i = 0 ; i < recreate_slots.length ; i++){
            let slot = recreate_slots[i]
            if(typeof slot == 'string' && window.wapads[slot] != undefined){

                if(googletag && googletag.pubads && typeof googletag.pubads().destroySlots === 'function') {
                    googletag.pubads().destroySlots([mod_wapads.adSlots[slot]]);
                }
                
                let oldAd = document.querySelector(`.ad1.${slot}`) ;
                if(!oldAd || oldAd === null)continue;

                let adClass = slot && (slot.indexOf('fbn') != -1) ? slot + ' fbn' : slot;
                let newAd = document.createElement('div');
                newAd.setAttribute('class' , `ad1 ${adClass}` );
                newAd.setAttribute('data-adtype' , slot );
                if(page && (page == 'articleshow') && slot.indexOf('fbn') != -1 && utmSource !='samsung' && utmSource!='samsung_qaicon' && utmSource!='baidu_browser' && utmSource!='samsung_notification' && utmSource!='vivo' && utmSource!='oppo' ) {
                    newAd.style.bottom = '45px';
                }
                oldAd.after(newAd);
                oldAd.remove();
                render({} , newAd , targeting);
            }else{
                let oldAd = document.querySelector(`.ad1.${slot}`);
                if(oldAd) oldAd.style.display = 'none';
            }
        }
    } 
};

export default {initialize , render , refreshAds ,recreateAds};
