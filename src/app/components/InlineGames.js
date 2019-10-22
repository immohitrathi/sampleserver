import React, {memo} from 'react';
import { Link as RLink } from 'react-router-dom';
import { getGameUrl, hasValue } from '../../utils/util';
import ReactLink from '../../utils/Link';
const Link = ReactLink(RLink);
import LazyIntersection from './LazyIntersection';

export function makeRandomId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 30; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

const InlineGames = memo(({ item, seealltxt, list }) => {
    let gameUserId = 0;
    /* let gameUserId = cookies.get("gameUserId",{domain:'.'+config.DOMAIN_NAME});
    if(typeof(gameUserId)=='undefined' || gameUserId=="" || !gameUserId){
        this.gameUserId = makeRandomId();
        cookies.set("gameUserId",this.gameUserId,{path:'/',maxAge:(3600*24*365),domain:'.'+config.DOMAIN_NAME});
    } */    
    let game= {};
    if(hasValue(list)){
        game =  item;
    } else {
        if(!hasValue(item.gamesItems) || !hasValue(item.gamesItems[0])) {
            return null;
        }
        game = item.gamesItems[0];
    }


    let images = JSON.parse(game.assets);
    let imgPath = images.cover;
    let url = getGameUrl(game, gameUserId);
    return (
        <div className="memec igames">
            {!hasValue(list)?<h3 className="block theading">{"Games for you"}</h3>:null}
            <a href={url} className="block posrel">
                <LazyIntersection alt={""} 
                    datasrc={imgPath} 
                    src={"https://opt.toiimg.com/recuperator/imgserver/serve?dimension=600&source="+encodeURIComponent(imgPath)} 
                    height={240} width={400} 
                    placeholder="" 
                    useOriginalSource={true}
                />
                <button className="whitebtn">PLAY NOW</button>
            </a>
            {!hasValue(list)?
                <Link to={`/games`} className="seeall">{seealltxt || "SEE ALL GAMES"} <span className="rightarrow">&rsaquo;</span></Link>
                :null
            }
            
        </div>    
    )
});

export default InlineGames;