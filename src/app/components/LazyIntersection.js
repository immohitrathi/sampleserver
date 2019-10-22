import React, { Component } from "react";
import PropTypes from "prop-types";

const fadeIn = `
  @keyframes gracefulimage {
    0%   { opacity: 0.25; }
    50%  { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

class LazyIntersection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      imgSrc: ""
    };
    this.elemObserver = null;
  }

  /*
    Creating a stylesheet to hold the fading animation
  */
  addAnimationStyles() {
    const exists = document.head.querySelectorAll("[data-gracefulimage]");

    if (!exists.length) {
      const styleElement = document.createElement("style");
      styleElement.setAttribute("data-gracefulimage", "exists");
      document.head.appendChild(styleElement);
      styleElement.sheet.insertRule(fadeIn, styleElement.sheet.cssRules.length);
    }
  }

  /*
    Attempts to download an image, and tracks its success / failure
  */
  loadImage() {
    const image = new Image();
    image.onload = () => {
      this.setState({ loaded: true, imgSrc: this.props.src });
    };
    image.onerror = () => {
      const newSrc = typeof this.props.useOriginalSource != 'undefined' && this.props.useOriginalSource === true ? (this.props.datasrc || this.props.placeholder) : this.props.placeholder;
      this.setState({ loaded: false, imgSrc: newSrc });
    };
    image.src = this.props.src;
    if(typeof(this.props.onLoaded) != 'undefined'){
      this.props.onLoaded();
    }
  }

  onError(e) {
    this.setState({ loaded: false });
  }


  /*
    Attempts to load an image src passed via props
    and utilises image events to track sccess / failure of the loading
  */
  componentDidMount() {
    this.addAnimationStyles();
    let _this = this;
    // if user wants to lazy load
    if (!_this.props.noLazyLoad && _this.ImageEle) {
        var elem = _this.ImageEle;
        // continue if IntersectionObserver API support available
        if ("IntersectionObserver" in window) {
          _this.elemObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting || entry.intersectionRatio > 0) {
                let tthis = entry.target;
                _this.loadImage();
                // stop watching this element
                _this.elemObserver.unobserve(tthis);
              }
            });
          }, {rootMargin: '0px 0px 100px 0px'}); //Root Margin given to load images just before coming to viewport
          _this.elemObserver.observe(elem);
        
        } else {
          // fall back 
          //console.log('!IntersectionObserver');
          _this.loadImage();
        }
    } 
  }

  componentWillReceiveProps(nextProps) {
    //FIX for on lanugage change election banner image url update
    if(this.props.src != nextProps.src && nextProps.banner) {
      this.setState({ loaded: true, imgSrc: nextProps.src });
    }
  }


  /*
    clear any existing event listeners
  */
  componentWillUnmount() {
    let _this = this;
    if(_this.ImageEle && _this.elemObserver) {
      _this.elemObserver.unobserve(_this.ImageEle)
    };
  }

  /*
    - If image hasn't yet loaded AND user didn't want a placeholder then don't render anything
    - Else if image has loaded then render the image
    - Else render the placeholder
  */
  render() {
    if (!this.state.loaded && this.props.noPlaceholder) {
      return null;
    }
    const src = this.state.imgSrc || this.props.placeholder;
    const style = this.state.loaded
      ? {
          animationName: "gracefulimage",
          animationDuration: "0.3s",
          animationIterationCount: 1,
          animationTimingFunction: "ease-in"
        }
      : { backgroundImage: 'url('+this.props.placeholder+')' };

    return (
      <img
        src={src}
        className={this.props.className}
        width={this.props.width}
        height={this.props.height}
        style={{
          ...style,
          ...this.props.style
        }}
        alt={this.props.alt}
        title={this.props.title}
        ref={this.state.loaded ? null : ref => (this.ImageEle = ref)}
        onError={this.onError.bind(this)}
      />
    );
  }
}

LazyIntersection.defaultProps = {
  src: null,
  datasrc: null,
  className: null,
  width: null,
  height: null,
  alt: "NewsPoint",
  style: {},
  placeholder: null,
  noPlaceholder: false,
  noLazyLoad: false,
  title: "NewsPoint",
  useOriginalSource: false,
  banner: false
};

LazyIntersection.propTypes = {
  src: PropTypes.string,
  datasrc: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  alt: PropTypes.string,
  style: PropTypes.object,
  noPlaceholder: PropTypes.bool,
  noLazyLoad: PropTypes.bool,
  useOriginalSource: PropTypes.bool,
  banner: PropTypes.bool
};

export default LazyIntersection;