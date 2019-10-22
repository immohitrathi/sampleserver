let DOMAIN_NAME = "test.newspointapp.com";
let SITE_URL = "https://"+DOMAIN_NAME;
let REDIS_CONFIG={host:'172.29.113.148',port:'6379',db:'4',pass:'RedPasP0ee151'};
if(process.env.CONFIG=='stg'){
  DOMAIN_NAME = "stg.newspointapp.com";
  SITE_URL = "http://"+DOMAIN_NAME;
  REDIS_CONFIG={host:'192.168.24.51',port:'6379',db:'1',pass:'RedPasP0ee151'};
} else if(process.env.CONFIG=='stg1'){
  DOMAIN_NAME = "stg1.newspointapp.com";
  SITE_URL = "http://"+DOMAIN_NAME;
  REDIS_CONFIG={host:'192.168.24.51',port:'6379',db:'2',pass:'RedPasP0ee151'};
} else if(process.env.CONFIG=='test'){
  DOMAIN_NAME = "test.newspointapp.com";
  SITE_URL = "http://"+DOMAIN_NAME;
  REDIS_CONFIG={host:'192.168.24.51',port:'6379',db:'3',pass:'RedPasP0ee151'};
} else if(process.env.NODE_ENV=='local'){
  DOMAIN_NAME = "localhost";
  SITE_URL = "http://"+DOMAIN_NAME;
}else if(process.env.NODE_ENV=='development' || !process.env.NODE_ENV){
  DOMAIN_NAME = "localhost:3003";
  REDIS_CONFIG={host:'192.168.24.51',port:'6379',db:'7',pass:'RedPasP0ee151'};
  SITE_URL = "http://"+DOMAIN_NAME;
}

let config = {
  DOMAIN_NAME:DOMAIN_NAME,
  SITE_URL: SITE_URL,
  API_URL: SITE_URL+"/api",
  NPRSS_API_URL:SITE_URL+"/nprss",
  ENVOY_API_URL:SITE_URL+"/envoy",
  IMAGE_URL: "https://toifeeds.indiatimes.com",
  SITE_TITLE: "News Point",
  channel:'newspoint',
  API_DOMAIN:"https://api.newspointapp.com/",
  //SOLR_API_DOMAIN:"https://pwanp.indiatimes.com/feed/",
  //SOLR_API_IP:"https://pwanp.indiatimes.com/",
  SOLR_API_DOMAIN:"https://nprelease.indiatimes.com/NPRSS/feed/",
  SOLR_API_IP:"https://nprelease.indiatimes.com/NPRSS/",
  GOOGLE_CLIENT_ID:"430931898682-okpbpm3u8ejfgr97bcfgq99qubrh3eqn.apps.googleusercontent.com",
  REDIS_CONFIG:REDIS_CONFIG,
  GRX_APP_ID: 'a82145',
};

module.exports = config;
