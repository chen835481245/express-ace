var request = require('request');
var path = require('path')
var fs = require('fs');
var crypto = require('crypto');
var host = 'http://127.0.0.1:5757';
var secret = '8d59683d7b8bf168bc3137118ceb852b1cdd6f68';

var input_1 = fs.readFileSync( path.join(__dirname, 'test.jpg'));
var input_2 = fs.readFileSync( path.join(__dirname, '11.jpg'));

//var input_1 = fs.readFileSync( path.join(__dirname, '11.jpg'));
//var input_2 = fs.readFileSync( path.join(__dirname, '22.jpg'));

exports.checkLogin = function(callback) {//添加员工测试
    var postData = {
        Phone:15158132014,
        UUID:'11111111111111111111111111111111',
        Timestamp: parseInt(new Date().getTime()/1000),
    };
    postData.Sign = sign(postData, secret);
    postData.Image = input_2.toString('Base64');
    var options = {
        url:host+'/api/m/check_login',
        method: 'POST',
        headers: {
            'User-Agent': 'request',
        },
        form: postData// 加了这个请求类型的Content-Type就是application/x-www-form-urlencoded header
    };
    request(options, function(error,response,body){
        var contentType = response.headers['content-type'] || response.headers['Content-Type'];
        if(error||response.statusCode !=200){
            return callback('error');
        }
        console.log(contentType,body.toString());//application/json {"personid":18862}
        if (contentType =='application/json') {
        }
        callback(null,postData);

    });

}
exports.register = function(callback) {//添加员工测试
    var postData = {
        Phone:15158132014,
        AuthCode:123456,
        UUID:'11111111111111111111111111111111',
        Timestamp: parseInt(new Date().getTime()/1000),
    };
    postData.Sign = sign(postData, secret);
    postData.Image = input_1.toString('Base64');
    var options = {
        url:host+'/api/m/code_reg',
        method: 'POST',
        headers: {
            'User-Agent': 'request',
        },
        form: postData// 加了这个请求类型的Content-Type就是application/x-www-form-urlencoded header
    };
    request(options, function(error,response,body){
        var contentType = response.headers['content-type'] || response.headers['Content-Type'];
        if(error||response.statusCode !=200){
           return callback('error');
        }
        console.log(contentType,body.toString());//application/json {"personid":18862}
        if (contentType =='application/json') {
        }
        callback(null,postData);

    });

}
function sign(postData,secret)
{
    var keys = [];
    for(var key in postData){
        keys.push(key);
    }
    keys = keys.sort();
    var str = '';
    for(var i=0; i<keys.length; i++) {
        var key = keys[i];
        str += key + '=' + postData[key] +'&';
    }
    str = str.substr(0, str.length - 1);
   // console.log(str+secret);
   // console.log(md5(str+secret));
    return md5(str+secret);
}
function md5 (text) {
    return crypto.createHash('md5').update(text,'utf-8').digest('hex');
};
function createUrl(host, api,data)
{
    var keys = [];
    for(var key in data){
        keys.push(key);
    }
    keys = keys.sort();
    var url = host+api+'?';
    for(var i=0; i<keys.length; i++) {
        var key = keys[i];
        url += key + '=' + data[key] +'&';
    }
    url = url.substr(0, url.length - 1);
    return url;
}