import React from 'react';
import CricketCard from "./CricketCard";
import { Link as RLink } from 'react-router-dom';
import {gaEvent} from '../../utils/util';
import ReactLink from '../../utils/Link';
const Link = ReactLink(RLink);

const CricketUpcomingWidget = ({items, lang, seeall, upcoming_matches}) => {
    items = items.slice(0,5);
    const fireGAEvent = () => {
        gaEvent("Cricket","ViewAllUpcoming");
    }
    return (
        <>
            <h3 className="umtitle">{upcoming_matches || "Upcoming Matches"}</h3>
            <div className="scrlcontent">
                <ul className="ucont">
                {
                    items.map((it)=> <li key={it['$']['match_Id']}><CricketCard item={it} currentTab={'upcoming'} hideType={true} language={lang} /></li>)
                }
                </ul>
            </div>
            <div  className="border"></div>
            <div className="text-center">
                <Link to={`/${lang}-news/cricket/upcoming`} className="match-summary seeall noafter" onClick={fireGAEvent}>
                    {seeall || "SEE ALL MATCHES"}
                    <span className="rightarrow">&rsaquo;</span>
                </Link>
            </div> 
        </>
    )
}

export default CricketUpcomingWidget;