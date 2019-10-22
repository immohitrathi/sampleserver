import React, {memo, useState, useContext} from 'react';
import { useCookies } from 'react-cookie';
import { languageArr, hasValue } from '../../utils/util';
import LangContext from '../helper/LangContext';
import LangList from './LangList';

const LanguageSelection = memo(({ history }) => {
  const { locale } = useContext(LangContext);
  const [cookies, setCookie] = useCookies();
  const [hide,setHide] = useState(false);

  if(hasValue(cookies.userLanguages) || hide){
    return null;
  }

  const hideOverlay = ()=>{
    setHide(true);
  }

  return (
      <>
      <div className="overlay" onClick={hideOverlay}></div>
      <div className="lselection">
        <h3>{locale.lss_select_language || "Select your language"}</h3>
        <LangList history={history} setHide={setHide} />
      </div>
      </>
  )
});

export default LanguageSelection;