import React from 'react';
import VideoPlayer from './VideoPlayer';

const HeroCard = (props) => {
    const { currentArticle } = props;
    const  heroImg = currentArticle.hasOwnProperty('imageid') ? currentArticle.imageid : currentArticle.hasOwnProperty('image') && currentArticle.image.length > 0 ? currentArticle.image[0].id : "";
    const leadVideo = currentArticle.video && currentArticle.video.length > 0 ? currentArticle.video[0] : {};
    return (
      <>
      {
        (()=>{
          if ( leadVideo && leadVideo.hasOwnProperty('id') && leadVideo.hasOwnProperty('url') && typeof leadVideo.url != 'undefined' ) {
            let yt = leadVideo.hasOwnProperty('yt') && typeof leadVideo.yt != 'undefined' ? true : false;
            return(
              <VideoPlayer appStatus={true} id={leadVideo.id} videoUrl={leadVideo.url} yt={yt} img={leadVideo.imageid} />
            )
          }else {
            return(
              <div className={ heroImg ? "hero-image" : "hero-image noimage"}>
                {heroImg ? <div style={{backgroundImage:'url('+heroImg+')'}}></div> : null}
                <img alt='' src={heroImg ? heroImg : '/images/appicon.svg'} onError={(e)=>{e.target.onerror = null; e.target.src = '/images/appicon.svg'; e.target.parentNode.classList.add('noimage');}}/>
              </div>
            )
          }
        })()
      }
      </>
    )
}
export default HeroCard;