import React from 'react'
import { Link as RLink } from 'react-router-dom';
import LazyIntersection from './LazyIntersection';
import ReactLink from '../../utils/Link';
const Link = ReactLink(RLink);

const LiveTvCard = ({item, lang}) => {
  return (
    <li className="card">
      <Link to={"/"+ lang + "/videos/" + item.channel_id +  '/' + 'livetv' + "/videoshow/" + item.channel_id} className="anchor">
        <span className={'displayimage'}>
            <LazyIntersection alt={""} 
                datasrc={item.imageurl} 
                src={item.imageurl} 
                height={"100%"} 
                width={"100%"} 
                placeholder={"/images/appicon.svg"} 
            />  
        </span>
        <span className="title" id={"video_"+item.channel_id}>Watch Live</span>
      </Link>
    </li>
            
  )
}

export default LiveTvCard
