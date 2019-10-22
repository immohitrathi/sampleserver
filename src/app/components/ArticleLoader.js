import React, {memo} from 'react';
import NewsListCardLoading from './NewsListCardLoading';

const ArticleLoader = memo(({article, first}) => {
    return (
        <>
            <NewsListCardLoading article={article} first={first} />
            <br/>
            <div className="asloader container">
                <span className="small"></span>
                <span className="medium"></span>
            </div> 
            <br/>
            <div className="asloader  container">
                <label></label>
                <label></label>
                <label className="medium"></label>
            </div>  
            <br/>
            <br/>
            <div className="asloader container">
                <label></label>
                <label></label>
                <label className="medium"></label>
            </div> 
            <br/>
            <br/>
            <div className="asloader container">
                <label></label>
                <label></label>
                <label className="medium"></label>
            </div>         
        </>
    )
});

export default ArticleLoader;