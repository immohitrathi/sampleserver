if (process.env.NODE_ENV === 'production') {
    require('newrelic');
}
require('@babel/polyfill');
require( "@babel/register" )({
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: ["dynamic-import-node"]
});
require('./server.js')
