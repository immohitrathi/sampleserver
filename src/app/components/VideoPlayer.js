import React, {useContext} from 'react';
import LangContext from '../helper/LangContext';

const VideoPlayer = (props) => {
    const {id, videoUrl, yt, poster, isLiveTV, img} = props;
    const { query } = useContext(LangContext);
    const appStatus = query.frmapp;
    let videourl = (videoUrl.indexOf('watch') == -1) ? videoUrl : videoUrl.replace("watch?v=", "embed/");
    //FIX: urls with http in youtube from feed
    if(videourl.indexOf('http:') != -1) {
      videourl = videourl.replace('http:', 'https:')
    }
    if(yt) {
      videourl = videourl.concat('?autoplay=1');
    }
    return (
      <div style={{height:'250px'}}>
        <div className="videoplayer-wrapper" style={id ? {display:'block', background: '#000', height: '250px'} : {display:'none'}}>
            {/*appStatus == false ? <Link to={"/"+ params.lang + '/videos/v2/watch'} style={{width: '100%', position: 'absolute', zIndex: 2, background: '#fff'}}><div className={styles.backButton} style={{display: 'inline-block', marginLeft: '10px'}}></div><span>Back</span></Link> : null*/}
            {
                yt ? 
                <iframe className="vidPlayer" id={"player_" + id} width="100%" height="250" src={id ? videourl : ''} frameBorder="0" allowFullScreen autoPlay="1" ></iframe>
                :
                <video {...(appStatus ? {muted:true} : null)} {...(appStatus ? null : {autoPlay:true})}  className="vidPlayer" id={"player_" + id} src={id ? videourl + '#t=0.5' : ''}  poster={isLiveTV ? poster : (img?img:'')} width="100%" height="250" preload="auto" controlsList="nodownload" seamless="seamless" scrolling="no" frameBorder="0"  allowFullScreen={true} controls={true} webkit-playsinline="true" playsInline ></video>
            }   
        </div>
      </div>
    )
}
export default VideoPlayer
