import React, {memo} from 'react';
const AstroDetailLoading = memo(() => {
    return (
        <>
        <div className="">
          <div className="astrodetail" style={{display:'flex'}}>
            <div className="text-center" style={{width:'154px'}}>
              <div className="shimmer" style={{width:'90px', height:'90px', borderRadius:'50%',display:'inline-block'}}></div>
            </div>
            <div className="mt15"  style={{width:'calc(100% - 154px)'}}>
                <div className="shimmer"></div>
                <div className="shimmer mt15" style={{width:'50%'}}></div>
            </div>
          </div>

          <div className="tabs bborder" style={{borderBottom:'solid 1px rgba(0, 0, 0, 0.1)', marginTop:'40px'}}></div>

          <div className="desc mt15">
            <div className="shimmer mt15" style={{width:'30%'}}></div>
            <div className="shimmer mt15"></div>
            <div className="shimmer mt15"></div>
            <div className="shimmer mt15"></div>
            <div className="shimmer mt15"></div>
            <div className="shimmer mt15"></div>
            <div className="shimmer mt15" style={{width:'70%'}}></div>
          </div>

        </div>
        </>
    )
});

export default AstroDetailLoading;