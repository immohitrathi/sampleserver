import React, {useContext} from 'react';
import { Link as RLink } from 'react-router-dom';
import LangContext from '../helper/LangContext';
import ReactLink from '../../utils/Link';
const Link = ReactLink(RLink);

export default ({ lang, pagetype })  => {
	const { locale } = useContext(LangContext);
  	return (
		<nav className={pagetype && pagetype === 'article' ? "articlenav visible" : "nav visible"}>
			<i className="chevron" id="chevron"></i>
			<span className="explore">Explore on Newspoint</span>
			<ul>
				{	pagetype && pagetype === 'article' ? null 
					:
					<li className="dastro">
						<Link to={"/"+ lang +"-news/horoscope-news"}  data-lang={lang} data-type="amazon">
							<i></i>    
							<span>{typeof(locale)!='undefined' && locale && locale.home_astro_txt ? locale.home_astro_txt : 'Astro'}</span>
						</Link>
					</li>
				}
				<li className="dcricket">
					<Link aria-label="cricket" to={`/${lang}-news/cricket/scorecard`}  data-lang={lang} data-type="cricket">
						<i></i>    
						<span>{typeof(locale)!='undefined' && locale && locale.home_cricket_txt ? locale.home_cricket_txt : 'Cricket'}</span>
					</Link>
				</li>

				<li className="dfunnies">
					<Link aria-label="funnies" to={"/"+ lang +"/funnies"}  data-lang={lang} data-type="lol">
						<i></i>
						<span>{typeof(locale)!='undefined' && locale && locale.home_funnies_txt ? locale.home_funnies_txt : 'Funnies'}</span>
					</Link>
				</li>

				<li className="dgames">
					<Link aria-label="games" to="/games" data-lang={lang} data-type="games">
						<i></i>    
						<span>{typeof(locale)!='undefined' && locale && locale.home_games_txt ? locale.home_games_txt : 'Games'}</span>
					</Link>
				</li>

				<li className="dmusic">
					<Link aria-label="gaana" to={"/gaana"} data-lang={lang} data-type="music">
						<i></i>
						<span>{typeof(locale)!='undefined' && locale && locale.home_music_txt ? locale.home_music_txt : 'Music'}</span>
					</Link>
				</li>
				
			</ul>
		</nav>
  	)
}