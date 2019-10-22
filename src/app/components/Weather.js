import React, { useEffect,useState } from 'react';
import { Link as RLink } from 'react-router-dom'
import config from '../../config';
import { hasValue } from '../../utils/util';
import ReactLink from '../../utils/Link';
const Link = ReactLink(RLink);
import fetch from '../data/utils/fetch';
import { useCookies } from 'react-cookie';

const Weather = ( { city, language } ) => {
  const [data, setData] = useState(null);
  const [cookies, setCookie] = useCookies();
  city = city || cookies.city || "Delhi";
  language = language || "english";

  useEffect(()=>{
    fetch(`${config.API_URL}/api_fetchweatherdata?city=${city}`).then((d)=>{
      setData(d);
    });
  },[]);


  if(!hasValue(data) || !data.hasOwnProperty('data')){
    return null;
  } else {
    console.log(data);
    return(
      <div className="weather">
        <a className="wcity" href={data.data.weather.siteUrl} rel="noopner" target="_blank">
          <img src={data.data.weather.icon} height="20" />
          <span className="cityname">{data.data.city}</span>
          <span className="citytemp">{data.data.weather.temp} C</span>
        </a>
        <Link className="waqi" to={`/${language}-news/local-news`}>
          <strong>AQI: {data.data.pollution.aqiLevel}</strong>
          <img src={data.data.pollution.icon} height="20" />
          <span style={{color: data.data.pollution.titleColor, backgroundColor: data.data.pollution.titleBg}}>{data.data.pollution.title}</span>
          <span className="changecity">Change location</span>
        </Link>
      </div>
    ) 
  }
}

export default Weather;