import React, { memo } from 'react';
import { Link as RLink } from 'react-router-dom';
import ReactLink from '../../utils/Link';
const Link = ReactLink(RLink);

const CricketAppTabs = memo(({active, url1, url2, url3, nocontent})=>{
  return (
    <div className={"ctabs "+(typeof(nocontent)=='undefined' || nocontent==false?'tabs2':'')}>
      {/* <Link to={url1} className={active==1?"active":""} data-title="MoreMatches">MORE MATCHES</Link> */}
      {typeof(nocontent)=='undefined' || nocontent==false ?<Link replace to={url3} className={active==3?"active":""} data-title="Scorecard">SCORECARD</Link>:null}
      <Link replace to={url2}  className={active==2?"active":""} data-title="Summary" >SUMMARY</Link>
    </div>
  )
});

export default CricketAppTabs;