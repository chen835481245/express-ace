//一些公共方法
var crypto = require('crypto');
var logger = require('./logger');
exports.checkSign = function (postData, sign, secret,chech) {
    var keys = [];
    for(var key in postData){
        if(!chech[key])
        {
            keys.push(key);
        }
    }
    keys = keys.sort();
    var str = '';
    for(var i=0; i<keys.length; i++) {
        var key = keys[i];
        if(typeof postData[key] != "string" && typeof postData[key] != "number") return false;
        str += key + '=' + postData[key] +'&';
    }
    str = str.substr(0, str.length - 1);
    var checkSign = md5(str + secret);
    if(checkSign != sign.toLowerCase())
    {
        return false;
    }
    return true;
}
exports.sign = function (postData, secret) {
    var keys = [];
    for(var key in postData){
        keys.push(key);
    }
    keys = keys.sort();
    var str = '';
    for(var i=0; i<keys.length; i++) {
        var key = keys[i];
        if(typeof postData[key] != "string" && typeof postData[key] != "number"){

        }else {
            str += key + '=' + postData[key] +'&';
        }
    }
    str = str.substr(0, str.length - 1);
    return md5(str + secret);
}
/**
 * 校验是否有调用权限
 * @param scope
 * @param allscope
 */
exports.checkScope = function(scope, allscope)
{
    if(!allscope) return true;
    var strArray = allscope.split(',');
    for( var i=0;i<strArray.length;i++ )
    {
        if( strArray[i] == scope )
        {
           return true;
        }
    }
    return false;
}
/**
 * 获取客户端IP
 * @param req
 * @returns {*}
 */
exports.getClientIP = function(req)
{
    var ip = req.headers['x-real-ip']||req.headers['x-forwarded-for']||req.connection.remoteAddress;
    if(!ip) return '';
    var strArray = ip.split(':');
    return strArray[strArray.length-1];
}
/**
 * 生成接口调用的url
 * @param host
 * @param api
 * @param data
 * @returns {string}
 */
exports.createUrl = function (host,data)
{
    var keys = [];
    for(var key in data){
        keys.push(key);
    }
    keys = keys.sort();
    var url = host+'?';
    for(var i=0; i<keys.length; i++) {
        var key = keys[i];
        url += key + '=' + encodeURIComponent(data[key]) +'&';
    }
    url = url.substr(0, url.length - 1);
    return url;
}
/**
 *
 * @param text
 * @param encode binary hex
 */
function md5 (text,encode) {
    if(!encode) encode = 'hex';
    return crypto.createHash('md5').update(text,'utf8').digest(encode);
};
exports.md5=md5;
/**
 *数组拼接以glue
 * @param glue
 * @param pieces object
 * @returns {*}
 */
exports.implode = function (glue, pieces) {
    var i = ''
    var retVal = ''
    var tGlue = ''
    if (arguments.length === 1) {
        pieces = glue
        glue = ''
    }
    if (typeof pieces === 'object') {
        if (Object.prototype.toString.call(pieces) === '[object Array]') {//这是数组情况[]
            return pieces.join(glue)
        }
        for (i in pieces) {//json 对象
            retVal += tGlue + pieces[i]
            tGlue = glue
        }
        return retVal;
    }
    return pieces
}
exports.toWhereFields = function (jsonObj)
{
    if(typeof jsonObj=='string'){
        return jsonObj;
    }
    var retVal ='';
    var i = ''
    var tGlue = ''
    for (i in jsonObj) {//json 对象
        if(jsonObj[i] === null)
        {
            retVal += tGlue +i+" ="+jsonObj[i];
        }else if (jsonObj[i] === true) {
            retVal += tGlue +i;
        }else{
            retVal += tGlue +i+" = '"+ jsonObj[i]+"'";
        }
        tGlue = ' And '
    }
    return retVal;
}
exports.toUpdateFields = function (jsonObj)
{
    var retVal ='';
    var i = ''
    var tGlue = ''
    for (i in jsonObj) {//json 对象
        if(jsonObj[i] === null)
        {
            retVal += tGlue +i+" ="+jsonObj[i];
        }else if (jsonObj[i] === true) {
            retVal += tGlue +i;
        }else{
            retVal += tGlue +i+" = '"+ jsonObj[i]+"'";
        }
        tGlue = ','
    }
    return retVal;
}
exports.toInsertFields = function (jsonObj)
{
    var fields ='';
    var values = '';
    var i = ''
    var tGlue = ''
    for (i in jsonObj) {//json 对象
        fields += tGlue+i;
        if(jsonObj[i] === null)
        {
            values += tGlue+jsonObj[i];
        }else{
            values += tGlue+"'"+jsonObj[i]+"'";
        }
        tGlue = ',';
    }
    return {field:fields,value:values};
}
//随机生成6位随机数
function generateSalt(len)
{
    if(!len) len =6;
    var chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var str ='';
    for(var i=0; i<len; i++){
        var pos = Math.round(Math.random() * (chars.length-1));
        str += chars.substr(pos, 1);
    }
    return str;
}
exports.generateSalt =generateSalt;
exports.generateToken = function(num,len){
    len = len||20;
    var st = num.toString(16);
    return st+'g'+generateSalt(len-st.length-1);
}

exports.rd =function(n,m){
    var c = m-n+1;
    return Math.floor(Math.random() * c + n);
}
exports.encodePassword = function(pass, salt)
{
    return md5(md5(pass+'cdc'+salt));
}
exports.addslashes = function(str) {

    return (str + '')
        .replace(/[\\"']/g, '\\$&')
        .replace(/\u0000/g, '\\0')
}
//重复字符
exports.strRepeat = function(input, multiplier) {
    var y = ''
    while (true) {
        if (multiplier & 1) {
            y += input
        }
        multiplier >>= 1
        if (multiplier) {
            input += input
        } else {
            break
        }
    }
    return y
}
exports.urlencode = function  (str) {
    str = (str + '')
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A')
        .replace(/%20/g, '+')
}
exports.newError =  function (message, code, status,isJson) {
    if(typeof status == 'undefined') {
        status = 200;
    }
    if(typeof isJson =='undefined') {
        isJson =true;
    }
    if(typeof code =='undefined') {
        code = 500;
    }
    var err = new Error(message);
    err.status = status;
    err.isJson = isJson;
    err.error_code = code;
    return err;
}