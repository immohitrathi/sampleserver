import React, {memo} from 'react';
const AstroLoading = memo(() => {
    return (
        <>
            <div className="shimmer" style={{height:'93px'}}></div>
            <div className="shimmer mt15" style={{height:'20px',width:'50%'}}></div>
            <div className="grid astroloading mt15">
                <div className="shimmer"></div>
                <div className="shimmer"></div>
                <div className="shimmer"></div>
                <div className="shimmer last"></div>
                <div className="shimmer"></div>
                <div className="shimmer"></div>
                <div className="shimmer"></div>
                <div className="shimmer last"></div>
                <div className="shimmer"></div>
                <div className="shimmer"></div>
                <div className="shimmer"></div>
                <div className="shimmer last"></div>
            </div>
        </>
    )
});

export default AstroLoading;