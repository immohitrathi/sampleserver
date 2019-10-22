import React from 'react';
import NewsListCard from './NewsListCard';
import {gaEvent} from '../../utils/util';

const NextStoryCard = (props) => {
    const { nextArticle, nextStoryText} = props;
    
    const handleNextStoryClick = (id) => {
      const lang = props.lang || 'english';
      gaEvent("StoryTap","NextStory",lang);
      if(id) {
        try{
          let ele = document.querySelector('[data-id="'+id+'"]');
          if(ele) {
            ele.scrollIntoView({behavior: "smooth", block: 'start'});
          }
          //gaEvent('Pub-ArticleSwipe','Swipe', (typeof this.props.type != 'undefined') ? this.props.type + '_tap' : 'topnews_tap');
        }catch(e){
          console.log('error in next story click', e);
        }
        
      }
    }
    if (typeof nextArticle == 'undefined' || typeof nextArticle.it == 'undefined' ) {
      return null;
    }
    let nextArticleImg = "";
    try{
        nextArticleImg = nextArticle.it.hasOwnProperty('imageid') ? nextArticle.it.imageid : (nextArticle.it.hasOwnProperty('image') && nextArticle.it.image.length > 0 && nextArticle.it.image[0].id) ? nextArticle.it.image[0].id : "";
    }catch(ex){}

    return (
      <div className="nextstory-wrapper" onClick={handleNextStoryClick.bind(this,  nextArticle.it.id)}>
        <h2>{nextStoryText}</h2>
        <NewsListCard item={nextArticle.it} img={nextArticleImg} noLink={true} />
        <div className="arrow">READ FULL ARTICLE</div>
      </div>
    )
}

export default NextStoryCard;