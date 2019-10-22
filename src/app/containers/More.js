import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import {Link as RLink} from 'react-router-dom';
import ReactLink from '../../utils/Link';
import {updateHeader, scrollToTop } from "../../utils/util";
import { useCookies } from 'react-cookie';
const Link = ReactLink(RLink);
import LangList from '../components/LangList';
import LangContext from '../helper/LangContext';
import Login from '../components/Login';

const More = (props)=> {
	const [cookies, setCookies] = useCookies();
	const { history, match } = props;
	const { locale } = useContext(LangContext);
	const lang = match.params.lang || "english";

  useEffect(()=>{
		scrollToTop(0);
    updateHeader("5");    
  },[]);

  return (
    <>
			<div className="logincont">
				<div className="profilepic"><img src="/photos/profile-pic.svg" /></div>
				<Login location={props.location} loginText={locale.settings_login || 'Login'} logoutText={locale.settings_logout || 'Logout'} />

				<div className="dflex subline">
					<div>Stay updated with the latest news</div>
					<div>
						<a rel="noopener" href="https://go.onelink.me/XsIL?pid=Np_home_wap_app&c=wap_app" target="_blank" className="getapp">{locale.home_getapp || 'GET APP'}</a>
					</div>
				</div>
			</div>

			<div className="morecont container mt16">
				<h3>LANGUAGE PREFERENCE</h3>
				<LangList selectedLang={cookies['userLanguages']} history={history} />
			</div>

			<div className="morenavlist container">
				<ul>
					<li className="dastro">
							<Link to={"/"+ lang +"-news/horoscope-news"}  data-lang={lang} data-type="amazon"> 
								<span>{ locale.home_astro_txt || 'Astro'}</span>
							</Link>
					</li>

					<li className="dcricket">
						<Link aria-label="cricket" to={`/${lang}-news/cricket/scorecard`}  data-lang={lang} data-type="cricket">  
							<span>{ locale.home_cricket_txt || 'Cricket'}</span>
						</Link>
					</li>

					<li className="dfunnies">
						<Link aria-label="funnies" to={"/"+ lang +"/funnies"}  data-lang={lang} data-type="lol">
							<span>{locale.home_funnies_txt || 'Funnies'}</span>
						</Link>
					</li>

					<li className="dgames">
						<Link aria-label="games" to="/games" data-lang={lang} data-type="games"> 
							<span>{locale.home_games_txt || 'Games'}</span>
						</Link>
					</li>

					<li className="dmusic">
						<Link aria-label="gaana" to={"/gaana"} data-lang={lang} data-type="music">
							<span>{locale.home_music_txt || 'Music'}</span>
						</Link>
					</li>
				</ul>
			</div>
			<div className="sap"></div>
    </>
  );
}

export default More;
