import React from 'react'
import NotFound from '../app/containers/NotFound';
import NewsLoader from '../app/components/NewsLoader';
export default (props) => {
	if (props.error) {
		return <NotFound />;
	} else {
		return(
			<div className={`container`}>
				<NewsLoader first={false} ad={true} />
			</div>
		) 		  
	}
}