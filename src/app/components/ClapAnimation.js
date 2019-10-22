import React, { Component } from 'react'
import { Link as RLink } from 'react-router-dom'
import {addClass, gaEvent} from '../../utils/util';
import { updateLikesCount } from '../data/ducks/funnies/actions';
import ReactLink from '../../utils/Link';
const Link = ReactLink(RLink);

export function abbreviateNumber(number) {
  var SI_POSTFIXES = ["", "k", "M", "G", "T", "P", "E"];
  var tier = Math.log10(Math.abs(number)) / 3 | 0;
  if(tier == 0) return number;
  var postfix = SI_POSTFIXES[tier];
  var scale = Math.pow(10, tier * 3);
  var scaled = number / scale;
  var formatted = scaled.toFixed(1) + '';
  if (/\.0$/.test(formatted))
    formatted = formatted.substr(0, formatted.length - 2);
  return formatted + postfix;
}


class ClapAnimation extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        count: 0,
        countTotal: props.likes,
        isClicked: false,
        itemId: props.itemId,
        itemType: props.itemType
      }
      this._handleClick = this._handleClick.bind(this);
    }
  
    componentDidMount() {
      if(typeof(window)!='undefined'){
        let index = this.props.dataIndex;
      }
    }
    
    _handleClick () {
      let _this = this;
      let {isComics, item, appStatus, lang} = this.props;
      this.setState(function(prevState, nextState) {
        return {
          count: Math.min(prevState.count + 1, 1000),
          countTotal: prevState.countTotal + 1,
          isClicked: true
        }
      })
      document.querySelector("#clap--count--"+_this.props.dataIndex).classList.add('clapCountAnimate');
      document.querySelector("#clap_"+_this.props.dataIndex).querySelector('.clap-wrapper').classList.add('clapAnimate');
      window.setTimeout(function(){
        document.querySelector("#clap--count--"+_this.props.dataIndex).classList.remove('clapCountAnimate');
        document.querySelector("#clap_"+_this.props.dataIndex).querySelector('.clap-wrapper').classList.remove('clapAnimate');
      },500);
      //object to post current likes
      updateLikesCount(this.state.itemType, this.state.itemId,1);
      if(isComics==true){
        gaEvent('Comics',appStatus?'ClapApp':'Clap',lang+"-"+item.hl);
      } else {
        gaEvent('Funnies','Applaud',this.state.itemType);
      }
      
    }
    
    render() {
      const {count, countTotal, isClicked} = this.state;
      const {applaudText, dataIndex} = this.props;
      return getAppContent(count, countTotal, isClicked, this._handleClick,applaudText,dataIndex)
    }
  }
  
  function getAppContent(count, countTotal, isClicked, handleClick,applaudText,dataIndex) {
    return <div onClick={handleClick}><button id={"clap_"+dataIndex} className={" clap"} >
    
    <div className="clap-wrapper"></div>
    <span id={"clap--count--"+dataIndex} className={"clap-count"}>+{count}</span>
    
  </button>
  <span id={"clap--count--total--"+dataIndex} className={"clap-count-total"}>{abbreviateNumber(countTotal)}</span>
    </div>
  }
  

export default ClapAnimation