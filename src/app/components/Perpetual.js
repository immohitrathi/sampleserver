import React from 'react';
import StoryCard from './StoryCard';
import HeroCard from './HeroCard';
import PublisherCard from './PublisherCard';
import TitleCard from './TitleCard';
import NextStoryCard from './NextStoryCard';
import Ad from './Ad';
import YouMayLike from './YouMayLike';
import Drawer from './Drawer';
import RatingCard from './RatingCard';

import { getLanguageNameById, getAudience } from '../../utils/util';

const Perpetual = (props) => {
    const { currentArticle, nextStoryText, index, items, ymlHeadText, params, seeAll } = props;
    if (typeof currentArticle == 'undefined' || typeof currentArticle.id == 'undefined') {
      return null;
    }
    const getNextArticle = (curId, items) => {
        let index = items.findIndex(item => item.it.id == curId);
        return items[index+1];
    }
    const nextArticle = getNextArticle(currentArticle.id, items);
    const lang = getLanguageNameById(currentArticle.lid, props.match).toLowerCase();
    const audience = getAudience(lang);
    const mwa = currentArticle.mwa ? currentArticle.mwa : {};

    return (
      <div data-id={currentArticle.id} className={"article-section perpetual"}>
      	<div className="nextstory-label">
          <span>{nextStoryText}</span>
        </div>
        <div className={"itemContainer"}>
          <HeroCard currentArticle={currentArticle}></HeroCard>
          <PublisherCard currentArticle={currentArticle}></PublisherCard>
          <TitleCard currentArticle={currentArticle}></TitleCard>
          <RatingCard value={currentArticle} />
          <StoryCard currentArticle={currentArticle} />
          <NextStoryCard nextArticle={nextArticle} nextStoryText={nextStoryText} lang={lang}></NextStoryCard>
          <Drawer lang={lang} pagetype="article"/>
          <YouMayLike audience={audience} sec={currentArticle.sec} lang={lang} text={ymlHeadText} />
          {mwa && mwa.hasOwnProperty('articleAd') && mwa.articleAd.hasOwnProperty('ctnBottomWidget') && mwa.articleAd.ctnBottomWidget.enabled && mwa.articleAd.ctnBottomWidget.hasOwnProperty('adCode') && mwa.articleAd.ctnBottomWidget.adCode ? <div className="container ctnshow"><Ad adtype={'ctn'} mstype={'ctnshow'} adcode={mwa.articleAd.ctnBottomWidget.adCode}/></div> : null}
          
        </div>
      </div>
    )
}


export default Perpetual;