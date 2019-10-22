import React, { memo } from 'react';
import { Link as RLink } from 'react-router-dom';
import {languageArr} from '../../../utils/util';
import ReactLink from '../../../utils/Link';
const Link = ReactLink(RLink);
import ReferData from './ReferData';

const ReferPage = memo((props)=>{
    const {params} = props;
    const langSelected = typeof params.lang != 'undefined' ? params.lang.toLowerCase() : 'english';
    const item = ReferData[langSelected] && ReferData[langSelected].langcode ? ReferData[langSelected] : ReferData['english'];
    return(
        <div className="refer-page-wrapper">
            <div className="banner"><img src={item.topbanner}></img> </div>
            <div className="inner-content">
                <div className="title-card">
                    <h1>{item.titleCard[0]}</h1>
                    <h4>{item.titleCard[1]}</h4>
                </div>
                <div className="subtitle-card">
                    <h3>{item.subtitle}</h3>
                </div>
                <div className="offer-validity">{item.offer}</div>
                <h2>{item.howto}</h2>
                <ul className="howto">
                    {item.howtolist.map((it, idx)=>{
                        if(idx === 2 ) {
                            return(
                                [<li key={'how_'+idx}>{it}</li>,<img key="banner" className="refer-steps" src={item.midbanner}></img>]
                            )
                        }else{
                            return(
                                <li key={'how_'+idx}>{it}</li>
                            )
                        }
                        
                    })}
                </ul>
                <div className="otherprizes">
                    <ol>
                        {item.prizes.map((it,idx)=>{
                            const index = idx+1;
                            return(<li key={"prize_"+idx} className={`rank_${index}`}>
                                <span className={`icon rank_${index}`}></span>
                                <div>
                                    <span className="rangeText">{it.text1}</span>
                                    <span className="prize">{it.text2}</span>
                                </div>
                                <img src={`/photos/rank${index}icon.svg`} alt="" />
                            </li>)
                        })}
                    </ol>
                    
                </div>
                <h2>{item.tnc}</h2>
                <ol className="tnc">
                    {item.tnclist.map((it, idx)=>{
                        return(
                                <li key={'tnc_'+idx}>{it}</li>
                            )
                    })}        
                </ol>
            </div>
        </div>
    )
})


export default ReferPage;