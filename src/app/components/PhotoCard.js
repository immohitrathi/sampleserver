import React, {memo, useRef} from 'react';
import LazyIntersection from './LazyIntersection';
import Share from './Share';
import config from '../../config';

const PhotoCard = memo(({lang, i, counter, tr, location}) => {
    const shortLabel = useRef();
    const moreLabel = useRef();
    const readMore = (event)=> {
        event.preventDefault();
        shortLabel.current.classList.toggle("hide");
        moreLabel.current.classList.toggle("hide");
    }
    const shareData = () => {
        let shareurl = typeof(i.sl)!='undefined' && i.sl!=""?i.sl:config.SITE_URL+"/news/photoshow/"+i.id;
        let url = i.tn=='html'?i.wu:shareurl;
        return {
            title:i.hl,
            url:url,
            text:i.desc,
            isMicron: typeof(i.sl)!='undefined' && i.sl!=""? true : false
        }         
    }
    const desc = i.desc || i.hl || "";
    return (
        <>
            <div className="cardimg photocard" data-href={`/news/photoshow/${i.id}${location.search}`}>
                
                <div className="imgcont">
                    <LazyIntersection 
                        alt={""} 
                        datasrc={i.image} 
                        src={"https://opt.toiimg.com/recuperator/imgserver/serve?quality=80&dimension=600&source="+encodeURIComponent(i.image)} 
                        placeholder="" useOriginalSource={true}/>
                </div>
                <div className="p">
                    <div className="share">
                        <Share sharedata={shareData} />
                    </div>
                    <strong className="pg">{counter}/{tr}</strong>
                    <div  ref={shortLabel}>
                        <label className="short">
                            {desc}
                        </label>
                        {
                            desc.length>125?<a onClick={readMore}>Read More...</a>:null
                        }
                        
                    </div>
                    <div ref={moreLabel} className="hide">
                        <label className="more">
                            {desc}
                        </label>
                        <a onClick={readMore}>Read Less...</a>
                    </div>
                </div>
            </div>
        </>
    )
});

export default PhotoCard;