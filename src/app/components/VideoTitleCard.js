import React, {useContext} from 'react';
import LangContext from '../helper/LangContext';
import Share from './Share';

const VideoTitleCard = (props) => {
    const { title, shareUrl } = props;
    const { query } = useContext(LangContext);
    const getShareDetail = () => {
      let sharedata = {
       title: document.title,
       url: shareUrl ? shareUrl : location.href
      }
      return sharedata;
    }
    return (
      <>
      {
        <div className="title-card container">
          <h1>{title}</h1>
          <div className='share'  style={{paddingRight:'6px'}}>
            <Share utmSource={query.utm_source} utmCampaign="video" sharedata={getShareDetail} shareTitle="Newspoint" sharetext='' />
          </div>
        </div>
      }
      </>
    )
}
export default VideoTitleCard;