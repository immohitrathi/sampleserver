import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {getFunniesUrl, gaEvent} from "../../utils/util";
import config from './../../config';
import LazyIntersection from './LazyIntersection';
import ClapAnimation from './ClapAnimation';
import Share from './Share';

class FunnyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: null,
      isPlaying: false,
      isLoaded: false,
      canPlayYoutube: false,
      muted: true
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }  

  getUrl(){
    const {item, params} = this.props;
    let lang = typeof params != 'undefined' && params.lang != undefined ? params.lang : 'english';
    let url = getFunniesUrl(item, lang);
    return url;    
  }

  componentDidMount() {
    const {item} = this.props;
    if (item.tn ==='gif' || item.tn === 'video' ) {
      this.startWatching();
    }
  }

  componentWillUnmount() {
    this.stopWatching();
  }
  startWatching() {
    let _this = this;
    if (_this.interval) { return; }
    _this.interval = setInterval(_this.checkIfInViewPort.bind(_this), 1000);
    // if dont need delayed call, check on load ( before the first interval fires )
    //this.checkIfInViewPort();
  }

  stopWatching() {
    this.interval = clearInterval(this.interval);
  }

  getShareDetail(){
    const {item,params, type, appStatus } = this.props;
    let isComics = false;
    if(typeof(type)!='undefined' && type=='comics'){
      isComics = true;
    }
    let lang = typeof(params)!='undefined' && params.lang!=undefined ? params.lang : 'english';
    let url = this.getUrl();
    url = config.SITE_URL+url;
    if(typeof isCaptainSpeaks != 'undefined' && isCaptainSpeaks == true){
       url += '?category=sports';
    }    
    gaEvent(isComics?'Comics':'Funnies',appStatus?'ShareApp':'Share',lang+"-"+item.hl);
    return {
      title:item.hl,
      url:url,
      text:item.Story
    }
  }

  checkIfInViewPort() {
    const el = ReactDOM.findDOMNode(this).querySelector('video') || ReactDOM.findDOMNode(this).querySelector('iframe');
    const elHeight = el ? el.clientHeight : 240;
    let rect;
    let containmentRect;

    // if the component has rendered to null, dont update visibility
    if (!el) {
      return this.state;
    }

    rect = el.getBoundingClientRect();
    containmentRect = {
      top: 0,
      left: 0,
      bottom: window.innerHeight || document.documentElement.clientHeight,
      right: window.innerWidth || document.documentElement.clientWidth
    };
    const visibilityRect = {
      top: rect.top >= containmentRect.top,
      left: rect.left >= containmentRect.left,
      bottom: rect.bottom <= containmentRect.bottom,
      right: rect.right <= containmentRect.right
    };

    const fullVisible = (
      visibilityRect.top &&
      visibilityRect.left &&
      visibilityRect.bottom &&
      visibilityRect.right
    );

    let isVisible = fullVisible;
    // check for partial visibility
    if (this.props.partialVisibility) {
      var partialVertical =
          (rect.top >= containmentRect.top && rect.top <= containmentRect.bottom)           // Top is visible
          || (rect.bottom >= containmentRect.top && rect.bottom <= containmentRect.bottom)  // Bottom is visible
          || (rect.top <= containmentRect.top && rect.bottom >= containmentRect.bottom);    // Center is visible


      var partialHorizontal =
          (rect.left >= containmentRect.left && rect.left <= containmentRect.right)         // Left side is visible
          || (rect.right >= containmentRect.left && rect.right <= containmentRect.right)    // Right side is visible
          || (rect.left <= containmentRect.left && rect.right >= containmentRect.right);    // Center is visible

      var partialVisible = partialVertical && partialHorizontal;

      // account for partial visibility on a single edge
      if (typeof this.props.partialVisibility === 'string') {
        partialVisible = visibilityRect[this.props.partialVisibility]
      }

      // if we have minimum top visibility set by props, lets check, if it meets the passed value
      // so if for instance element is at least 200px in viewport, then show it.
      
      isVisible = this.props.minTopValue
        ? partialVisible && rect.top <= (containmentRect.bottom - .9*elHeight)
        : partialVisible
    }
    let curState = this.state
    // notify the parent when the value changes
    if (this.state.isVisible !== isVisible) {
      curState = {
        isVisible: isVisible,
        isPlaying: isVisible ? true : false
      };
      this.setState(curState, function(){
        this.props.onChange(isVisible, this.props.dataIndex);
      }); 
    }

    return curState;
  }

  playVideo(e) {
    let _this = this;
    let item = _this.props.item;
    //let lang = (typeof(_this.props.params)!='undefined' && _this.props.params.hasOwnProperty('lang'))?_this.props.params.lang:'english';
    let video = e.currentTarget.querySelector('video');
  
    if(e.target.classList.contains('audio-icon')) return;
    
    if(video.paused){
      this.setState({isPlaying:true},function(){
        video.play();
      });
      
      if(item.tn === 'gif') {
        // gaEvent('VideContent-Portrait-FunniesGif','Play-'+item.pubInfo.pid+'-'+lang,item.publiser+'-'+item.hl);
      }else {
        // gaEvent('VideContent-Portrait-FunniesPlay','Play-'+item.pubInfo.pid+'-'+lang,item.publiser+'-'+item.hl);
      }
    }else{
      this.setState({isPlaying:false},function(){
        video.pause();
      });
    }
    
  }

  changeAudioStatus() {
    this.setState(prevState => ({
      muted: !prevState.muted
    }));
  }

  onLoaded() {
    this.setState({isLoaded:true});
  }
  youtubeVideoClick() {
    this.setState({canPlayYoutube:true});
  }
  render() {    
    let {item, dataIndex, params, applaudText, shareText} = this.props;
    let url = this.getUrl();
    return (
      <div className="funny-card funny-url" data-href={url}>
        
          <div className="funny-card-head"> 
            <div className="heading">{item.hl}</div>
              <div className="publisher">{item.publiser} </div>
          </div>
          <div className="funny-card-content">
            {
              (()=>{
                if(item.tn == 'meme'){
                  return(  
                    <LazyIntersection alt={""} datasrc={item.imageid} src={"https://opt.toiimg.com/recuperator/imgserver/serve?dimension=600&source="+encodeURIComponent(item.imageid)} height={item.height} width={item.width} placeholder="" useOriginalSource={true}/>
                  )
                }else if(item.tn == 'gif'){
                  //console.log('gif>>isPlaying',dataIndex, this.state.isPlaying,this.state.isLoaded) 
                  if(this.state.isLoaded){
                    if(this.state.isPlaying){
                      return(
                      <div className="video-wrapper" onClick={this.playVideo.bind(this)}>
                        <video className="video-player" poster={item.imageid} width="100%" height="auto" loop muted scrolling="no" webkit-playsinline="true" playsInline>
                          <source src={item.pu} type="video/mp4"/>
                        </video>
                        <div className="spinner"></div>
                      </div>)
                    }else{
                      return(
                      <div className="video-wrapper" onClick={this.playVideo.bind(this)}>
                        <video className="video-player" poster={item.imageid} width="100%" height="auto" loop muted scrolling="no" webkit-playsinline="true" playsInline>
                          <source src={item.pu} type="video/mp4"/>
                        </video>
                        <div className="play-icon gif"></div>
                      </div>)
                    }
                  }else{
                    return(  
                      <LazyIntersection alt={""} datasrc={item.imageid} src={"https://opt.toiimg.com/recuperator/imgserver/serve?dimension=600&source="+encodeURIComponent(item.imageid)} height={240} width={400} placeholder="" onLoaded={this.onLoaded.bind(this)} useOriginalSource={true}/>
                    )
                  }
                }else{
                  if(typeof(item.yt)!='undefined'){
                    let src = item.pu.replace("watch?v=", "embed/");
                    src = src.concat('?autoplay=1&rel=0');
                    if(this.state.canPlayYoutube){
                      return(
                        <div onClick={this.youtubeVideoClick.bind(this)}>
                          <div className="youtube-wrapper">
                            <iframe className="iframe-player" controls="0" playsInline width="100%" height="240" src={src} frameBorder="0"></iframe>
                          </div>
                        </div>
                      )
                    }else{
                      return(  
                        <div onClick={this.youtubeVideoClick.bind(this)}>
                          <LazyIntersection alt={""} datasrc={item.imageid} src={"https://opt.toiimg.com/recuperator/imgserver/serve?dimension=600&source="+encodeURIComponent(item.imageid)} height={240} width={400} placeholder="" onLoaded={this.onLoaded.bind(this)} useOriginalSource={true}/>
                          <div className="play-icon video"></div>
                        </div>
                      )
                    }
                  }else{
                    if(this.state.isLoaded){
                      if(this.state.isPlaying){
                        return(
                        <div className="video-wrapper" onClick={this.playVideo.bind(this)}>
                          <video className="video-player" poster={item.imageid} width="100%" height="auto" loop {...(this.state.muted ? {muted:true} : null)} scrolling="no" webkit-playsinline="true" playsInline>
                            <source src={item.pu} type="video/mp4"/>
                          </video>
                          <div className={this.state.muted ? "audio-icon muted" : "audio-icon"} onClick={this.changeAudioStatus.bind(this)}></div>
                        </div>)
                      }else{
                        return(
                        <div className="video-wrapper" onClick={this.playVideo.bind(this)}>
                          <video className="video-player" poster={item.imageid} width="100%" height="auto" loop muted scrolling="no" webkit-playsinline="true" playsInline>
                            <source src={item.pu} type="video/mp4"/>
                          </video>
                          <div className="play-icon video"></div>
                        </div>)
                      }
                    }else{
                      return(  
                        <LazyIntersection alt={""} datasrc={item.imageid} src={"https://opt.toiimg.com/recuperator/imgserver/serve?dimension=600&source="+encodeURIComponent(item.imageid)} height={240} width={400} placeholder="" onLoaded={this.onLoaded.bind(this)} useOriginalSource={true}/>
                      )
                    }
                  }
                }
              })()
              
            }
          </div>

          <div className="funny-card-foot">
            <div className="applaud">
              <ClapAnimation dataIndex={dataIndex} applaudText={applaudText} likes={item.likes} itemType={item.tn} itemId={item.id} item={item} lang={params.lang} isComics={true} appStatus={this.props.appStatus}/>
            </div>
            <div className='share'  style={{paddingRight:'6px'}}>
              <Share utmSource='pwa' utmCampaign={typeof(type) != 'undefined' && type == 'comics' ? 'comics' : 'funnies'} sharedata={this.getShareDetail.bind(this)} type="gvm" shareText={shareText} />  
            </div>
          </div>

      </div>
    )
    
  }
}

export default FunnyCard
