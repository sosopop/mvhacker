var express = require('express');
var videoParser = require('../lib/video-parser');
var router = express.Router();
var parserServer = videoParser.create();

router.get('/', function(req, res, next) {
    /*var base64Url = new Buffer(req.query.url, 'base64');
    var url = base64Url.toString('utf8');*/
    parserServer.parse( req.query.url, function( ret){
        var jsonResult = JSON.stringify(ret);
        res.send(jsonResult);
    });
});

module.exports = router;
