import React, {memo} from 'react';

const YouMayLike = memo((props) => {
    const {audience, sec, lang, text} = props;
    let position = Math.floor(10000 + Math.random() * 90000); 
    return (
        <div id={"div-clmb-ctn-320683-"+position} data-cb="ymlwidget" data-slot="320683" data-position={position} data-auds={audience} data-section={sec} className="colombiaone" data-lang={lang} data-heading={text}></div>
    );
});
export default YouMayLike;