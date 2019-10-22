'use strict';

const express = require('express');
const router = express.Router();
const Util = require('./../models/Util');
const Search = require('./../models/Search');
var url = require('url');

router.get('/NPRSS/search/trending-keywords', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Search.getTrendingKeywords(queryArr, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  })   
});

router.get('/NPRSS/search', (req, res) => {
  //let queryArr = Util.parseQueryString(req);
  let url_parts = url.parse(req.url, true);
  let query = url_parts.query;
  let searchTerm = query['searchTerm'];
  let lang = query['lang'];
  let curpg = query['curpg'];
  if(typeof(curpg)=='undefined'){
    curpg = 1;
  }
  let exactMatch = query['exactMatch'];
  if(typeof(exactMatch)=='undefined'){
    exactMatch=true;
  }
  //console.log(searchTerm, lang, curpg);
  let queryArr = ['searchTerm='+encodeURI(searchTerm),'lang='+lang,'curpg='+curpg,'exactMatch='+exactMatch];
  Search.getSearchResult(queryArr, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  }) 
});

router.get('/NPRSS/search/city', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Search.searchCity(queryArr, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  }) 
});


module.exports = router;
