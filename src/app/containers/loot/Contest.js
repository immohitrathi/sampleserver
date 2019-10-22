import React, { PureComponent } from 'react';
import fetch from '../../data/utils/fetch';
import config from '../../../config';
import {languageArr} from '../../../utils/util';
import NewsLoader from '../../components/NewsLoader';
class Contest extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: {}
        }
    }
    getLanguageIdByName(langSelected) {
        let langId = 1;
        let newArr = languageArr.filter((lang)=>{
            if(lang.hasOwnProperty('languageNameEng')){
              if(lang.languageNameEng.toLowerCase()==langSelected.toLowerCase()){
                return lang;
              }
            } else {
              if(lang.languageName.toLowerCase()==langSelected.toLowerCase()){
                return lang;
              }
            }
        });
        if(newArr.length>0){
          langId =  newArr[0].languageCode;
        } 
        return langId;
    }
    componentDidMount() {
        const {params} = this.props;
        const langSelected = typeof params.lang != 'undefined' ? params.lang.toLowerCase() : 'english';
        const filterLangs = ['Nepali', 'Asamiya', 'Urdu', 'Odia', 'Punjabi'];
        const notSupportedLangs = filterLangs.map((it)=>it.toLowerCase());
        let currentLanguage = notSupportedLangs.includes(langSelected) ? 'english' : langSelected;
        let langId = this.getLanguageIdByName(currentLanguage);
        let apiUrl = `${config.API_URL}/loot/contest/${langId}`;
        fetch(apiUrl).then((result)=>{
            this.setState({
                value: result
            })
        });
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.params.lang !== nextProps.params.lang) {
            const langSelected = typeof nextProps.params.lang != 'undefined' ? nextProps.params.lang : 'english';
            const filterLangs = ['Nepali', 'Asamiya', 'Urdu', 'Odia', 'Punjabi'];
            const notSupportedLangs = filterLangs.map((it)=>it.toLowerCase());
            let currentLanguage = notSupportedLangs.includes(langSelected) ? 'english' : langSelected;
            let langId = this.getLanguageIdByName(currentLanguage);
            let apiUrl = `${config.API_URL}/loot/contest/${langId}`;
            fetch(apiUrl).then((result)=>{
                this.setState({
                    value: result
                })
            });
        }
        
    }
    render() {  
        const {params} = this.props;
        const langSelected = typeof params.lang != 'undefined' ? params.lang.toLowerCase() : 'english';
        const filterLangs = ['Nepali', 'Asamiya', 'Urdu', 'Odia', 'Punjabi'];
        const notSupportedLangs = filterLangs.map((it)=>it.toLowerCase());
        let currentLanguage = notSupportedLangs.includes(langSelected) ? 'english' : langSelected;
        let langId = this.getLanguageIdByName(currentLanguage);
        return(
            <div className="loot-contest">
                {
                    typeof params.lang != 'undefined' && this.state.value.hasOwnProperty('data') && langId == this.state.value.data.lang ?
                    <div>
                        { 
                            typeof this.state.value.data.campBanner != 'undefined' && this.state.value.data.campBanner != null ?
                                <div className="banner">
                                    <img alt="" src={this.state.value.data.campBanner} alt="" />
                                </div>
                            : null
                        }
                        <article>
                            {
                                typeof this.state.value.data.campRule != 'undefined' && this.state.value.data.campRule ?
                                <div className="howto">
                                    <h2>{this.state.value.data.campRule.ruleHeadText || 'How to win?'}</h2> 
                                    
                                    {
                                        typeof this.state.value.data.campRule.rulesTextList != 'undefined' && this.state.value.data.campRule.rulesTextList && this.state.value.data.campRule.rulesTextList.length > 0? 
                                            <ul>
                                                {this.state.value.data.campRule.rulesTextList.map((item, idx)=>{
                                                    return (<li key={idx}>{item}</li>)
                                                })} 
                                            </ul>
                                        :null
                                    }
                                    
                                </div>
                                :null
                            }
                            {
                                typeof this.state.value.data.prizeDetail != 'undefined' && this.state.value.data.prizeDetail && this.state.value.data.prizeDetail.length > 0 ?
                                <div className="otherprizes">
                                    <h2>{this.state.value.data.prizeCaption || 'Other Prizes'}</h2> 
                                    
                                    <ol>
                                        {this.state.value.data.prizeDetail.map((item,idx)=>{
                                        return (<li key={idx} className={'rank_'+item.prizePosition}>
                                            <span className={"icon rank_"+item.prizePosition}></span>
                                            <div>
                                                {item.rangeText ? <span className="rangeText">{item.rangeText}</span> : null }
                                                {item.name ? <span className="prize">{item.name}</span> : null}
                                            </div>
                                           {typeof item.iconUrl != 'undefined' ? <img src={item.iconUrl} alt="" /> : null} 
                                        
                                        </li>)
                                        })} 
                                    </ol>
                                    
                                </div>
                                :null
                            }
                        </article>
                    </div>
                    :
                    <FakeListing />
                }
            </div>
        ) 
    }
}

export default Contest;
