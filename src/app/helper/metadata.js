import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'

const Metadata = ({seo}) => {
	if(typeof seo !== 'undefined' ){
		let seodata = seo;
		//console.log(seodata);
		let seometa = [];
		let linkUrl = [];
		if(typeof seodata !== 'undefined'){
			if(seodata.keywords)
				seometa.push(<meta name="keywords" content={seodata.keywords} key={0}/>);

			if(seodata.description)
				seometa.push(<meta name="description" content={seodata.description} key={1}/>);

			if(seodata.title){
				seometa.push(<meta property="og:title" content={seodata.title} key={2}/>);
				seometa.push(<meta property="twitter:title" content={seodata.title} key={3}/>);
			}
				
			if(seodata.description){
				seometa.push(<meta property="og:description" content={seodata.description} key={4} />);
				seometa.push(<meta property="twitter:description" content={seodata.description} key={5}/>);
			}

			if(seodata.image){
				seometa.push(<meta property="og:image" content={seodata.image} key={6}/>);
				seometa.push(<meta property="twitter:image" content={seodata.image} key={7}/>);
				seometa.push(<meta property="og:image:width" content={seodata.image} key={8}/>);
				seometa.push(<meta property="og:image:height" content={seodata.image} key={9}/>);
			}


			if(typeof seodata.mainEntityOfPage !== 'undefined' && seodata.mainEntityOfPage != ''){
				seometa.push(<meta property="og:url" content={seodata.mainEntityOfPage} key={12}/>);
			}
				
			return (
				<Helmet>
					<title>{seodata.title}</title>
					{seometa}
					{linkUrl}
				</Helmet>
			)
		}else{
			return null;
		}
	}
	return null;
}
export default Metadata;