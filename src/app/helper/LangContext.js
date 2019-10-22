import React from "react";

const LangContext = React.createContext({
    locale: {},
    updateLanguage:() => {},
    selectedLang:'english',
    query:{},
    saveCity:() => {}
});

export default LangContext;