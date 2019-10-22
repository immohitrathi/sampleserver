import React, {useContext} from 'react';
import { NavLink as RLink } from 'react-router-dom';
import { hasValue } from '../../utils/util';
import ReactLink from '../../utils/Link';
import { useCookies } from 'react-cookie';
const NavLink = ReactLink(RLink);
import LangContext from '../helper/LangContext';

export default ({ nav, lang })  => {
  const { locale } = useContext(LangContext);
  const [cookies, setCookie] = useCookies();

  let headingLink = "/";
  if(hasValue(nav) && hasValue(nav.items) && nav.items.length>0) {
    for(let i=1; i<nav.items.length;i++) {
      if(nav.items[i].tn=='news' || nav.items[i].tn=='movie reviews' || nav.items[i].tn=='local_news') {
        headingLink = `/${lang}-news/${nav.items[i].sectionNameEnglish.toLowerCase()}-news`;
        if(hasValue(cookies.city)){
          headingLink += '/'+cookies.city;
        }
        break;
      }
    }
   }

  const shouldActive = (match, location) => {
    if( location.pathname.indexOf("-news/")!==-1 && 
        location.pathname.indexOf("photos-news")==-1 && 
        location.pathname.indexOf("/cricket/")==-1 &&
        location.pathname.indexOf("/horoscope-news")==-1 &&
        location.pathname.indexOf("/horoscope-news")==-1
      ){
      return true;
    }
    return false;
  }

  const shouldVideoActive = (match, location) => {
    if( location.pathname.indexOf("/videos/")!==-1 ){
      return true;
    }
    return false;
  }


  return (
		<footer className="bs">
        <ul>
          <li>
            <NavLink to="/" exact={true} className={`navfooter foryou`}>For you</NavLink>
          </li>
          <li>
            <NavLink to={headingLink} isActive={shouldActive} className={`navfooter headlines`}>Headlines</NavLink>
          </li>
          <li>
            <NavLink to={`/${lang}/videos/top-videos`} isActive={shouldVideoActive} className={`navfooter videos`}>{locale.el_videos || "Videos"}</NavLink>
          </li>
          <li>
            <NavLink to={`/${lang}-news/photos-news`} className={`navfooter photos`}>{locale.bookmark_photo_title || "Photos"}</NavLink>
          </li>
          <li>
            <NavLink to={`/${lang}/more`} className={`navfooter more posrel`}>{locale.more || "More"}</NavLink>
          </li>
        </ul>			
		</footer>
	)
}