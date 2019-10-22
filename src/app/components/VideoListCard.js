import React from 'react'
import { Link as RLink } from 'react-router-dom'
import {makeUrl} from '../../utils/util';
//import ImgTag from './ImgTag';
import LazyIntersection from './LazyIntersection';
import ReactLink from '../../utils/Link';
const Link = ReactLink(RLink);

const VideoListCard = ({item, lang}) => {
  return (
    <li className="card">
      <Link to={"/"+ lang + "/videos/" + (item.channel ? item.channel : item.channel_id) +  '/' + makeUrl(item.category ? item.category : 'livetv') + "/videoshow/" + (item.id ? item.id : item.channel_id)} className="anchor">
        <span className={'displayimage'}>
            <LazyIntersection alt={""} 
                datasrc={item.imageid ? item.imageid : item.imageurl} 
                src={item.imageid ? item.imageid : item.imageurl} 
                height={"100%"} 
                width={"100%"} 
                placeholder={"/images/appicon.svg"} 
            />
            <span className={'type_icon ad_video'}></span>    
        </span>
        
        <span className="title" id={"video_"+item.id ? item.id : item.channel_id}>{item.hl ? item.hl : item.channelname}</span>
      </Link>
    </li>
            
  )
}

export default VideoListCard
