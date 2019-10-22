import React, {useEffect} from 'react';
import { stripLink } from '../../utils/util';
import TwitterCard from './TwitterCard';

const StoryCard = (props) => {
  const { currentArticle } = props;
  let story = currentArticle.hasOwnProperty('Story') && currentArticle.Story ? currentArticle.Story : "";
  story = stripLink(story);
  story = addAltToImg(story);
  
  useEffect(()=>{
    handleTwitter();
  },[currentArticle.id]);

  function addAltToImg(story){
    if( typeof story === 'string' && story ) {
      story = story.split("<img ").join('<img alt="image" ');
    } 
    return story;
  }
  
  function handleTwitter() {
    let regex1 = new RegExp(/<twitter([\s]+)id="([0-9]+)"([\s]*)\/>/gi);
    let regex2 = new RegExp(/<twitter([\s]+)id="([0-9]+)"([\s]*)>([\s]*)<\/twitter>/gi);
    let tempmatches1 = story.match(regex1);
    let tempmatches2 = story.match(regex2);
    let matches = [];
    if(tempmatches1 && tempmatches1.length > 0) {
      matches = tempmatches1;
    }else if(tempmatches2 && tempmatches2.length > 0) {
      matches = tempmatches2;
    }
    if(matches && matches.length > 0){
      for(let i=0; i < matches.length; i++) {
        let twitterTag = matches[i];
        let idRegex = new RegExp(/([0-9]+)/g);
        let twitterId = twitterTag.match(idRegex);
        if(twitterId && twitterId.length > 0){
          twitterId = twitterId[0];
          TwitterCard(twitterId);
        }
        
      }
    }
  }
  
  
  return (
      <article className="story-card container" 
        dangerouslySetInnerHTML={{
          __html: story
        }}
      />
  );
}

export default StoryCard;

