/**
 * Created by sosopop on 2016/5/31.
 */
var util = require('util');
var request = require('request');
var parserBase = require('../lib/parser-base');

function ParserBilibili(){
    this.id_ = "";
    parserBase.call( this);
}

ParserBilibili.handled = function ( url) {
    return /\w+?\.bilibili\.com/gi.test( url);
};

function parseJson() {
    var parser = this;
    var url = 'http://interface.bilibili.com/playurl?platform=bilihelper&appkey=95acd7f6cc3392f3&cid=' + parser.id_ +
        '&otype=json';
    request(
        {
            uri: url,
            gzip: true
        }, function (error, response, body) {
            try {
                if (!error && response.statusCode == 200) {
                    var jsonRoot = JSON.parse( body);
                    parser.ret_.data.timeLength = jsonRoot.timelength;
                    parser.ret_.data.streams[0] = {
                        quality : 'HD',
                        type : 'MP4',
                        segs : [
                            {
                                url: jsonRoot.durl[0].url,
                                timeLength: jsonRoot.durl[0].length,
                                fileSize:0
                            }
                        ]
                    };
                    parser.outputSucceed();
                } else {
                    parser.outputError( 1, error.toString());
                }
            }catch (e){
                parser.outputError( 1, e.toString());
            }
        }
    )
}

ParserBilibili.prototype.parse_ = function ( url ) {
    var parser = this;
    request(
        {
            uri: url,
            gzip: true
        }, function (error, response, body) {
            try {
                if (!error && response.statusCode == 200) {
                    if( /h1 title=\"(.+?)\"/gi.test(body)){
                        parser.ret_.data.title = RegExp.$1;
                    }
                    if ( /rel=\"media:thumbnail\" content=\"(.+?)\" \/>/gi.test(body)){
                        parser.ret_.data.thumbnail = RegExp.$1;
                    }
                    if ( /name=\"description\" content=\"(.+?)\" \/>/gi.test(body)){
                        parser.ret_.data.description = RegExp.$1;
                    }
                    parser.ret_.data.type = "Other";
                    if( /cid=(\d+?)\&/gi.test(body)){
                        parser.id_ = RegExp.$1;
                        parseJson.call( parser);
                    } else {
                        parser.outputError( 1 );
                    }
                } else {
                    parser.outputError( 1, error.toString());
                }
            }catch (e){
                parser.outputError( 1, e.toString());
            }
        }
    )
};

util.inherits(ParserBilibili, parserBase);
module.exports = ParserBilibili;