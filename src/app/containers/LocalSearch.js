import React, { useEffect, useContext, useRef } from 'react';
import { connect } from 'react-redux';
import {Link as RLink} from 'react-router-dom';
import ReactLink from '../../utils/Link';
import NewsLoader from "../components/NewsLoader";
import {updateHeader , hasValue, scrollToTop } from "../../utils/util";
import { fetchAllCities, fetchLocation } from "../data/ducks/city/actions";
//import Ad from "../components/Ad";
import "../data/ducks/city/reducers";
import { useCookies } from 'react-cookie';
const Link = ReactLink(RLink);
import LangContext from '../helper/LangContext';

const LocalSearch = (props)=> {
  const textBox = useRef();
  const { locale, saveCity } = useContext(LangContext);
  const [cookies, setCookies] = useCookies();
  const { location, match, history } = props;
  const language = props.match.params.lang || 'english';


  useEffect(()=>{
    updateHeader("5");
    scrollToTop();
    if(!(hasValue(props.cities.data) && props.cities.data.length>0)) {
      props.fetchAllCities({match, cookies});
    }
  },[props.match.params.lang]);

  const hideAllCityNode = () => {
    const cityList = document.querySelectorAll(".citydata");
    for(let i=0;i<cityList.length;i++) {
      cityList[i].classList.add("hide");
    }
  }

  const textBoxChange = () => {
    hideAllCityNode();
    let searchWord = textBox.current.value;
    if(hasValue(searchWord)){
      const cityList = document.querySelectorAll(".citydata[data-city^="+searchWord+"]");
      for(let i=0;i<cityList.length;i++) {
        cityList[i].classList.remove("hide");
      }
    }
  }

  const useCurrentLocation = () => {
    props.fetchLocation().then((data)=>{
      if(hasValue(data.data)){
        history.replace("/"+language+"-news/local-news/"+encodeURIComponent(data.data));
      }
    })
  }

  const selectCity = (ev) => {
    saveCity(ev.currentTarget.getAttribute('data-c'));
  }


  if(!(hasValue(props.cities.data) && props.cities.data.length>0)){
    return <div className="container mt15"><NewsLoader first={false} ad={true} /></div>;
  }

  return (
    <>
      <Link to={`/${language}-news/local-news`} className="localback"></Link>
      <input 
        type="text" 
        className="localsearch textbox" 
        placeholder={locale.search_city || "Search City"} 
        onKeyDown={textBoxChange} 
        ref={textBox}
        />
      <div className="sap"></div>
      <div className="currentloc mt15" onClick={useCurrentLocation}>Use my current location</div>
      
      {hasValue(props.cities.data) && props.cities.data.length>0?
        <div className="container mt15">
        <ul className="cities">
          {
            props.cities.data.map((d, i)=>{
              return (
                <li key={i}>
                  {/* d.key */}
                  {
                    hasValue(d.cities)?
                    <ul>
                      {
                        d.cities.map((c,j)=>{
                          return (
                            <li key={j} className="hide citydata" data-city={c.cityName.toLowerCase()} data-c={c.cityName} onClick={selectCity}>
                              <Link to={`/${language}-news/local-news/${encodeURIComponent(c.cityName)}`}>
                                  {c.cityName}
                              </Link>
                            </li>
                          )
                        })
                      }
                    </ul>
                    :null
                  }
                </li>
              )
            })
          }
        </ul>
        </div>
        : 
        <div className=""><NewsLoader /></div>
      }
      <div className="sap"></div>
    </>
  );
}


LocalSearch.fetching = ({ dispatch, match, cookies }) => {
	return [dispatch(fetchAllCities({match, cookies}))];
}

LocalSearch.defaultProps = {
	cities: {}
};

const mapStateToProps = (state) => ({
  ...state.city
});

const mapDispatchToProps = {
  fetchAllCities,
  fetchLocation
};
export default connect(mapStateToProps, mapDispatchToProps)(LocalSearch);
