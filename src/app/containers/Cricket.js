import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link as RLink } from 'react-router-dom';
import Ad from '../components/Ad';
import NewsListCardLoading from "../components/NewsListCardLoading";
import CricketCard from "../components/CricketCard";
import CricketUpcomingWidget from "../components/CricketUpcomingWidget";
import { updateHeader, hasValue, gaEvent, scrollToTop} from "../../utils/util";
import { fetchCricketListing } from "../data/ducks/cricket/actions";
import "../data/ducks/cricket/reducers";
import ReactLink from '../../utils/Link';
const Link = ReactLink(RLink);

const Cricket = (props)=> {
  const { match } = props;
  const currentTab = match.params.tab=='scorecard'?'nowshowing' :'upcoming';
  const language = match.params.lang;
  useEffect(()=>{
    updateHeader("3",'CRICKET', true);
    scrollToTop();
    if(!hasValue(props.value.nowshowing)){
      props.fetchCricketListing({match});
    }
  },[match.params.lang, match.params.tab]);

  const changeMatchStatus = (event)=>{
    const checked = event.currentTarget.checked;
    gaEvent("Cricket","Toggle",checked?"On":"Off");
    const elements = document.querySelectorAll(".ccard");
    let upcomingClass = '';
    let count = 0;
    for(let i=0;i<elements.length;i++) {
      if(checked && !elements[i].classList.contains('IND')) {
        elements[i].classList.add("hide");
        if(elements[i].parentNode.tagName.toLowerCase()=='li'){
          elements[i].parentNode.classList.add("hide");
        }
        upcomingClass = 'hide';
        count++;
      }  else {
        elements[i].classList.remove("hide");
        if(elements[i].parentNode.tagName.toLowerCase()=='li'){
          elements[i].parentNode.classList.remove("hide");
        }        
        upcomingClass = '';
      }
    }

    if(document.getElementById("upcomingMatches")){
      if(upcomingClass==''){
        document.getElementById("upcomingMatches").classList.remove("hide");
      } else {
        document.getElementById("upcomingMatches").classList.add("hide");
      }
    }


    if(count==elements.length && upcomingClass=='hide') {
      document.getElementById("noresult").style.display='block';
    } else {
      document.getElementById("noresult").style.display='none';
    }
  }

  return (
    <>
      { hasValue(props.value.nowshowing) ?
        <div className="mt15 cricket">
          {/* <div className="container">
            <Link to={`/${language}/cricket/point-table`} className="pointlink">
              {props.app.locale.mx_iplptable || 'IPL POINTS TABLE'}
            </Link>
          </div> */}



          <div className="dflex container">
            <div>
              <h1 className="heading mt24">{currentTab=='nowshowing'?(props.app.locale.scores || 'Scores'):(props.app.locale.upcoming_matches || 'UPCOMING MATCHES')}</h1>
            </div>
            <div style={{paddingTop:'4px'}}>
                <span className="indiaonly">India only</span>
                <input type="checkbox" className="ios8-switch ios8-switch-sm" id="checkbox-1" onChange={changeMatchStatus} />
                <label htmlFor="checkbox-1"></label>
            </div>
          </div>

          <div id="noresult">
            <img src="/photos/noresult.svg" alt="" />
            <p>Did not find any result for your selection </p>
          </div>          

            {
              props.value[currentTab].map((item, i)=>{
                return (
                  <>
                    <CricketCard item={item} currentTab={currentTab} key={item['$']['match_Id']} language={language} />
                    {i==1 && currentTab=="nowshowing"?
                      <div id="upcomingMatches">
                        <CricketUpcomingWidget 
                          key={item['$']['match_Id']+"1"}  
                          items={props.value['upcoming']} 
                          lang={props.match.params.lang} 
                          seeall={props.app.locale.mx_samatches || 'SEE ALL MATCHES'} 
                          upcoming_matches={props.app.locale.mx_umatches || 'Upcoming Matches'} 
                          />
                        <div className="criborder border"></div>
                      </div>
                      :null
                    }
                    {/* i==0?
                      <div className="container">
                      <Ad adtype={"ctn"} adcode={"327476"} />
                      </div>
                      :null
                     */}
                  </>
                )
              })

            }

          </div>
        :
        <div className="container">
          <NewsListCardLoading first={true} cricket={true} />
          <NewsListCardLoading first={true} cricket={true} />
          <NewsListCardLoading first={true} cricket={true} />
          <NewsListCardLoading first={true} cricket={true} />
          <NewsListCardLoading first={true} cricket={true} />
        </div>
      }
    </>

  );
}


Cricket.fetching = ({ dispatch, match }) => {
	return [dispatch(fetchCricketListing({ match }))];
}

Cricket.defaultProps = {
	value: []
};

const mapStateToProps = (state) => ({
  ...state.cricket,
  app:state.app
});

const mapDispatchToProps = {
  fetchCricketListing
};
export default connect(mapStateToProps, mapDispatchToProps)(Cricket);