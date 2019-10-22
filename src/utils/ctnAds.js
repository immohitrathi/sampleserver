import React from 'react'
import ReactDOM from 'react-dom';
import LazyIntersection from '../app/components/LazyIntersection';
import { gaEvent } from '../utils/util';
import loadCtn from './loadCtn';
import ReactLink from '../utils/Link';
// import {Link as RLink} from 'react-router-dom';
// const Link = ReactLink(RLink);


/*const ctnTemplate = (data, adinfo, ctnstyle , ctnheading) => {
  let template = "";
  let wrapper = "";
  data.forEach(function(value,idx){
    template += "<div class='ad-wrapper' data-col='1'><a rel='noopener' title='" +value.title+ "' target='_blank' href='" + ((value.itemType !== 4 || value.itemType !== 5 || value.itemType !== 2) ? value.clk[0] : null) + "' onclick = '" + ((value.itemType === 5 || value.itemType === 2) ? value.clk[0] : null) + "'><span class='holder'><img width='120' height='90' class='dummy-img' src='" + value.mainimage + "' alt='columbia' /></span><span class='listing_title'>"+value.title+"</span></a><span class='ad-dest'><span class='ad-text'>Ad</span> "+(adinfo === 'paid' ? value.brandtext : '')+"</span><img class='colombia-logo' src='https://static.clmbtech.com/ad/commons/images/colombia-icon.png' alt='columbia'/></div>";
  });
  if(ctnstyle !=='inline'){
    wrapper = "<div class='ad-fromTheWeb'><div class='sectionheading'><h2><span>"+ctnheading+"</span></h2></div><div class='gridview'><ul class='list'>"+ template + "</ul></div></div>";
  }else{
    wrapper = template;
  }
  return (<div dangerouslySetInnerHTML = {{__html:  `${wrapper}`  }}/>)
}*/

const ymlWidgetTemplate = (data, lang, text) => {
  return (
      [
        <h2 key={1}>{text}</h2>,
        <ul key={2} className="yml-list">
          {
            data.map((item, index) => {
              let redirectUrl = typeof item.items[0].url != 'undefined' ? item.items[0].url.trim() : '';
              let mxUrl = '';
              try{
                mxUrl = decodeURIComponent(redirectUrl).split('&u=')[1];
                mxUrl = mxUrl.replace('https://www.newspointapp.com', "");
              }catch(e) {
                console.log('You May Also Like : ', e);
              }
              let curSearch = typeof window != 'undefined' ? window.location.search : '';
              if(curSearch) {
                mxUrl += curSearch;
              }
              if(typeof item.items != 'undefined' && item.items.length > 0) {
                return (                  
                  <li key={item.adSlot + '_' + index} className={"news  yml-list-item " + item.cls}>
                    <a className="news-headline" key={item.adSlot + '-' + index} href={mxUrl} onClick={() => gaEvent('StoryTap','YouMayAlsoLike', lang)} >
                      <LazyIntersection alt="yml" src={typeof item.items[0].sImg != 'undefined' ? item.items[0].sImg[0] : ''} width="100%" height="100%" placeholder=""/>
                      <label>{typeof item.items[0].name != 'undefined' ? item.items[0].name : ''}</label>
                    </a>
                  </li>
                )
              }else{
                return null;
              }
            })
          }
        </ul>
      ]
  )
}

const createWrapper = (elem ,ctnid,position,ctnstyle, slot ,slideCount) => {

  let randNum = Math.floor(Math.random()*100001);
  
  if(!slideCount)slideCount=0;

  slideCount = slideCount++;

  let wrapper = elem ? elem : document.createElement('div');
  let adslot = "div-clmb-ctn-"+ctnid+"-"+ randNum;
  
  wrapper.setAttribute("id",adslot);
  wrapper.setAttribute("data-slot",ctnid);
  wrapper.setAttribute("data-position",randNum);
  wrapper.setAttribute("data-pos",position); 
  wrapper.setAttribute("data-section","0");
  // (ctnstyle != 'inline') ? wrapper.setAttribute("data-cb","adwidget") : null;
  wrapper.setAttribute("class","colombia");
  wrapper.setAttribute("ctn-style",ctnstyle);
  wrapper.setAttribute("data-col","1");

  return wrapper;
}

const renderYMLWidget = (data, container) => {
  if(typeof data != 'undefined' && data.length > 0 && container) {
    let ymlContainer = document.querySelector('#'+container);
    let ymlLanguage = ymlContainer.getAttribute('data-lang') || 'english';
    let ymlHeading = ymlContainer.getAttribute('data-heading');
    let renderItems = ymlWidgetTemplate(data,ymlLanguage, ymlHeading);
    ReactDOM.render(renderItems, ymlContainer);
  }
}
/* CTN Ad js */
const configure = (options)=>{
  if(typeof colombia === 'undefined') {
    let colombia = window.colombia || {};
    colombia.fns = colombia.fns || [];

    //window.adwidget = initdrawCTN;
    //window.colombiaVidAdStart = colombiaVidAdStart;
    //window.colombiaVidRemove = colombiaVidRemove;

    window.ymlwidget = renderYMLWidget;

    loadCtn(options);

  } else {
    window.colombia.update();
  }
}

export const render = (options , elem) => {

  if(typeof window == undefined) return false;

  let ctnid = '' , ctnElems = elem ? ((typeof elem === 'string') ? [document.getElementById(elem)] : [elem] ): document.querySelectorAll('[data-plugin="ctn"]') ;

  //excute only if ctn object exist
  if(ctnElems.length > 0){

    ctnElems.forEach(function(item , i){
        if(!item) return true;
        if(item.innerHTML != '' || item.hasAttribute('data-position')){return true;}
        let position = ++i;
        let slot = item.getAttribute("data-slot");
        /*to check custom ctn id*/
        if(typeof slot  !== "undefined" && slot){
          ctnid = slot;
          //item.setAttribute("data-adwidth","300");
          //item.setAttribute("data-adheight","250");
        }

        //if(item.getAttribute("data-slot") === 'ctnMidArt') item.setAttribute({"data-adheight":"320"});

        createWrapper(item , ctnid ,position , item.getAttribute('ctn-style') , item.getAttribute('data-slot'));
    });
  }
}

export const initialize = (options) => {
  if(typeof window == "undefined") return false;
  
  //config.ctnads = options.ctnads || config.ctnads

  render(options);

  configure(options);
}

export default {initialize , render}
