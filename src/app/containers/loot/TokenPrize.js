import React, { memo } from 'react';
import { Link as RLink } from 'react-router-dom';
import ReactLink from '../../../utils/Link';
const Link = ReactLink(RLink);
import ReferData from './ReferData';

const TokenPrize = memo((props)=>{
    const {params} = props;
    const {ssoid} = params;
    const langSelected = typeof params.lang != 'undefined' ? params.lang.toLowerCase() : 'english';
    return(
        <div className="token-prize-wrapper">
            <div className="banner">
                <h1>Congratulations!</h1>
                <h2>You won</h2>
                <img className="prizestars" src={'/photos/prizestars.png'}></img> 
                <img className="prize" src={`/photos/prize${ssoid}.png`}></img> 
            </div>
            <div style={{padding: '20px'}}>
                <h3>Please Note</h3>
                <ol className="tnc" type="1">
                    <li>We will credit the tokens in your account  within 15 working days.</li>
                    <li>The tokens will be credited into the same account from which you participated in the contest.</li>
                    <li>For any queries, please write to us at <br/> <a href = "mailto: npappfeedback@timesinternet.in">npappfeedback@timesinternet.in</a> </li>      
                </ol>
            </div>
        </div>
    )
})


export default TokenPrize;