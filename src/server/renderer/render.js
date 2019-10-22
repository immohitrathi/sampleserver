import React from 'react';
import Loadable from 'react-loadable';
import { renderToNodeStream, renderToStaticMarkup}  from 'react-dom/server';
import { getBundles } from 'react-loadable-ssr-addon';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Helmet from "react-helmet";
import path from 'path';
import fs from 'fs';
var url = require('url');
import { CookiesProvider } from 'react-cookie';
import Routes from '../../routes/routes';
const manifest = require('../../../public/dist/assets-manifest.json');
import config from '../../config/server';
import { disablePushNotifications } from '../../utils/util';

const GRX_APP_ID = config.GRX_APP_ID;

export default (pathname, res, store, context, req) => {
    /* const state = store.getState();

    let query = url.parse(req.url, true);
    if(typeof(query)!='undefined' && typeof(query.frmapp)!='undefined' && query.frmapp=='yes'){
        store['config']['appStatus'] = true;
    }
    if(typeof(query)!='undefined' && typeof(query.utm_source)!='undefined'){
        store['config']['utmSource'] = query.utm_source;
    }
    if(typeof(query)!='undefined' && typeof(query.utm_medium)!='undefined'){
        store['config']['utmMedium'] = query.utm_medium;
    }
    if(typeof(query)!='undefined' && typeof(query.utm_campaign)!='undefined'){
        store['config']['utmCampaign'] = query.utm_campaign;
    }   */  

    //console.log("inside render", store.getState());
    
    const modules = new Set();
    const html = (
		<Loadable.Capture report={moduleName => modules.add(moduleName)}>
			<Provider store={ store }>
                <CookiesProvider cookies={req.universalCookies}>
                    <StaticRouter location={pathname} context={context}>
                        <div>{renderRoutes(Routes)}</div>
                    </StaticRouter>
                </CookiesProvider>
			</Provider>
		</Loadable.Capture>
    );

    res.setHeader('content-type', 'text/html; charset=utf-8');
    //try{        
        let tempHtml = renderToStaticMarkup(html);   
        let header = getHeader(req);
        let footer = getFooter(modules, store);
        res.send(header+tempHtml+footer);


        
/*         var reactDom = renderToNodeStream(html);
        res.write(getHeader());
        let footer = getFooter(modules, store);
        reactDom.pipe(res, { end: false });
        reactDom.on('end', () => {
            res.end(footer);
        }); */
    /* }catch(ex){
        res.end("There is some error, please serve error page 123",ex);
    } */
};

function getHeader(req){
    const frmApp = req.query.frmapp?"frmapp":"";
    const utmSource = req.query.utm_source?req.query.utm_source:"";
    const style_css = path.resolve(__dirname, "../../../public", "dist", "styles.css");
    const cssText = fs.readFileSync(style_css, 'utf8');
    const helmet = nutrelizeHelmet(Helmet.renderStatic());
    return `<!doctype html>
    <html lang="en">
    <head>
        ${helmet}
        <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <style type="text/css">${cssText}</style>
        <script>
        (function (g, r, o, w, t, h, rx) {
            g[t] = g[t] || function () {
                (g[t].q = g[t].q || []).push(arguments)
            }, g[t].l = 1 * new Date();
            g[t] = g[t] || {},
                h = r.createElement(o),
                rx = r.getElementsByTagName(o)[0];
            h.async = 1;
            h.src = w;
            rx.parentNode.insertBefore(h, rx)
        })(window, document, 'script', 'https://static.growthrx.in/js/grx-web-sdk.js', 'grx');
        grx('init',"${GRX_APP_ID}");
        //grx('enable_log');
        grx('track', 'page_view', {url: window.location.href});
        //grx('track', 'langs', {lang:'english'});
        var npermission = null;
        var disableNotifications = ${ typeof utmSource != 'undefined' && utmSource ? disablePushNotifications().indexOf(utmSource) != -1 : false};
        if(typeof(localStorage)!=="undefined" && localStorage && typeof localStorage.getItem != 'undefined'){
          npermission = localStorage.getItem("npermission");
        }
        if ("Notification" in window && Notification.permission !== "granted" && npermission==null && !disableNotifications) {
          grx('enablePush',{"service_worker":"/sw.js"});
          if(typeof(localStorage)!=="undefined" && localStorage && typeof localStorage.setItem != 'undefined'){
            localStorage.setItem("npermission","1");
          }
        }
        </script>
    </head>
    <body><div id="app" class="${frmApp}">`;
}

function getFooter(modules, store){
    const reduxState = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
    const bundles = getBundles(manifest, [...manifest.entrypoints, ...Array.from(modules)]);
    //console.log("Inside footer",bundles);
    //const styles = bundles.css || [];
    const scripts = bundles.js || [];
    return `</div><script type="text/javascript">window.INITIAL_STATE = ${ reduxState };</script>
        ${scripts.map(script => {
            if(script.file.indexOf('styles') !== -1){
                return '';
            }else{
                return `<script src="/dist/${script.file}" defer></script>`
            }
        }).join('\n')}
    </body>
    </html>`;
}

function nutrelizeHelmet(helmet){
    const regex = /data-react-helmet="true" /gm;
    let title = helmet.title.toString();
    const meta = helmet.meta.toString();
    const link = helmet.link.toString();
    title = title.replace(' data-react-helmet="true" itemprop="name"', '');
    return title+meta.replace(regex, '')+link.replace(regex, '');
}