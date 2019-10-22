import React, { useEffect } from 'react';
import Ad from '../components/Ad';
import {useCookies} from 'react-cookie';
import {updateHeader, scrollToTop} from '../../utils/util';

const Gaana  = (props) => {
	const [cookies, setCookies] = useCookies();
	useEffect(()=>{
		updateHeader("3",'MUSIC', true);
		scrollToTop();
	},[]);

	const getTargetingDetail = () => {
		const { match } = props;
		let { query, params } = props.location;
		feedSection= 'top-news';
		let utmSource = 'pwa';
		if(typeof(query)!='undefined' && typeof(query.utm_source)!='undefined' && query.utm_source!=""){
		  utmSource = query.utm_source;
		}
		let singleLanguange = getPrefferedLang(match, cookies);
		let targeting = {
		  "Lang": singleLanguange,
		  "PUBID": 'acrosspublication',
		  "Ptype": 'Across',
		  "Section": 'Gaana',
		  "OEM": utmSource
		}
		return targeting;
	  }

	return (
		<div className="container gaanacont">
			<Ad mstype={'atf'} targeting={getTargetingDetail} />
			<iframe className="gaanaframe" src="https://gaana.com/newspoint"></iframe>
		</div>
	)
}
export default Gaana;