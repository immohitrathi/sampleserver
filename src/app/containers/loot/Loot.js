import React, { Component } from 'react';
import { Link as RLink } from 'react-router-dom'
import Helmet from 'react-helmet';
import config from '../../../config';
import { connect } from 'react-redux';
import LangTabs from './LangTabs';
import TnC from './TnC';
import FAQ from './FAQ';
import Contest from './Contest';
import Prize from './Prize';
import ReferPage from './ReferPage';
import ReactLink from '../../../utils/Link';
import TokenPrize from './TokenPrize';
const Link = ReactLink(RLink);

export class Loot extends Component {
  componentDidMount(){
    let {dispatch} = this.props;
    //dispatch(hideSubHeader(true));
  }   

  componentWillUnmount(){
    const { dispatch } = this.props;
    //dispatch(hideSubHeader(false));
  }  

  render() {  
    const {location, match} = this.props;
    const { params } = match;
    return(
      
    <div className="loot-section">
      <link href="/loot.css?v=4" type="text/css" rel="stylesheet"></link>
      <Helmet
              defaultTitle={'Newspoint Loot'}
              titleTemplate={"%s - "+config.SITE_TITLE}
              meta={[{name:"ROBOTS",content:"NOINDEX, NOFOLLOW"}, {name:'description',content:'Newspoint Loot'}]}
            />
      {params.page != 'faq' && params.page != 'refer' && params.page != 'tokenprize' ? <LangTabs params={params}/> : null}
      {
        (() => {
          switch(params.page) {
            case 'tnc':
              return <TnC params={params}/>
            case 'faq':
              return <FAQ params={params} location={location}/>
            case 'contest':
              return <Contest params={params}/>;
            case 'prize':
            return <Prize params={params}/>;
            case 'refer':
            return <ReferPage params={params}/>;
            case 'tokenprize':
            return <TokenPrize params={params}/>;
            default:
              return null;
          }
        })()
      }
    </div>
    ) 
  }
}

function mapStateToProps(state) {
  return {
    ...state.config,
  };
}

export default connect(mapStateToProps)(Loot);
