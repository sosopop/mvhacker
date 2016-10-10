/**
 * Created by sosopop on 2016/6/5.
 */
var fs = require('fs');
var path = require('path');


function VideoParser(){
    this.parsers = [];
    var dirList = fs.readdirSync('./parsers');
    dirList.forEach( (function( parsers){
        return function(item){
            if(!fs.statSync('./parsers/' + item).isDirectory()){
                var parserName = path.basename(item, '.js');
                var parserClass = require(path.join("../parsers/",parserName));
                parsers.push( parserClass);
            }
        }
    })(this.parsers));
}

VideoParser.prototype.parse = function ( url, parserCallback){
    try {
        if ( !url){
            parserCallback({errorCode:1,errorInfo:"parameter url missing"});
            return;
        }
        var i = 0;
        for ( ; i < this.parsers.length; i++ ){
            if ( this.parsers[i].handled( url )){
                var parser = new this.parsers[i]();
                parser.parse( url, parserCallback );
                break;
            }
        }
        if ( i == this.parsers.length){
            parserCallback({errorCode:1,errorInfo:"no parser matched"});
            return;
        }
    }
    catch (e){
        parserCallback({errorCode:1,errorInfo:e});
    }
};

VideoParser.create = function (){
    return new VideoParser();
};

module.exports = VideoParser;