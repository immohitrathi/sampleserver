import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {Link as RLink} from 'react-router-dom';
import ReactLink from '../../utils/Link';
import AstroLoading from "../components/AstroLoading";
import {updateHeader , hasValue, getAstroDates, gaEvent, scrollToTop } from "../../utils/util";
import { fetchAstroListing } from "../data/ducks/astro/actions";
import Ad from "../components/Ad";
import "../data/ducks/astro/reducers";
import { useCookies } from 'react-cookie';
const Link = ReactLink(RLink);

const Astro = (props)=> {
  const [cookies, setCookies] = useCookies();
  const { location, match } = props;
  const dates = getAstroDates();
  const language = props.match.params.lang || 'english';
  let sign = "";
  sign = cookies["sign"];
  if(hasValue(sign) && !props.asMenu) {
    let url = `/${language}-news/horoscope-news/${sign}/daily/${location.search}`;
    props.history.replace(url);
  }



  useEffect(()=>{
    updateHeader("3",'ASTROLOGY', true);
    scrollToTop();
    if(!(hasValue(props.value) && props.value.length>0) || props.lang!=props.match.params.lang) {
      props.fetchAstroListing({match, cookies});
    }    
  },[props.match.params.lang]);

  const selectSign = ( event )=>{
    event.preventDefault();
    let sign = event.currentTarget.getAttribute('data-sign');
    let signName = event.currentTarget.getAttribute('data-sign-name');
    let url = event.currentTarget.getAttribute('href');
    setCookies("sign",sign, {path:'/',maxAge:(3600*24*365)});
    gaEvent("Astro","SunSignSelect",signName);
    if(props.changePopup) {
      props.changePopup();
    }
    props.history.replace(url);
  }

  if(!(hasValue(props.value) && props.value.length>0)){
    return <div className="container mt15"><AstroLoading /></div>;
  }


  return (
    <>
    <div className="container mt15 astrocss">
      {
        !props.asMenu?
        <div className="astrologycss">
          <h1>{props.app.locale.astrology_text || 'ASTROLOGY'}</h1>

          
          <label>{props.app.locale.mx_cdhoroscope || 'Check your daily horoscope here & start your day with a positive note'}</label>
        </div>
        :
        null
      }

      {/* 
        !props.asMenu?
        <Ad adtype={"ctn"} adcode={"327476"} />
        :null
       */}

      {props.asMenu?<div className={`close ${props.app.theme}`} onClick={props.changePopup}></div>:null}
      <h1 className="heading mt15">{props.app.locale.astro_change_sunsigntxt || 'Select your Sunshine'}</h1>

      {hasValue(props.value) && props.value.length>0?
        <ul className="astro mt15">
          {
            props.value.map((d, i)=>{
              return (
                <li key={i} className={`${i!==0 && i%3==2?'last':''} ${i+1==sign?'active':''}`}>
                  <Link to={`/${match.params.lang || 'english'}-news/horoscope-news/${i+1}/daily`}
                    onClick={selectSign}
                    data-sign={(i+1)}
                    data-sign-name={d.title}
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
        : 
        <div className=""><AstroLoading /></div>
      }
    </div>
    </>
  );
}


Astro.fetching = ({ dispatch, match, query }) => {
	return [dispatch(fetchAstroListing({match, query}))];
}

Astro.defaultProps = {
	value: []
};

const mapStateToProps = (state) => ({
  ...state.astro,
  app:state.app
});

const mapDispatchToProps = {
  fetchAstroListing
};
export default connect(mapStateToProps, mapDispatchToProps)(Astro);
