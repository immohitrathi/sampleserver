import React from 'react';

const TwitterCard = twitterId => {
	
	const createTwitterWidget = twitterId => {
		if(typeof window != "undefined"){
			setTimeout(function(){
				let eleContainer = document.getElementById(twitterId)
			    if(typeof twttr != 'undefined' && eleContainer && !eleContainer.getAttribute('data-render')) {
                    eleContainer.setAttribute('data-render' , true);
                    twttr.widgets.createTweet(twitterId,eleContainer).then( () => {
                        //console.log('Tweet added.');
                    }); 
                }
			}, 100);
		}
	}

	return (
		<>
			{createTwitterWidget(twitterId)}
		</>
	)
}

export default TwitterCard;