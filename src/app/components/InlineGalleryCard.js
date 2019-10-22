import React, { Component } from 'react'
import { Link as RLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import {makeUrl, gaEvent,resizeImage} from './../../utils/util';
//import LazyImage from './LazyImage';
import ImgTag from './ImgTag';
import ReactLink from '../../utils/Link';
const Link = ReactLink(RLink);
class InlineGalleryCard extends Component {
  constructor(props) {
    super(props);
  }
  fireGA(item){
    /* let pid = item.hasOwnProperty('pubInfo') ? item.pubInfo.pid : "";
    let title =  item.hasOwnProperty('hl') ? item.hl : "";
    let langid = item.hasOwnProperty('pubInfo') ? item.pubInfo.lid : "1";
    let langName = getLanguageNameById(langid);
    let publiser = item.hasOwnProperty('publiser') ? item.publiser : "";
    gaEvent('VideoContent-Portrait-InlineVideos','Play-'+pid+'-'+langName,publiser+'-'+title); */
  }
  /*shouldComponentUpdate(nextProps, nextState) {
    return false;
  }*/   
  render() {
    let {item, showImages, networkStatus, videoLanguage, params, utm, odd} = this.props;
    if(item.tn == "videopreview_inline"){
      let defaultUrl = (typeof (item.videodata) != 'undefined' && typeof (item.videodata.defaulturl) != 'undefined') ? item.videodata.defaulturl : "";
      let cat = (defaultUrl != "" && defaultUrl.indexOf('categories') != -1) ? makeUrl(defaultUrl.split("&categories=")[1].split('&')[0].split(',')[0]) : "top-videos";
      let lang = (defaultUrl != "" && defaultUrl.indexOf('lang') != -1) ? makeUrl(defaultUrl.split("lang=")[1].split('&')[0].split(',')[0]) : videoLanguage;
      let uid = (typeof (item.videodata) != 'undefined' && typeof (item.videodata.uid) != 'undefined') ? item.videodata.uid : "";
      let isElectionPage = false;// (typeof params.feedSection != 'undefined' && params.feedSection == 'featured')  ? true : false;
      if(uid && (uid == 'ipl' || uid == 'worldcup') && (lang == 'english' || lang == 'hindi') && !isElectionPage) {
        cat = 'sports';
      }else if(isElectionPage) {
        cat = 'news';
      }
      return (
        <div className="inline-video-wrapper">
          <div className="inline-video-heading">
            <span className="theading">{item.videodata.name}</span>
          </div> 
          <div className="commonlist_con smallthumb">
            {
              item.videodataitems.items.map((it,index)=>{
                if(index>2)
                  return null;
                return(
                    <div className={`item ${index==0?'first':''}`} key={index}>
                      <Link onClick={() => this.fireGA(it)} to={"/"+ lang + (isElectionPage ? '/elections' : '') + "/" + it.channel + "/videos/" + makeUrl(it.category) + "?id=" + it.id} className="videoOnclick thumbanchor">
                        <span className={`block relative ${index!=0?'round smallcard':''}`}>
                            <ImgTag data={typeof(it.imageid)!='undefined'?resizeImage(it.imageid,165):""} width="100%" height="100%" />
                            <div className={`type_icon ad_video ${index!=0?'small':''}`}></div>    
                        </span>
                        
                        <span className="ntitle" id={"video_icon_"+it.id}>{it.hl}</span>
                      </Link>
                    </div>
                )
              })
            }
          </div>
            
          <Link to={"/"+ lang + (isElectionPage ? '/elections' : '') + "/videos/"+cat} className="seeall">{this.props.see_all} <span className="rightarrow">›</span></Link>
        </div>
      )
    }else{
      let msid = (typeof (item.id) != 'undefined') ? item.id : "";
      let title = (typeof (item.hl) != 'undefined') ? item.hl : "";

      let images = item.images;
      let id = item.fid;
      
      images = [];
      for(let i=0;i<item.data.items.length;i++) {
          images.push(item.data.items[i].id);
      }
  

      return (
        <Link className={`photolist ${odd?'odd':''}`} to={"/news/photoshow/" + msid + ".cms"} >
            <label>{item.hl}</label>
            <div className="flex-body">
                <div className="flexc flex-row">
                    <div style={{backgroundImage:`url(${images[0]})`}}>
                        
                    </div>
                </div>
                <div className="flexc flex-column">
                    <div className="w30"  style={{backgroundImage:`url(${images[1]})`}}>
                        
                    </div>
                    <div className="w30"  style={{backgroundImage:`url(${images[2]})`}}>
                        
                    </div>
                </div>
            </div>
        </Link>
      )






      
      /*if(networkStatus==false || typeof(window)=='undefined')
        return null;*/
      return (
        <div className={"inline-photo-wrapper"}>
        <Link to={"/news/photoshow/" + msid + ".cms"} className="photoheading">
          <div className="inline-photo-heading">
            <span className="theading">{title}</span>
            {/*<Link to={"/"+ lang + "/videos/"+cat} className="seeall">{this.props.see_all}</Link>*/}
          </div> 
          <ul className="inline-photo smallthumb">
            {
              item.data.items.map((it,index)=>{
                return (index <= 2) ? (
                    <li className="item" key={index}>
                      <span className="centerer"></span>
                      <p className="">
                      {
                        showImages=='no'?
                        <span className="img_wrap">
                          <img src="/img/53612457.png" className="dummy-img min-height-275" title={title} alt="" />
                        </span>
                        :
                        <ImgTag data={typeof(it.id)!='undefined'?resizeImage(it.id,150):""} width="100%" height="100%" />
                        
                      }
                      </p>
                    </li>
                )
                :
                null
              })
            }
          </ul>
        </Link>
        </div>
      )
    }    
  }
}

InlineGalleryCard.propTypes = {
    item:PropTypes.object
}

export default InlineGalleryCard
