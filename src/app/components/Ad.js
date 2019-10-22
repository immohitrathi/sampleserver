/*import React, { useEffect, useRef } from 'react';
import CtnAds from "../../utils/ctnAds";

const Ad = ({adcode, elemtype}) => {
    const adElem = useRef();
    useEffect(()=>{
        if(adElem){
            window.setTimeout(()=>{
                CtnAds.render({} , adElem.current);
          },1000);        
        }
    },[]);
    return (
        <>
        {    
        elemtype && elemtype == "li" ? 
            <li data-slot={adcode} data-plugin="ctn" className = "newsloading ad  ad1" ref = {adElem}></li>
            : 
            <div data-slot={adcode} data-plugin="ctn" className = "newsloading ad  ad1" ref = {adElem}></div>
        }
        </>
    )
}
export default Ad;*/

import React, { Component } from 'react'
import DfpAds from  '../../utils/dfpAds';
import CtnAds from  '../../utils/ctnAds';

import config from '../../config';
const adsObj = config.ADS_CONFIG;

class Ad extends Component {

  componentDidMount(){
    let _this = this;

    let { adtype, pagetype, renderall, targeting } = _this.props;
    pagetype = pagetype || 'others'
    
    if(_this.adElem){
      window.setTimeout(()=>{
        adtype == 'ctn' ? 
        CtnAds.render({} , _this.adElem) 
        :
        renderall ? 
        DfpAds.render({})
        :
        DfpAds.render({} , _this.adElem, targeting) ;
      },1000);
    }

  }
  //@adtype for ctn/dfp
  //@mstype type of ctn/dfp as key 
  //@elemtype for li/div
  //@ctnstyle only for ctn , diff btw inline & others
  render() {
    
    let _this = this;
    let { adtype, mstype, elemtype, adcode, pagetype } = _this.props;
    let adClass = mstype && (mstype.indexOf('fbn') != -1) ? mstype + ' fbn' : mstype;
    return (
        
        (adtype && adtype == 'ctn') ?
        
            (elemtype && elemtype == "li" ? 
            <li ctn-style={mstype} data-slot={adcode} data-plugin="ctn" className = "ad1" ref = {(ele) => _this.adElem = ele}></li>
            : 
            <div ctn-style={mstype} data-slot={adcode} data-plugin="ctn" className = "ad1" ref = {(ele) => _this.adElem = ele}></div>)
        
          :
        
            (elemtype && elemtype == "li" ? 
            <li data-ads={adcode} data-adtype={mstype} className = {"ad1 " +  adClass } ref = {(ele) => _this.adElem = ele}></li>
            : 
            <div data-ads={adcode} data-adtype={mstype} className = {"ad1 " + adClass  + (pagetype && pagetype == 'funnies'? ' funny-card ' : '' )} ref = {(ele) => _this.adElem = ele} style={_this.props.style}></div>)
          
        
    )
  }
}

export default Ad;
