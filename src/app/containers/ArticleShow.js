import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchArticleShow, fetchNextArticleShow} from '../data/ducks/articleshow/actions';
import { fetchListing, fetchNextListing} from '../data/ducks/home/actions';
import { hasValue } from '../../utils/util';
import ArticleLoader from '../components/ArticleLoader';
import config from '../../config';
import CtnAds from '../../utils/ctnAds';
import '../data/ducks/articleshow/reducers';
import '../data/ducks/home/reducers';
import Perpetual from '../components/Perpetual';
import {elementInView, silentRedirect, gaEvent, throttle, scrollToTop, updateHeader, formatHeaderText, getQueryString } from '../../utils/util';
import NotFound from './NotFound';
import { withCookies } from 'react-cookie';
import ArticleFooter from '../components/ArticleFooter';

export class ArticleShow extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      scrollEventBind:false,
      currentNewsItemIndex:0,
      footerarticle: null
    };
    this.bindHandleScroll = null;   
    this.articlelistLoaded = false;
    this.timeout1 = null;
    this.timeout2 = null;
    this.isFetched = false;
    this.pushedUrl = "";
    this.curProcessingId = "";
    this.nextListingActive = false;
  }

  componentDidMount() {
    const self = this;
    const { match, cookies, location } = self.props;
    const query = getQueryString(location);
    try{
      scrollToTop();
      self.props.fetchArticleShow({match, query, cookies}).then(()=>{
        self.timeout1 = window.setTimeout(() =>{
          let section = self.props.articleshow && self.props.articleshow.feedSection ?  formatHeaderText(self.props.articleshow.feedSection) : 'Top News';
          updateHeader("3", section, true);
          self.renderAdsAndEmbeds();
          self.attachScrollEvent(self);
        },100);
        let item = typeof self.props.articleshow != 'undefined' && self.props.articleshow.hasOwnProperty('items') && self.props.articleshow.items.length > 0 ? self.props.articleshow.items[0].it : {};
        self.setState({footerarticle : item});
      });
    }catch(ex){
      console.log(ex)
      self.renderAdsAndEmbeds();
      self.attachScrollEvent(self);
    }
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.bindHandleScroll);
    this.state.scrollEventBind = false;
    window.clearTimeout(this.timeout1);
    window.clearTimeout(this.timeout2);
    this.curProcessingId = "";
    this.pushedUrl = "";
    this.props.articleshow.error = false;
    this.nextListingActive = false;
    this.articlelistLoaded = false;
    this.isFetched = false;
  }

  attachScrollEvent(self){

    if(this.state.scrollEventBind == false) {
      this.bindHandleScroll = throttle(self.handleScroll.bind(self));
      window.addEventListener('scroll',this.bindHandleScroll);
      this.setState({
        scrollEventBind: true
      });
    }
  }

  handleScroll() {

    const self = this;

    if(self.state.scrollEventBind == false) {
      return;
    }
    
    self.trackersOnScroll();
    
    const { isFetching } = self.props;
    const { match, cookies } = self.props;

    if(!self.isFetched && !self.articlelistLoaded ) {
      self.isFetched = true;
      self.props.fetchListing({match, cookies}).then(()=>{
        self.articlelistLoaded = true;
      });
      
    }
    
    let mainWrapper = document.getElementById('perpetualContainer');
    let len = self.props.articleshow.items.length;
    let curId = len > 0 && typeof self.props.articleshow.items[len-1] != 'undefined' && typeof self.props.articleshow.items[len-1].it != 'undefined' && self.props.articleshow.items[len-1].it.id  ? self.props.articleshow.items[len-1].it.id : null;
    let el = curId ? mainWrapper.querySelector('[data-id="'+curId+'"]') : null;
    let articleTitleVisible = el ? elementInView(el, true, - window.innerHeight/2 ) : false;
    let fireNextHit = len > 0 ? self.props.articleshow.items[len-1].fetched : false;
    if(!isFetching && self.articlelistLoaded && articleTitleVisible && !fireNextHit && self.curProcessingId != curId ){
      self.curProcessingId = curId;
      let nextIdx = self.getIndexOfNewsItem(curId) + 1;
      self.setState({currentNewsItemIndex : nextIdx},()=>{
        self.getNextArticle(self.state.currentNewsItemIndex);
      })
    }
  }

  getIndexOfNewsItem(curId) {
    const self = this;
    const newsItems =  typeof self.props.home != 'undefined' && self.props.home.value.hasOwnProperty('newsItems') && self.props.home.value.newsItems.length > 0 ? self.props.home.value.newsItems : [];
    let index = newsItems.findIndex(it => it.id == curId);
    return index;
  }

  getNextArticle(index) {  
    const self = this;
    const { match, cookies, location } = self.props;
    const query = getQueryString(location);
    let totalSlides = 10;
    try{
      if(typeof self.props.home != 'undefined' && self.props.home.value.hasOwnProperty('newsItems') && self.props.home.value.newsItems.length > 0 && typeof self.props.home.value.newsItems[index] != 'undefined'){
        totalSlides = self.props.home.value.newsItems.length;
      }
      if(!self.props.articleshow.error) {
        self.props.fetchNextArticleShow({match, query, cookies, id:self.props.home.value.newsItems[index].id}).then(()=>{
          self.timeout2 = window.setTimeout(() =>{
            self.renderAdsAndEmbeds();
          },100);
        });
        
        if((index + 5) >= totalSlides && !self.props.home.error && !self.nextListingActive){
          self.nextListingActive = true;
          self.props.fetchNextListing({match, cookies}).then(()=>{
            self.nextListingActive = false;
          });
        }
      }
    }catch(ex){
      console.log(ex);
    }
  }

  trackersOnScroll() {
    const self = this;
    let {items} = self.props.articleshow;
    let mainWrapper = document.getElementById('perpetualContainer');
    for (let i = 0; i < items.length ; i++) {
      let item = items[i];
      let article = mainWrapper.querySelector(`[data-id="${item.it.id}"]`);
      let url;
      if(article && elementInView(article, true, - window.innerHeight/2 )) {
        let idx = self.getIndexOfNewsItem(item.it.id);
        if(idx != -1 && typeof self.props.home != 'undefined' && self.props.home.value.hasOwnProperty('newsItems') && self.props.home.value.newsItems.length > 0 && typeof self.props.home.value.newsItems[idx] != 'undefined'){
          if(self.props.home.value.newsItems[idx].mwu) {
            url = self.props.home.value.newsItems[idx].mwu;
          }else if(typeof self.props.articleshow.url != 'undefined') {
            url = self.props.articleshow.url;
          }
        } else if(typeof self.props.articleshow.url != 'undefined'){
          url = self.props.articleshow.url;
        } 
        let tempurl = location.origin + url;
        if(tempurl != location.href){
          document.title = item.it.hl;
        }
        // trigger page view on page load
        if(typeof url != 'undefined' &&  url != self.pushedUrl){
          self.pushedUrl = url;
          //carry forward the same utm params
          let transformedUrl = location.origin + self.transformURL(url);
          silentRedirect(transformedUrl); 
          gaEvent('Perpetualscroll','Article',self.props.language);
          
        }
        self.setState({footerarticle : item.it});
        break;
      }
    }

  }

  transformURL(u) {
    let base = config.SITE_URL;
    try{
      let url1 = new URL(location.href, base);
      let url1Search = url1.search;
      let url2 = new URL(u, base);
      return url2.pathname + url1Search;
    }catch(e){
      console.log('Invalid URL: ', e);
      u = u.replace(base,'');
      return u;
    }
    
  }

  renderAds() {
    const self = this;
    let storyWrapper = document.querySelector('.story-card');
    
    if(document.getElementById('perpetualContainer')) {
      let artId = self.props.articleshow.items.length > 0 && self.props.articleshow.items[self.props.articleshow.items.length -1].hasOwnProperty('it') && self.props.articleshow.items[self.props.articleshow.items.length -1].it.hasOwnProperty('id') ? self.props.articleshow.items[self.props.articleshow.items.length -1].it.id : "";
      let articleWrapper = artId ? document.getElementById('perpetualContainer').querySelector('[data-id="' + artId + '"]') : document.getElementById('perpetualContainer').querySelector('[data-id="' + self.props.match.params.id + '"]');
      storyWrapper = articleWrapper ? articleWrapper.querySelector('.story-card') : '';
    }

    let inlineAds = storyWrapper ? storyWrapper.querySelectorAll('[data-plugin="ctn"]') : [];
    if(inlineAds.length > 0){
      [].forEach.call(inlineAds,(ele) => {
        CtnAds.render({} , ele) ;
      });
    }
  }

  renderAdsAndEmbeds() {
    const self = this;
    self.renderAds();
    try{
      //twttr.widgets.load();
      window.instgrm.Embeds.process();  
    }catch(ex){}
  }

  render() {
    let { articleshow, app, isFetching } = this.props;
    const { params  } = this.props.match;
    let isArticleDataAvailable = hasValue(articleshow) && hasValue(articleshow.items) && articleshow.items.length > 0 &&  articleshow.items[0].status == 'OK' && articleshow.items[0].hasOwnProperty('it') && articleshow.items[0].it.id == params.id ? true : false;
    if(isArticleDataAvailable){
      return (
        <div id="perpetualContainer" role="main" className="">
          {
            articleshow.items.map((item,index)=>{
              return(
                <Perpetual
                  ymlHeadText={typeof app.value != 'undefined' && app.value.you_may_also_like ? app.value.you_may_also_like : 'You may also like'} 
                  seeAll={typeof app.value != 'undefined' && app.value.see_all ? app.value.see_all : 'See All'} 
                  params={params} 
                  key={typeof item != 'undefined' ? item.it.id : index} 
                  index={index}
                  items={articleshow.items}  
                  currentArticle={typeof item != 'undefined' ? item.it : ''}
                  nextStoryText={typeof app.value != 'undefined' && app.value.next_story ? app.value.next_story : 'Next Story'}
                />
              )
            })
          }
          <ArticleFooter article={this.state.footerarticle}/>
          { isFetching ? <ArticleLoader article={true} first={true}/> : null}
        </div>
      )
    }else {
      if(articleshow.error === true ) {
        return <NotFound />;
      } else{
        return <ArticleLoader article={true} first={true}/>;
      }
      
    }
  }
}

ArticleShow.fetching = ({ dispatch, match, query, cookies }) => {
	return [dispatch(fetchArticleShow({match, query, cookies}))];
}

const mapStateToProps = (state) => ({
	articleshow: state.articleshow,
  home: state.home,
  app: state.app
});

const mapDispatchToProps = {
	fetchArticleShow,
  fetchNextArticleShow,
  fetchListing,
  fetchNextListing
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(ArticleShow));