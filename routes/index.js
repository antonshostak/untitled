var express = require('express');
var http = require('http');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/youtube/:yid',function(req,res){
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //
    // // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    //
    // // Set to true if you need the website to include cookies in the requests sent
    // // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

  var yid = req.params.yid;
  var url = "http://www.youtube.com/get_video_info?html5=1&video_id="+yid;

  request.get(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var csv = body;
      //("Access-Control-Allow-Origin","*");
      res.send(csv);
    }
  });
});

module.exports = router;
