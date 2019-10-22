import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import {Link as RLink} from 'react-router-dom';
import ReactLink from '../../utils/Link';
import NewsLoader from "../components/NewsLoader";
import {updateHeader , hasValue, scrollToTop } from "../../utils/util";
import { fetchPopularCities } from "../data/ducks/city/actions";
//import Ad from "../components/Ad";
import "../data/ducks/city/reducers";
import { useCookies } from 'react-cookie';
const Link = ReactLink(RLink);
import LangContext from '../helper/LangContext';

const Local = (props)=> {
  const { locale, saveCity } = useContext(LangContext);
  const [cookies, setCookies] = useCookies();
  const { location, match } = props;
  const language = props.match.params.lang || 'english';


  useEffect(()=>{
    updateHeader("2");
    scrollToTop();
    if(!(hasValue(props.popular.data) && props.popular.data.length>0)) {
      props.fetchPopularCities({match, cookies});
    }    
  },[props.match.params.lang]);

  const selectCity = (ev) => {
    saveCity(ev.currentTarget.getAttribute('data-c'));
  }


  if(!(hasValue(props.popular.data) && props.popular.data.length>0)){
    return <div className="container mt15"><NewsLoader first={false} ad={true} /></div>;
  }

  return (
    <>
    <div className="container mt54 local">
      <h1 className="heading">{locale.popularCityText || 'POPULAR CITIES'}</h1>

      {hasValue(props.popular.data) && props.popular.data.length>0?
        <ul className="popular">
          {
            props.popular.data.map((d, i)=>{
              return (
                <li key={i} onClick={selectCity} data-c={d.cityName}>
                  <Link to={`/${language}-news/local-news/${d.cityName}`}>
                    <img src={d.cityImageUrl} />
                    <div>{d.cityName}</div>
                  </Link>
                </li>
              )
            })
          }
        </ul>
        : 
        <div className=""><NewsLoader /></div>
      }
    </div>
    <div className="container mt15">
      <Link to={`/${language}-news/local-news/search`} className="localsearch">
        {locale.search_city || "Search City"}
      </Link>
    </div>
    </>
  );
}


Local.fetching = ({ dispatch, match, cookies }) => {
	return [dispatch(fetchPopularCities({match, cookies}))];
}

Local.defaultProps = {
	popular: {}
};

const mapStateToProps = (state) => ({
  ...state.city
});

const mapDispatchToProps = {
  fetchPopularCities
};
export default connect(mapStateToProps, mapDispatchToProps)(Local);
