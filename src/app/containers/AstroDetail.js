import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link as RLink } from 'react-router-dom';
import ReactLink from '../../utils/Link';
import AstroDetailLoading from "../components/AstroDetailLoading";
import NotFound from './NotFound';
import { updateHeader, hasValue, getAstroDates, gaEvent, scrollToTop } from "../../utils/util";
import { fetchAstroDetail } from "../data/ducks/astro/actions";
//import Ad from "../components/Ad";
import "../data/ducks/astro/reducers";
import Astro from "./Astro";
import { useCookies } from 'react-cookie';

const Link  = ReactLink(RLink);

const AstroDetail = (props)=> {
  const { match } = props;
  const [cookies, setCookies] = useCookies();
  const dates = getAstroDates();
  const [tab, setTab] = useState(props.match.params.type);
  const [popUp, showPopup] = useState(false);
  const popCont = useRef();
  const languages = match.params.lang;
  
  useEffect(()=>{
    updateHeader("3",'ASTROLOGY', true);
    scrollToTop();
    props.fetchAstroDetail({match, cookies});
  },[match.params.lang, match.params.id]);
  
  const id = match.params.id || 1;

  const changeTab = ( event )=>{
    event.preventDefault();
    let sTab =event.currentTarget.getAttribute("data-tab") 
    setTab(sTab);
    gaEvent("Astro","Predictions",props.detail[tab].title+"-"+sTab);
    gaEvent("ItemTap",sTab+"Astro",languages);
  }

  const changePopup = () =>{
    showPopup(!popUp);
  }

/*   if(props.error) {
    return <NotFound message="Something went wrong!!!" />;
  } */

  return (
    <>
      {
        hasValue(props.detail) && hasValue(props.detail.daily)?
        <div className="container mt15 astrocss">
          <div className="astrodetail">
            <div className="text-center">
              <img src={`/photos/${id}.svg`} alt="" width="90" />
            </div>
            <div>
              <h1>{props.detail[tab].title}</h1>
              <label className="fs12">{dates[id-1]}</label>
              <div className="change" onClick={changePopup}>{props.app.locale.astro_strongeffect_txt || 'CHANGE'}</div>
            </div>
          </div>

          <div className="tabs bborder">
            <Link replace to={`/${languages}/horoscope/${id}/daily`} className={tab=='daily'?'active text-left1':' text-left1'} data-tab="daily" onClick={changeTab}>{props.app.locale.astro_today || 'TODAY'}</Link>
            <Link replace to={`/${languages}/horoscope/${id}/weekly`} className={tab=='weekly'?'active text-left1':'text-left1'} data-tab="weekly" onClick={changeTab}>{props.app.locale.astro_weekly || 'WEEKLY'}</Link>
            <Link replace to={`/${languages}/horoscope/${id}/monthly`} className={tab=='monthly'?'active':''} data-tab="monthly" onClick={changeTab}>{props.app.locale.astro_monthly || 'MONTHLY'}</Link>
            <Link replace to={`/${languages}/horoscope/${id}/yearly`} className={tab=='yearly'?'active text-right1':'text-right1'} data-tab="yearly" onClick={changeTab}>{props.app.locale.astro_year || 'YEARLY'}</Link>
            <span className={'magic-line'}></span>
          </div>

          <div className="desc mt15">
            <h3>{props.detail[tab].range}</h3>
            {props.detail[tab].description}
            {/* <Ad adtype={"ctn"} adcode={"327476"} /> */}
          </div>

        </div>
        :
        <div className="container mt15"><AstroDetailLoading /></div>
      }

      {
        popUp?<div className="overlay" onClick={changePopup}></div>:null
      }
      
      <div className="astrocont" ref={popCont} style={{bottom:popUp?'0px':'-150vh'}}>
        <Astro {...props} asMenu={true} changePopup={changePopup} />
      </div>
    
    </>
  );
}


AstroDetail.fetching = ({ dispatch, match, query, cookies }) => {
	return [dispatch(fetchAstroDetail({match, query, cookies}))];
}

AstroDetail.defaultProps = {
	value: []
};

const mapStateToProps = (state) => ({
  ...state.astro,
  app:state.app
});

const mapDispatchToProps = {
  fetchAstroDetail
};
export default connect(mapStateToProps, mapDispatchToProps)(AstroDetail);