import React from 'react';
import Rating from './Rating';

const TitleCard = (props) => {
    const { currentArticle } = props;
    const  hl = currentArticle.hasOwnProperty('hl') && currentArticle.hl ? currentArticle.hl : "";
    if (!hl) {
      return null;
    } 
    return (
      <>
      {
        <div className="title-card container">
          <div className="wrapper">
            <h1>{hl}</h1>
            { currentArticle.hasOwnProperty('cr') && currentArticle.cr != "" ?
                <Rating rate={currentArticle.cr} />
              :null
            }
          </div>
        </div>
      }
      </>
    )
}
export default TitleCard;