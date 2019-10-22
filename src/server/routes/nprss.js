'use strict';

const express = require('express');
const router = express.Router();
const Util = require('./../models/Util');
const Common = require("./../models/Common");
const Videos = require("./../models/Videos")

router.get('/feeds/appinfooptv7.cms', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Common.getAppFeed(queryArr, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  }) 
});

router.get('/feeds/applangtext.cms', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Common.getAppLangText(queryArr, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  })
});


router.get('/feeds/channelcats', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Videos.getChannelCats(queryArr, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  })
});

router.get('/feed/video', (req, res) => {
  let queryArr = Util.parseQueryString(req);
  Videos.getFeedVideos(queryArr, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  })
});

router.get('/feed/videodetail', (req, res) => {
  let id = req.query.id;
  Videos.getVideoDetail(id, function(err, data){
    if(err){
      res.status(404).send('Not found');
    } else {
      res.json(data);
    }
  })
});

module.exports = router;