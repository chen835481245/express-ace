//调用facevisa 的接口
var request = require('request');
var config = require('../config/config');
var commonFun = require('../lib/common');
var logger = require('../lib/logger');
var fs = require('fs');
exports.ocr = function (imgBuffer, flag, callback) {
    var postData = {
        client_id: config.facevisa.app_id,
        flag: flag,
        timestamp: parseInt(new Date().getTime() / 1000),
    };
    postData.sign = commonFun.sign(postData, config.facevisa.app_secret);
    postData.image = {//sfz_behind.jpg sfz_front.jpg
        value: imgBuffer,
        options: {
            filename: 'sfz.jpg',
            contentType: 'image/jpeg'
        }
    };

    var options = {
        url: config.facevisa.apis.ocr,
        method: 'POST',
        headers: {
            'User-Agent': 'request',
            'Content-Type': 'image/jpeg'
        },
        formData: postData
    };

    request(options, function (error, response, body) {
        if (error || response.statusCode != 200) {
            return callback(commonFun.newError('ocr 失败', config.error_code.system_error));
        }
        var contentType = response.headers['content-type'] || response.headers['Content-Type'];
        logger.log('info',contentType, body.toString());
        try {
            var retData = JSON.parse(body);
        }catch (parseError){
            logger.log('error', 'fr_json_parse');// 记录请求
            return callback(commonFun.newError('ocr 失败', config.error_code.system_error));
        }
        if(typeof retData['code'] != 'undefined')
        {
            return callback(commonFun.newError(retData.message,config.error_code.ocr_fail));
        }
        return callback(null, retData);
    });

}
exports.idAuthWithImg = function(card_no,name,callback) {
    var postData = {
        client_id: config.facevisa.app_id,
        card_no:card_no,
        name:name,
        timestamp: parseInt(new Date().getTime() / 1000),
    };
    postData.sign = commonFun.sign(postData, config.facevisa.app_secret);
    var options = {
        url:config.facevisa.apis.idAuthWithImg,
        method: 'POST',
        headers: {
            'User-Agent': 'request',
        },
        form: postData// 加了这个请求类型的Content-Type就是multipart/form-data
    };
    request(options, function(error,response,body){
        if (error || response.statusCode != 200) {
            return callback(commonFun.newError('身份证真实性调用 失败', config.error_code.system_error));
        }
        var contentType = response.headers['content-type'] || response.headers['Content-Type'];
        logger.log('info',contentType, body.toString());
        try {
            var retData = JSON.parse(body);
        }catch (parseError){
            logger.log('error', 'fr_json_parse');// 记录请求
            return callback(commonFun.newError('身份证真实性调用 失败', config.error_code.system_error));
        }
        if(typeof retData['code'] != 'undefined')
        {
            return callback(commonFun.newError(retData.message,config.error_code.system_error));
        }
        return callback(null, retData);
    });
}
exports.crossMatch = function(row,callback) {
    var postData = {
        client_id: config.facevisa.app_id,
        card_no:row.card_no,
        name:row.name,
        orient:1,
        timestamp: parseInt(new Date().getTime() / 1000),
    };
    postData.sign = commonFun.sign(postData, config.facevisa.app_secret);
    postData.img_sfz = {
        value:  fs.createReadStream(config.states_path+row.image_sfz),
        options: {
            filename: 'sfz.jpg',
            contentType: 'image/jpeg'
        }
    };
    postData.img_ht = {
        value:  fs.createReadStream(config.states_path+row.image_face),
        options: {
            filename: 'ht.jpg',
            contentType: 'image/jpeg'
        }
    };
    var options = {
        url:config.facevisa.apis.crossMatch,
        method: 'POST',
        headers: {
            'User-Agent': 'request',
        },
        formData: postData// 加了这个请求类型的Content-Type就是multipart/form-data
    };
    request(options, function(error,response,body){
        if (error || response.statusCode != 200) {
            return callback(commonFun.newError('调用交叉比对失败', config.error_code.system_error));
        }
        var contentType = response.headers['content-type'] || response.headers['Content-Type'];
        logger.log('info',contentType, body.toString());
        try {
            var retData = JSON.parse(body);
        }catch (parseError){
            logger.log('error', 'fr_json_parse');// 记录请求
            return callback(commonFun.newError('调用交叉比对失败', config.error_code.system_error));
        }
        if(typeof retData['code'] != 'undefined')
        {
            return callback(commonFun.newError(retData.message,config.error_code.system_error));
        }
        return callback(null, retData);

    });

}
