import React, {memo} from 'react';
const PhotoListCardLoading = memo(({ odd }) => {
    return (
        <div className={`photolist ${odd?'odd':''}`}>
            <label className="dummy"></label>
            <label className="dummy small"></label>
            <div className="flex-body">
                <div className="flexc flex-row">
                    <div  className="img dummy">
                        
                    </div>
                </div>
                <div className="flexc flex-column">
                    <div className="w30 img dummy">
                        
                    </div>
                    <div className="w30 img dummy">
                        
                    </div>
                </div>
            </div>
        </div>
    )
});

export default PhotoListCardLoading;