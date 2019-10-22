import React, {useRef} from 'react'
import {getShortTeamName, bowlerEco, strikeRates} from '../../utils/cricketutil';

const CricketScore =  (props)=>{
  const heading = useRef();
  const container = useRef();

  const showHide = ()=> {
    container.current.classList.toggle("active");
    heading.current.classList.toggle("active");
  }
  let {score, prefix, type, currentInning, status, appStatus, players, selectedteam} = props;
  let showYetTobat = false;
  let yetToBatPlayer = [];
  for(let batsman of score['Batsmen']){
    if(batsman['$'].Howout==''){
      showYetTobat = true;
      yetToBatPlayer.push(batsman._);
    }
  }
  

  let fallofwickets = [];
  let idx = 0;
  for(let obj of Object.keys(score['FallofWickets'])){
    let wickets = score['FallofWickets'][obj].split("|");
    if(typeof(wickets[2])!='undefined'){
      fallofwickets.push(wickets[2]+"-"+(idx+1)+" ("+wickets[1]+", "+wickets[3]+")");
    }
    idx++;  
  }

  let sTeamPlayers = [];
  if(typeof(players)!='undefined' && status!='Match Ended' && typeof(players['team'+score['d']['Bowlingteam_Id']])!='undefined'){
    for(let player of players['team'+score['d']['Bowlingteam_Id']]){
      sTeamPlayers.push(player.name);
    }
  }


  if(currentInning=='First'){
    currentInning="FI";
  } else if(currentInning=='Second'){
    currentInning="SI";
  }else if(currentInning=='Third'){
    currentInning="TI";
  }else if(currentInning=='Fourth'){
    currentInning="FO";
  }
  let shortTeamName = getShortTeamName(score['d']['Battingteam']);

  return (
    <div className={`detail-scorecard dmask active ${shortTeamName}  ${shortTeamName!=selectedteam?'hide':''}`} ref={container}>
     <div className="d-s-heading active"  ref={heading} data-teamname={score['d']['Battingteam']}>
       <div className={"teamname "+(currentInning==prefix?"active":"")}>          
         {/* getShortTeamName(score['d']['Battingteam']) */} 
         TOTAL
         {type=='Test' && prefix=="FI"?' (1st Inn)':null}
         {type=='Test' && prefix=="SI"?' (1st Inn)':null}
         {type=='Test' && prefix=="TI"?' (2nd Inn)':null}
         {type=='Test' && prefix=="FO"?' (2nd Inn)':null}
       </div>
       <div className="teamscore ">
         {score['Equation']['Total']}/{score['Equation']['Wickets']} &nbsp;&nbsp;<span className="overd">({score['Equation']['Overs']} ov)</span>
       </div>
     </div>
     <div className="details">
         {
           typeof(score['Batsmen'])!='undefined' && typeof(score['Batsmen'])!='undefined' && typeof(score['Batsmen'])!='undefined'?
           <table cellPadding="0" cellSpacing="0" className="score-table">
             <tbody>
             <tr>
               <th className="left" width="45%">BATSMAN</th>
               <th width="10%">R</th>
               <th width="10%">B</th>
               <th width="10%">4s</th>
               <th width="10%">6s</th>
               <th width="15%">SR</th>
             </tr> 
             {
               score['Batsmen'].map((batsman, idx)=>{
                 if(batsman['$'].Howout!=''){
                   return (
                     <tr key={idx}>
                       <td className="left">
                         <span className={batsman['$'].Howout=='Batting'?"bold":""}>{batsman._}</span> {batsman['$'].Striker=='Yes'?<span>*</span>:null}
                         <div className="howout">{batsman['$'].Howout}</div>
                       </td>
                       <td>{batsman['$'].Runs}</td>
                       <td>{batsman['$'].BallsFaced}</td>
                       <td>{batsman['$'].Fours}</td>
                       <td>{batsman['$'].Sixes}</td>
                       <td>{strikeRates(batsman['$'].Runs, batsman['$'].BallsFaced)}</td>
                     </tr>                    
                   )
                 }
               })
             }  

             {/* 
               yetToBatPlayer.map((batsman,idx)=>{
                 console.log(batsman);
                return (
                    <tr key={idx}>
                      <td className="left">
                         <span>{batsman}</span> 
                         <div className="howout">Did not bat</div>
                       </td>
                       <td colSpan="5">&nbsp;</td>
                    </tr> 
                )
               })
              */}

             {showYetTobat?
               <tr>
                 <td colSpan="6" className="fallofwickets">
                   <span className="bold">{status=='Match Ended' || (currentInning=='SI' && prefix=='FI') || (currentInning=='TI' && prefix=='SI') || (currentInning=='FO' && prefix=='TI')?"DID NOT BAT":"YET TO BAT"} - </span>
                   {yetToBatPlayer.join(", ")}
                 </td>
               </tr>
               :null
             }
               
             


             {
               typeof(fallofwickets)!='undefined' && fallofwickets.length>0?
               <tr>
                 <td colSpan="6" className="fallofwickets">
                   <span className="bold">FALL OF WICKETS - </span>
                   {fallofwickets.join(", ")}
                 </td>
               </tr>
               :null
             }

             </tbody>
           </table>
           :null
         }  

         {
           typeof(score['Bowlers'])!='undefined'?
             <table cellPadding="0" cellSpacing="0" className="score-table margin-bottom-10px">
               <tbody>
               <tr>
                 <th className="left" width="55%">BOWLERS</th>
                 <th width="10%">O</th>
                 <th width="10%">M</th>
                 <th width="10%">R</th>
                 <th width="10%">W</th>
                 <th width="15%">ECON</th>
               </tr>
               {
                 score['Bowlers'].map((bowler, idx)=>{
                   return (
                     <tr key={idx}>
                       <td className="left">
                         <span className={bowler['$'].Bowling=='Yes'?"bold":""}>{bowler._}</span> {bowler['$'].Bowling=='Yes'?<span>*</span>:null}
                       </td>
                       <td>{bowler['$'].Overs}</td>
                       <td>{bowler['$'].Maidens}</td>
                       <td>{bowler['$'].Runsgiven}</td>
                       <td>{bowler['$'].Wickets}</td>
                       <td>{bowlerEco(bowler['$'].Runsgiven, bowler['$'].Overs)}</td>
                     </tr>                    
                   )
                 })
               }

               {
                 typeof(score['Extras'])!='undefined'?
                 <tr>
                   <td colSpan="6" className="fallofwickets">
                     <span className="bold">EXTRAS - </span>
                     (b {score['Extras']['Byes']}, lb {score['Extras']['Legbyes']}, w {score['Extras']['TotalWides']}, nb {score['Extras']['TotalNoballs']})
                   </td>
                 </tr>
                 :null
               }

               {status!='Match Ended' && typeof(players)!='undefined' && sTeamPlayers.length>0?
                 <tr>
                   <td colSpan="6" className="fallofwickets">
                     <span className="bold">Players - </span>
                     {sTeamPlayers.join(", ")}
                   </td>
                 </tr>
                 :null
               }
               </tbody>
             </table>                  
           :null
         }       


     </div>          
    </div>      
   )
}

export default CricketScore;