import React, {memo} from 'react';
import NewsListCardLoading from './NewsListCardLoading';

const NewsLoader = memo(({first, ad}) => {
    return (
        <>
            <NewsListCardLoading first={first} />
            {/* <NewsListCardLoading ad={ad} /> */}
            <NewsListCardLoading />
            <NewsListCardLoading />
            <NewsListCardLoading />     
            <NewsListCardLoading />     
            <NewsListCardLoading />
            <NewsListCardLoading />     
        </>
    )
});

export default NewsLoader;