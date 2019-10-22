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
        let apiUrl = `${config.API_URL}/loot/prize/${langId}/${params.ssoid}`;
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
            let apiUrl = `${config.API_URL}/loot/prize/${langId}/${nextProps.params.ssoid}`;
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
                    typeof params.lang != 'undefined' && typeof params.ssoid != 'undefined' && this.state.value.hasOwnProperty('data') && langId == this.state.value.data.lang ?
                    <div>
                        { 
                            typeof this.state.value.data.prizeBanner != 'undefined' && this.state.value.data.prizeBanner != null ?
                                <div className="banner">
                                    {this.state.value.data.congoText ?<p className="congotext">{this.state.value.data.congoText}</p> : null }
                                    {this.state.value.data.prizeName ?<p className="prizename">{this.state.value.data.prizeName}</p> : null }
                                    {this.state.value.data.prizeBanner ?<img src={this.state.value.data.prizeBanner} alt="" /> : null }
                                </div>
                            : null
                        }
                        <article>
                            {
                                typeof this.state.value.data.campRule != 'undefined' && this.state.value.data.campRule ?
                                <div className="howto">
                                    <h2>{this.state.value.data.campRule.ruleHeadText || 'Next Steps'}</h2> 
                                    
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
                        </article>
                    </div>
                    :
                    <NewsLoader />
                }
            </div>
        ) 
    }
}

export default Contest;
