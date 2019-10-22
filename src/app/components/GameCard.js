import React from 'react'
import { hasValue, goingToPlayGame, getGameUrl } from '../../utils/util';

const GameCard = ({v, gameUserId}) => {
  let converImgObj = JSON.parse(v['assets']);
  let url = getGameUrl(v, gameUserId);
  return (
    <li>
      <a href={url} onClick={goingToPlayGame} data-json={JSON.stringify(v)}>
        <div className="imgcont">
          <img src={converImgObj.cover} alt={v.name} />
        </div>
        <label>{v.name}</label>
      </a>
    </li>
  )
}


export default GameCard;
