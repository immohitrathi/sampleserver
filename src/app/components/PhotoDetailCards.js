import React from 'react';
import {hasValue} from "../../utils/util";
import PhotoCard from './PhotoCard';
import Ad from './Ad';

const PhotoDetailCards = ({ detail, lang, location }) => {
    //console.log("inside",items);
    let counter = 1;
    return (
        <>
            {
                hasValue(detail.items) && detail.items.length>0?
                <>
                <div className="title">{detail.items[0].hl || detail.items[0].desc}</div>
                {
                    detail.items.map((i, index)=>{
                        if(i.tn=='ad'){
                            return <Ad adtype={"ctn"} adcode={i.adcode} key={index} />
                        }
                        return (
                            <PhotoCard key={index} i={i} lang={lang} counter={counter++} tr={detail.pg.tr} location={location} />
                        )
                    })
                }
                </>
                :
                null
            }
        </>
    )
};

export default PhotoDetailCards;