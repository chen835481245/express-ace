var request = require('request');
var commonFun = require('../lib/common');
var logger = require('../lib/logger');
var config = require('../config/config');
var ApplicationError = require('../lib/application_error');
exports.search =function (url, imgBuff,optionConfig, callback) {

    var urlData =
    {
        appid : config.fr.appid,
        groupid : optionConfig.groupid||0,
        dir : optionConfig.dir||0,
        expect_result:optionConfig.expect_result||0,
        count : optionConfig.count||10,
        order : optionConfig.order||0
    }
    var options = {
        url: commonFun.createUrl(url,config.fr.apis.search, urlData),
        method: 'POST',
        headers: {
            'User-Agent': 'node js',
            'Content-Type': 'image/jpeg'
        },
        body: imgBuff
    };
    request(options, function(error,response,body){
        if (!error && response.statusCode == 200) {//出异常的时候也是这个条件 需要处理
            logger.log('info','fr match response',body.toString())
            try {
                var retData = JSON.parse(body);
            }catch (parseError){
                logger.log('error', 'fr_json_parse_error_search', body);// 记录请求
                return callback(new Error('解析数据失败'));
            }
            if(typeof retData['errcode'] != 'undefined')
            {
                return callback(new Error(url+'返回异常'+retData.errcode));
            }
            return callback(null, retData.persons);
        }
        if(error)
        {
            return callback(error);
        }

        return callback(new Error('fr调用异常'+body.toString()));
    });
}
exports.prepare = function (imgBuff, callback ) {
    var urlData =
    {
        appid : config.fr.appid,
        orient:3,
    }
    var options = {
        url: commonFun.createUrl(config.fr.server,config.fr.apis.prepare, urlData),
        method: 'POST',
        headers: {
            'User-Agent': 'node js',
            'Content-Type': 'image/jpeg'
        },
        body: imgBuff
    };
    request(options, function(error,response,body){
        if (!error && response.statusCode == 200) {//出异常的时候也是这个条件 需要处理
            logger.log('info','fr prepare response',body.toString())
            try {
                var retData = JSON.parse(body);
            }catch (parseError){
                logger.log('error', 'fr_json_parse_error_prepare', body);// 记录请求
                return callback(new Error('解析数据失败'));
            }
            if(typeof retData['errcode'] != 'undefined')
            {
                return callback(new Error('返回异常'+retData.errcode));
            }
            return callback(null, retData);
        }
        if(error)
        {
            return callback(error);
        }

        return callback(new Error('fr调用异常'+body.toString()));
    });



}
exports.match = function (targetId, imgBuff, callback ) {
    var urlData =
    {
        appid : config.fr.appid,
        targetid:targetId,
        orient:3
    }
    var options = {
        url: commonFun.createUrl(config.fr.server,config.fr.apis.match, urlData),
        method: 'POST',
        headers: {
            'User-Agent': 'node js',
            'Content-Type': 'image/jpeg'
        },
        body: imgBuff
    };
    request(options, function(error,response,body){
        if (!error && response.statusCode == 200) {//出异常的时候也是这个条件 需要处理
            logger.log('info','fr match response',body.toString())
            try {
                var retData = JSON.parse(body);
            }catch (parseError){
                logger.log('error', 'fr_json_parse_error_match', body);// 记录请求
                return callback(new Error('解析数据失败'));
            }
            if(typeof retData['errcode'] != 'undefined')
            {
                return callback(new Error('返回异常'+retData.errcode));
            }
            return callback(null, retData);
        }
        if(error)
        {
            return callback(error);
        }

        return callback(new Error('fr调用异常'+body.toString()));
    });
}