import React from 'react';
const Rating = (props) => {
	let rating = parseFloat(props.rate)*20;
	return(<div className={"starRatingsSprite"} style={{margin:props.center?'0 auto':'0'}}><span style={{width:rating+'%'}} className={"starRatingsSpriteRating"}></span></div>)
};

export default Rating;
