import React from 'react'
import { gaEvent, hasValue } from '../../utils/util';

const Share = (props) => {
  const getShareParams = () => {
    let utmCampaign = props.utmCampaign;
    let utmSource = hasValue(props.utmSource)  && props.utmSource != 'pwa' ? 'PWA_P' : 'PWA_NP';
    let utmMedium = hasValue(props.utmSource)  && props.utmSource != 'pwa' ? props.utmSource : 'Non-Partner';
    return {
      utmSource : utmSource,
      utmMedium : utmMedium,
      utmCampaign : utmCampaign
    }
  }

  const getShareParamsForMicron = () => {
    let utmSource = props.utmSource;
    let utmCampaign = props.utmCampaign;
    let codeSource = hasValue(utmSource) && utmSource != 'pwa' ? 'a35' : 'a34';
    let codeMedium = 'n';
    let codeCampaign = 'r';
    switch(utmSource) {
      case 'samsung':
        codeMedium = 'o';
        break;
      case 'vivo':
        codeMedium = 'q';
        break;
      case 'panasonic':
        codeMedium = 'r';
        break;
      case 'xiaomi':
        codeMedium = 's';
        break;
      case 'tizen':
        codeMedium = 't';
        break;
      default:
        codeMedium = 'n';
        break;
    }

    switch(utmCampaign) {
      case 'article':
        codeCampaign = 'r';
        break;
      case 'photogallery':
        codeCampaign = 's';
        break;
      case 'video':
        codeCampaign = 't';
        break;
      case 'livetv':
        codeCampaign = 'u';
        break;
      case 'funnies': 
        codeCampaign = 'v';
        break;
      case 'games': 
        codeCampaign = 'w';
        break;
      default:
        codeCampaign = 'o';
        break;
    }
    return {
      codeSource : codeSource,
      codeMedium : codeMedium,
      codeCampaign : codeCampaign
    }
  }

  const shareOnWhatsapp = () => {
    let type = props.type;
    var info = props.sharedata().url;
    if(props.frmapp && props.frmapp == 'yes') info = info.split('?frmapp=yes')[0];
    let title = props.sharedata().title;
    let isMicron = props.sharedata().isMicron == true ? true : false;
    let shareParams = isMicron ? getShareParamsForMicron() : getShareParams();
    if(info.indexOf('?') != -1 && !isMicron) {
      info += '%26utm_source=' + shareParams.utmSource + '%26utm_medium=' + shareParams.utmMedium + '%26utm_campaign=' + shareParams.utmCampaign;
    }else if(!isMicron){
      info += '?utm_source=' + shareParams.utmSource + '%26utm_medium=' + shareParams.utmMedium + '%26utm_campaign=' + shareParams.utmCampaign;
    }else if(isMicron) {
      info += '/' + shareParams.codeSource + shareParams.codeMedium + shareParams.codeCampaign;
    }
    console.log('whatsapp share '+ info);
    let prefixText = "whatsapp://send?text=";
    if(props.frmapp && props.frmapp == 'yes') prefixText = "shareinapp://send?text=";
    var whatsappurl = prefixText  + encodeURIComponent(title) + ' - ' + info;
    window.location.href = whatsappurl;
    let ecategory = props.sharedata().ecategory;
    if(ecategory){
      let elable =props.sharedata().elable;
      let evalue =props.sharedata().evalue; 
      gaEvent(ecategory,elable,evalue+'-WhatsApp');
    } else {
      if(type){
        gaEvent('Share',type,'WhatsApp');
      }else{
        gaEvent('Share','PGShare','WhatsApp');
      }
    }
    return false;
  }

  return (
    <a rel="nofollow" id="sharingAnchor" onClick={shareOnWhatsapp} className={`whatsapp ${props.shareText?'withtext':''}`} href="javascript:void(0);">{props.shareText || ""}</a>
  )
}


export default Share;
