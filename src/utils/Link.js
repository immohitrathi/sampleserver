import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {replaceUtm} from './util';

function checkAndReplaceUtm(url, utmValue, utmType){
  
  if(typeof(url)!='undefined' && url && utmValue!='undefined' && utmValue!='' && utmType!=""){
    //console.log("Inside checkAndReplaceUtm", "utmType:"+utmType, "utmValue:"+utmValue);  
    if(url.indexOf(utmType)!==-1){
      url = replaceUtm(url, utmValue, utmType);
    } else if(url.indexOf("?")!==-1){
      url = url+"&"+utmType+"="+utmValue;
    } else {
      url = url+"?"+utmType+"="+utmValue;
    }
  }  
  return url;
}


export default function ReactLink(MyComponent) {
  class Virtualize extends PureComponent {
    constructor(props){
      super(props);
    }
    render() {
      let {to,utmSource, utmMedium, utmCampaign, appStatus, dispatch, ...other} = this.props;
      //console.log("Inside ReactLink", this.props);
      let url = to;
      url = checkAndReplaceUtm(url, utmSource, 'utm_source');
      url = checkAndReplaceUtm(url, utmMedium, 'utm_medium');
      url = checkAndReplaceUtm(url, utmCampaign, 'utm_campaign');
      if(typeof(url)!='undefined' && url && appStatus && url.indexOf('frmapp=yes')===-1){
        if(url.indexOf('#home') != -1) {
          url = url.split('#')[0];
          if(url.indexOf("?")!==-1){
            url = url+"&frmapp=yes";
          } else {
            url = url+"?frmapp=yes";
          }
          url = url + '#home';
        }else{
          if(url.indexOf("?")!==-1){
            url = url+"&frmapp=yes";
          } else {
            url = url+"?frmapp=yes";
          }
        }
        
      }      
      return (
        <MyComponent to={url} {...other}>
          {this.props.children}
        </MyComponent>
      );
    }
  }

  const mapStateToProps = ({ config }) => ({
    utmSource:config.utmSource,
    utmMedium:config.utmMedium,
    utmCampaign:config.utmCampaign,
    appStatus:config.appStatus
  });

  return connect(mapStateToProps)(Virtualize)
}
