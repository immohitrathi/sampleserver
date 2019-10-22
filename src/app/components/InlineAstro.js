import React, { useEffect,useState } from 'react';
import {Link as RLink} from 'react-router-dom';
import fetch from '../data/utils/fetch';
import ReactLink from '../../utils/Link';
import { hasValue, getAstroDates, hasCookie, getCookie, setCookie } from "../../utils/util";
import config from '../../config';
import NewsListCardLoading from './NewsListCardLoading';
const Link = ReactLink(RLink);

const InlineAstro = ({lang, readmore, yourhoroscope, choosesunsign, allsunsign})=> {
  const dates = getAstroDates();
  const [astro, setData] = useState(null);
  let sign = (hasCookie() && getCookie("sign")) || null ;
  useEffect(()=>{
    fetchAstroData();
  },[lang]);


  const selectSign = ( event )=>{
    event.preventDefault();
    sign = event.currentTarget.getAttribute('data-sign');
    let signName = event.currentTarget.getAttribute('data-sign-name');
    let url = event.currentTarget.getAttribute('href');
    if(hasCookie() && hasValue(sign)){
      setCookie("sign",sign, 365);
      setData(1);
    }
    fetchAstroData();
  }

  const fetchAstroData = () => {
    let url = hasValue(sign)?
                `${config.API_URL}/horoscope/${sign}/${lang}`:
                `${config.API_URL}/astrosigns/${lang}` ;
                

    fetch(`${url}`).then((d)=>{
      setData(d);
    });
  }


  if(!hasValue(astro)) {
    return null;
  } else if(astro==1){
    return <NewsListCardLoading first={true} cricket={true} d={true} />
  } else if(hasValue(astro.daily)){
    return (
      <div className="iastroc">
        <h3>{yourhoroscope || "YOUR HOROSCOPE"}</h3>
        <div className="dflex plr16">
          <div className="topc1">
              <img src={`/photos/${sign}.svg`} alt="" width="40" />
              <h4>{astro.daily.title}</h4>
          </div>
          <div><label className="date">{astro.daily.range}</label></div>
        </div>
        
        <div className="desc plr16">
          {astro.daily.description}
        </div>
        <Link to={`/${lang}-news/horoscope-news`} className="seeallm">{readmore || "READ MORE"} <span>&rsaquo;</span></Link> 
      </div>
    )
  } else {
    return (
      <div className="iastroc">
        <h3>{choosesunsign || "CHOOSE YOUR SUNSIGN"}</h3>
        <div className="scrlcontent mt16">
            <ul>
                {
                  astro.map((d, i)=>{
                      return (
                        <li key={i}>
                          <Link to={`/${lang || 'english'}/horoscope/${i+1}/daily`}
                            data-sign={(i+1)}
                            data-sign-name={d.name}
                            onClick={selectSign}
                            >
                            <img src={`/photos/${i+1}.svg`} alt="" />
                            <label>{d.title}</label>
                            <label className="small">{dates[i]}</label>
                          </Link>
                        </li>
                      )
                  })
                }
            </ul>
        </div>
        <Link to={`/${lang}-news/horoscope-news`} className="seeallm">{allsunsign || "SEE ALL SUNSIGNS"} <span>&rsaquo;</span></Link>        
      </div>
    )
  }
}
export default InlineAstro;