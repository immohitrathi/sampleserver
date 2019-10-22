import React, {memo} from 'react';
import {createArticleUrl, makeUrl} from '../../utils/util';
import ReactLink from '../../utils/Link';
import {Link as RLink} from 'react-router-dom';
const Link = ReactLink(RLink);
import Rating from "./Rating";
//import {gaEvent} from "../utils/util"; 

const NewsListCard = memo(({ item, first, img, noLink }) => {
    const bg = first?(item.imageid? {backgroundImage:`url(${item.imageid})`}: {background:`url("/images/appicon.svg") no-repeat 50% 50%`, backroundSize:'100px'}):{};
    let url = item ? item.mwu || createArticleUrl(item) : '';
    
    const fireGAEvent = ()=>{
        //gaEvent("StoryTap","List",item.lang);
        //gaEvent("ItemTap","foryou-article",item.lang);
    }

    return (
        noLink ?
        <div className={`news ${first?'first':''} ${item.cr?makeUrl(item.tn):''}`}>
            <label>{item.hl}</label>
            <img src={item.imageid || img || ""} alt=""  />
        </div>
        :
        <Link className={`news ${first?'first':''}  ${item && item.cr?makeUrl(item.tn):''}`} to={ url ? url : ''}  style={bg} onClick={fireGAEvent}>
            <div className="ol"></div>
            <label>{item && item.hl}</label>
            {item && item.hasOwnProperty('cr') && item.cr!=""?<div className="margin-top-10px"><Rating rate={item.cr} /></div>:<div className="margin-top-10px"></div>}
            <img src={item && item.imageid || img || ""} alt=""  />
        </Link>
    )
});

export default NewsListCard;