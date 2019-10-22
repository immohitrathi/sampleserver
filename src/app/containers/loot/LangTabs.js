import React, { memo } from 'react';
import { Link as RLink } from 'react-router-dom';
import {languageArr} from '../../../utils/util';
import ReactLink from '../../../utils/Link';
const Link = ReactLink(RLink);

const LangTabs = memo((props)=>{
    const {params} = props;
    const langSelected = typeof params.lang != 'undefined' ? params.lang.toLowerCase() : 'english';
    const filterLangs = ['Nepali', 'Asamiya', 'Urdu', 'Odia', 'Punjabi'];
    const notSupportedLangs = filterLangs.map((it)=>it.toLowerCase());
    const langList = languageArr.filter((it) => !filterLangs.includes(it.languageNameEng) );
    return(
        <div className="loot-lang-list">
            <ul>
                {langList.map((it,idx)=>{
                    let lang = it.languageNameEng;
                    let prefixUrl = params.page === 'faq' ? "/tp/" : "/loot/";
                    let url = prefixUrl + params.page + "/" + lang.toLowerCase() + (params.ssoid ? "/" + params.ssoid + "?frmapp=yes" : "?frmapp=yes");
                    let isActive = (langSelected === lang.toLowerCase() || (notSupportedLangs.includes(langSelected) && lang.toLowerCase() === 'english'));
                    return <li className={isActive ? 'active' : ''} key={it.languageCode}>
                                <Link to={url}><span>{lang}</span></Link>
                            </li>
                })}
            </ul>
        </div>
    )
})


export default LangTabs;