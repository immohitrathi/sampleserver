import React, {memo} from 'react';
const NewsListCardLoading = memo(({ article, first, ad, cricket, d }) => {
    const cssObj = cricket?{height:d?'185px':'135px',backgroundImage:'none'}:{};
    return (
        <div className={`newsloading ${first?'first':''} ${article?'article':''} ${ad?'ad':''}`} style={cssObj}>
            <label></label>
            <label></label>
            <label className="small"></label>
            <div className="img" style={cssObj}></div>
        </div>
    )
});

export default NewsListCardLoading;