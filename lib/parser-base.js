/**
 * Created by sosopop on 2016/6/5.
 */

function ParserBase() {
    this.ret_ = {
        errorCode:0,
        errorInfo:"",
        data:{
            from:"",
            title:"",
            actor:"",
            type:"",
            release:"",
            director:"",
            description:"",
            thumbnail:"",
            timeLength:"",
            streams:[]
        }
    };
    this.callback_ = null;
}

ParserBase.prototype.parse = function( url, callback) {
    this.callback_ = callback;
    this.ret_.data.from = url;
    this.parse_( url);
};

ParserBase.prototype.outputError = function( errorCode, errorInfo) {
    this.ret_.errorCode = errorCode;
    if ( errorInfo == null && errorCode != 0)
        errorInfo = 'failed';
    this.ret_.errorInfo = errorInfo;
    this.callback_( this.ret_);
};

ParserBase.prototype.outputSucceed = function( errorCode, errorInfo) {
    this.callback_( this.ret_);
};

/*
{
    OK : 0,
    FAILED : 1
}
 */

module.exports = ParserBase;