import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Drawer from './Drawer';
import  Navigations from './Navigations';
import { hasValue } from '../../utils/util';

export default ({ nav, lang, history })  => {

	const [header, setHeader] = useState("4");
	const [title, setTitle] = useState("HEADLINES");
	const [back, setBack] = useState(false);
	let handledByClick = false;
	useEffect(()=>{
		window.addEventListener('updateHeader', navEventListener);
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('updateHeader', navEventListener);
			window.removeEventListener('scroll', handleScroll);
		}
	});

	const handleScroll = () => {
		if(handledByClick) {
			return;
		}
		const nav = document.querySelector("nav.nav");
		if(nav){
			const body = document.body;
			const html = document.documentElement;
			const docHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
			let scrollValue = document.body.scrollTop;
			if (scrollValue == 0) {
				scrollValue = document.documentElement.scrollTop;
			}
			let newHeight = 75-scrollValue;
			newHeight = newHeight<0?0:newHeight;
			
			nav.style.height = newHeight+'px';
			
			
			
			if(newHeight<=0) {
				nav.classList.remove('visible');
				document.querySelector(".ham").classList.add('active');
			} else {
				nav.classList.add('visible');
				document.querySelector(".ham").classList.remove('active');
			}

		}
	}

	const navEventListener = (event) => {
		if(!isNaN(event.detail.header)){
			setHeader(event.detail.header);
		} 
		if(hasValue(event.detail.title)){
			setTitle(event.detail.title);
		}
		if(hasValue(event.detail.back)){
			setBack(event.detail.back);
    } else {
			setBack(false);
		}
	}

	const drawerNavigation = () =>{
		let containerelem = document.querySelector(".container.listc");
		if (document.querySelector('nav.nav').classList.contains("visible")) {
			handledByClick = true;
		  document.querySelector('nav.nav').classList.remove('visible');
		  document.querySelector(".ham").classList.add('active');
		  if(containerelem) {
			containerelem.style.marginTop="0px";
		  }
		}
		else {
			handledByClick = false;
			document.querySelector('nav.nav').style.height = '75px';
			document.querySelector('nav.nav').classList.add('visible');
		  document.querySelector(".ham").classList.remove('active');
			containerelem.style.marginTop="100px";
		}
	} 

	const goBack = () => {
		history.goBack();
	}

	if(header=="1" || header=="4") {
		return (
			<div className="headerc bs">
				<header>
					<Link to="/">
						<i className="logo"></i>
					</Link>
					{/* <i className="points">1234</i> */}
					<i className="ham" onClick={drawerNavigation}></i>
				</header>
				{header=="1"?<Drawer lang={lang} />:null}
			</div>
		)
	} else if(header=="2" || header=="3") {
		return (
			<div className={`sheader ${header=="3"?'h0':''}`}>
				<header>
					{back?<i className="back" onClick={goBack}></i>:null}
					<h4>{ title }</h4>
					{/* <i className="points mr0">1234</i> */}
				</header>
				{header==2?<Navigations lang={lang} nav={nav} />:null}
			</div>
		)
	} else {
		return <div style={{marginTop:'-50px'}}></div>;
	}
}