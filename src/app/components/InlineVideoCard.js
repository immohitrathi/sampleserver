import React from 'react'
import { Link as RLink } from 'react-router-dom'
import {makeUrl} from './../../utils/util';
//import ImgTag from './ImgTag';
import LazyIntersection from './LazyIntersection';
import ReactLink from '../../utils/Link';
const Link = ReactLink(RLink);

const InlineVideoCard = ({item, videoLanguage, isElectionPage, see_all}) => {
  let defaultUrl = (typeof (item.videodata) != 'undefined' && typeof (item.videodata.defaulturl) != 'undefined') ? item.videodata.defaulturl : "";
  let cat = (defaultUrl != "" && defaultUrl.indexOf('categories') != -1) ? makeUrl(defaultUrl.split("&categories=")[1].split('&')[0].split(',')[0]) : "top-videos";
  let lang = (defaultUrl != "" && defaultUrl.indexOf('lang') != -1) ? makeUrl(defaultUrl.split("lang=")[1].split('&')[0].split(',')[0]) : videoLanguage;
  
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
                  <Link to={"/"+ lang + (isElectionPage ? '/elections' : '') + "/" + it.channel + "/videos/" + makeUrl(it.category) + "?id=" + it.id} className="videoOnclick thumbanchor">
                    <span className={`block relative ${index!=0?'round smallcard':''}`}>
                        {/* <ImgTag data={typeof(it.imageid)!='undefined'?resizeImage(it.imageid,165):""} width="100%" height="100%" /> */}
                        <LazyIntersection alt={""} 
                            datasrc={it.imageid} 
                            src={"https://opt.toiimg.com/recuperator/imgserver/serve?dimension=600&source="+encodeURIComponent(it.imageid)} 
                            height={"100%"} width={"100%"} 
                            placeholder={""} 
                            useOriginalSource={true}
                        />
                        
                        <div className={`type_icon ad_video ${index!=0?'small':''}`}></div>    
                    </span>
                    
                    <span className="ntitle" id={"video_icon_"+it.id}>{it.hl}</span>
                  </Link>
                </div>
            )
          })
        }
      </div>
        
      <Link to={"/"+ lang + (isElectionPage ? '/elections' : '') + "/videos/"+cat} className="seeall">{see_all || "See All Videos"} <span className="rightarrow">›</span></Link>
    </div>
  )
}

export default InlineVideoCard
