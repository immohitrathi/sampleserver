import React, {useContext} from 'react';
import { languageArr, hasValue } from '../../utils/util';
import LangContext from '../helper/LangContext';
import { useCookies } from 'react-cookie';

const LangList = (({selectedLang, history, setHide}) => {
    const [cookies, setCookie] = useCookies();
    const { locale, updateLanguage } = useContext(LangContext);
    selectedLang = selectedLang || "";
    selectedLang = selectedLang.split('-');

    const saveLanguages = () => {
        const list = document.querySelectorAll(".langlist li.active"); 
        if(list.length>0){
          const languageList = [];
          for(let i=0;i<list.length;i++) {
            languageList.push(list[i].getAttribute('data-lang'));
          }
          let langFinalList = languageList.join("-");
          setCookie("userLanguages", langFinalList, {path:'/',maxAge:(3600*24*365)});
          history.push("/"+langFinalList+"-news");
          updateLanguage(langFinalList);
        }
        if(setHide){
            setHide(true);
        }
    }

    const toggleClass = (event) => {
        event.currentTarget.classList.toggle("active");
    }    

    return (
        <>
        <div className="scrlcontent mt16">
            <ul className="langlist">
            {languageArr.map((l, i)=>{
                return (
                <>
                <li 
                    data-lang={l.languageNameEng.toLowerCase()} 
                    key={l.languageCode} 
                    onClick={toggleClass}
                    className={`${selectedLang.indexOf(l.languageNameEng.toLowerCase())!==-1?'active':''}`}
                >
                    {l.languageName}
                </li>
                {i==6?<li className="clear" key={20}></li>:null}
                </>
                )
            })}
            </ul>
        </div>
        <button className="buttonlang" onClick={saveLanguages}>{locale.settings_save || "SAVE"}</button>
        </>
    )
});
export default LangList;