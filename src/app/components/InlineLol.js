import React, {memo} from 'react';
import { Link as RLink } from 'react-router-dom';
import { getFunniesUrl, hasValue } from '../../utils/util';
import ReactLink from '../../utils/Link';
const Link = ReactLink(RLink);
import LazyIntersection from './LazyIntersection';


const InlineLol = memo(({ item, lang, loltxt, seealltxt }) => {
    if(!hasValue(item.gvmItems)) {
        return null;
    }
    return (
        <div className="memec">
            <h3>{loltxt || "Laugh out Loud"}</h3>
            <div className="scrlcontent">
                <ul>
                    {
                        item.gvmItems.map((it)=>{
                            let url = getFunniesUrl(it,lang);
                            return (
                                <li key={it.id}>
                                    <div className="bgimage" style={{backgroundImage:`url(${it.imageid})`}}></div>
                                    <Link to={url}>
                                    <LazyIntersection alt={""} 
                                        datasrc={it.imageid} 
                                        src={"https://opt.toiimg.com/recuperator/imgserver/serve?dimension=600&source="+encodeURIComponent(it.imageid)} 
                                        height={144} width={144} 
                                        placeholder="" 
                                        useOriginalSource={true}
                                    />
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            <Link to={`/${lang}/funnies`} className="seeallm">{seealltxt || "SEE ALL MEMES"} <span>&rsaquo;</span></Link>
        </div>    
    )
});

export default InlineLol;