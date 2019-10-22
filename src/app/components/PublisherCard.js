import React from 'react';

const PublisherCard = (props) => {
    const { currentArticle } = props;
    const  pn = currentArticle.hasOwnProperty('pn') && currentArticle.pn ? currentArticle.pn : "";
    const  pnu = currentArticle.hasOwnProperty('pnu') && currentArticle.pnu ? currentArticle.pnu : "";
    const  dl = currentArticle.hasOwnProperty('dl') && currentArticle.dl ? currentArticle.dl : "";
    return (
      <>
      {
        <div className="publisher-card container">
          { pnu ? <img alt='' width="20" height="20" src={pnu} onError={(e)=>{e.target.onerror = null; e.target.src = '/images/appicon.svg';}} />  : null}
          
          <div>
            { pn ? <div className="pname">{pn}</div> : null }
            { dl ? <div className="date">{dl}</div> : null }
          </div>
        </div>
      }
      </>
    )
}
export default PublisherCard;