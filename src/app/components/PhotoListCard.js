import React, {memo} from 'react';
import { Link as RLink } from 'react-router-dom';
import {gaEvent, hasValue} from '../../utils/util';
import ReactLink from '../../utils/Link';
const Link = ReactLink(RLink);

const PhotoListCard = memo(({ item, odd, isHome }) => {
    let images = item.images;
    let id = item.fid;
    if(isHome){
        id = item.id;
        images = [];
        for(let i=0;i<item.data.items.length;i++) {
            images.push(item.data.items[i].id);
        }
    }

    const fireGAEvent = ()=> {
        //gaEvent("ItemTap","Photos-photogallery",lang);
    }
    if(!hasValue(images) ||  images.length<=0) return null;

    return (
        <Link className={`photolist ${odd?'odd':''}`} to={`/news/photoshow/${id}`} onClick={fireGAEvent} key={id}>
            <label>{item.hl}</label>
            <div className="flex-body">
                <div className="flexc flex-row">
                    <div style={{backgroundImage:`url(${images[0]})`}}>
                        
                    </div>
                </div>
                <div className="flexc flex-column">
                    <div className="w30"  style={{backgroundImage:`url(${images[1]})`}} key={1}>
                        
                    </div>
                    <div className="w30"  style={{backgroundImage:`url(${images[2]})`}} key={2}>
                        
                    </div>
                </div>
            </div>
        </Link>
    )
});

export default PhotoListCard;