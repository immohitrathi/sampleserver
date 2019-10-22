import React, { Component } from 'react';
import LazyIntersection from './LazyIntersection';

class ImgTag extends Component {
  constructor(props) {
    super(props);
    this.img = null;
  }

  componentDidMount() {
    if(this.img) {
      const hdLoaderImg = new Image();
      hdLoaderImg.src = this.img.getAttribute("data-src");
      hdLoaderImg.onload = () => {
        if(this.img)
          this.img.setAttribute('data', hdLoaderImg.src);
      }
      hdLoaderImg.onError = () => {
        if(this.img)
          this.img.setAttribute('data', "/images/appicon.svg");
      }
    }
  };  

  render() {
    let {data, width, height, placeholder, isArticleShow, isImg} = this.props;
    placeholder = "/images/appicon.svg";
    let placeholderSrc = "/images/appicon.svg";
    if(this.props.isOpera || isImg){
      if(typeof(data)!='undefined' && data!=""){
        return (<img src={data} height="100%"   alt="" style={{minHeight:'50px'}} />);
      } else {
        return (<img src={placeholder} alt="" width={width} height={height}  />);
      }
    } else {
      if(isArticleShow){
        return (
          <div  className="abgImg" >
            <div style={{background:'url('+data+') no-repeat'}}></div>
            {/* <object ref={el => this.img=el} data={placeholder} data-src={data?data:''} type="image/jpg" alt="img" title="img"><img src={placeholder} alt="" /></object> */}
            <LazyIntersection width="100%" src={typeof(data)!='undefined' && data!="" ? data : placeholderSrc} datasrc={typeof(data)!='undefined' && data!="" ? data : placeholderSrc} placeholder={placeholderSrc} />
          </div>
        )  
      } else {
        return (
          //<object alt="" ref={el => this.img=el} data={placeholder} data-src={data?data:''} type="image/jpg" alt="img" title="img"><img src={placeholder} alt="" /></object>
          <LazyIntersection width="100%" src={typeof(data)!='undefined' && data!="" ? data : placeholderSrc} datasrc={typeof(data)!='undefined' && data!="" ? data : placeholderSrc} placeholder={placeholderSrc} />
        )        
      }

    }
  }
}

export default ImgTag
