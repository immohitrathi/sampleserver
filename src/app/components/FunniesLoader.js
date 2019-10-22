import React, {memo} from 'react';
import NewsListCardLoading from './NewsListCardLoading';

const FunniesLoader = memo(({first, ad}) => {
    return (
        <>
                <NewsListCardLoading ad={ad} />
                <div className="mt15"></div>
                <label className="dummy small"></label>
                <label className="dummy small"></label>
                <NewsListCardLoading first={first} />
                <label className="dummy small"></label>
                <label className="dummy small"></label>
                <NewsListCardLoading first={first} />
                <label className="dummy small"></label>
                <label className="dummy small"></label>
                <NewsListCardLoading first={first} />
                <label className="dummy small"></label>
                <label className="dummy small"></label>
                <NewsListCardLoading first={first} />
             
        </>
    )
});

export default FunniesLoader;