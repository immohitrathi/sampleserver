import React, { useEffect } from 'react';
import { NavLink as RLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { hasValue, makeUrl } from '../../utils/util';
import ReactLink from '../../utils/Link';
const NavLink = ReactLink(RLink);

export default ({ nav, lang })  => {
	const [cookies, setCookie] = useCookies();
	
	useEffect(()=>{
		let elem = document.querySelector(".navigations a.active");
		if(elem){
			let left = elem.getBoundingClientRect().left;
			document.querySelector(".scrlcontent.n").scrollLeft = left -100;
		}
	},[]);

	if(hasValue(nav) && hasValue(nav.items) && nav.items.length>0) {
		return (
			<div className="scrlcontent n">
				<ul className="navigations">
					{
						nav.items.map((nav, i)=>{
							if((nav.tn=='news' || nav.tn=="movie reviews" || nav.tn=="local_news") && nav.sectionNameEnglish!='Top-news' || nav.tn == 'video') {
								let url = '';
								if(nav.tn == 'video') {
									try{
										let cat = nav.defaulturl.split('&perpage')[0].split('&categories=')[1];
										cat = makeUrl(cat);
										url = `/${lang}/videos/${cat}`;
									}catch(e){
										url = `/${lang}/videos/news`;
									}
									
								}else{
									url = `/${lang}-news/${nav.sectionNameEnglish.toLowerCase()}-news`;
									if(hasValue(cookies.city) && nav.tn=="local_news"){
										url += '/'+cookies.city;
									}
								}


								return (
									<li key={i}>
										<NavLink to={url}>
											{
												nav.tn=="local_news"? 
													hasValue(cookies.city)? cookies.city:"My City" 
													:
													nav.name
											}
										</NavLink>	
									</li>
								)
							}
						})
					}		
				</ul>
			</div>
		)
	} else {
		return null;
	}

}