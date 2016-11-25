var Request = require('request');
var CommonFun = require('../lib/common');
var Logger = require('../lib/logger');
var Config = require('../config/config');
var ApplicationError = require('../lib/application_error');

exports.addPerson = function (groupID, callback) {
    var postData = {
        client_id: Config.facevisa.app_id,
        timestamp: parseInt(new Date().getTime()/1000),
        groupid:groupID
    };
    postData.sign = CommonFun.sign(postData, Config.facevisa.app_secret);
    var options = {
        url:Config.facevisa.apis.addPerson,
        method: 'POST',
        headers: {
            'User-Agent': 'kq node request',
        },
        form: postData// 加了这个请求类型的Content-Type就是multipart/form-data
    };
    Request(options, function(error, response, body){
        if (!error && response.statusCode == 200) {//出异常的时候也是这个条件 需要处理
            Logger.log('info','facevisa add person response',body.toString())
            try {
                var retData = JSON.parse(body);
            }catch (parseError){
                return callback(new ApplicationError.CodeResponse('数据解析异常', Config.error_code.system_error));
            }
            if(typeof retData['code'] != 'undefined' && retData['code'] !== 0)
            {
                return callback(errorHandler(retData['code']));
            }
            return callback(null, retData);
        }
        if(error) Logger.log('error',error);
        return callback(new ApplicationError.CodeResponse('系统服务调用异常', Config.error_code.system_error));
    });
}
exports.addFace = function (personID,imgBuff, callback,dir,contentType) {
    var postData = {
        client_id: Config.facevisa.app_id,
        timestamp: parseInt(new Date().getTime()/1000),
        personid:personID,
        dir:dir||1,
    };
    postData.sign = CommonFun.sign(postData, Config.facevisa.app_secret);
    var options = {
        url:CommonFun.createUrl(Config.facevisa.apis.addFace,postData),
        method: 'POST',
        headers: {
            'User-Agent': 'kq node request',
            'Content-Type': contentType||'image/jpeg'
        },
        body: imgBuff// 加了这个请求类型的Content-Type就是multipart/form-data
    };
    Request(options, function(error, response, body){
        if (!error && response.statusCode == 200) {//出异常的时候也是这个条件 需要处理
            Logger.log('info','facevisa add face response',body.toString())
            try {
                var retData = JSON.parse(body);
            }catch (parseError){
                return callback(new ApplicationError.CodeResponse('数据解析异常', Config.error_code.system_error));
            }
            if(typeof retData['code'] != 'undefined' && retData['code'] !== 0)
            {
                return callback(errorHandler(retData['code']));
            }
            return callback(null, retData);
        }
        if(error) Logger.log('error',error);
        return callback(new ApplicationError.CodeResponse('系统服务调用异常', Config.error_code.system_error));
    });
    
}
exports.personMatch = function (personID, imgBuff, callback, contentType) {
    var postData = {
        client_id: Config.facevisa.app_id,
        timestamp: parseInt(new Date().getTime()/1000),
        personid:personID,
    };
    postData.sign = CommonFun.sign(postData, Config.facevisa.app_secret);
    var options = {
        url:CommonFun.createUrl(Config.facevisa.apis.personMatch,postData),
        method: 'POST',
        headers: {
            'User-Agent': 'kq node request',
            'Content-Type': contentType||'image/jpeg'
        },
        body: imgBuff
    };
    Request(options, function(error, response, body){//这个调用可以统一处理了
        if (!error && response.statusCode == 200) {//出异常的时候也是这个条件 需要处理
            Logger.log('info','facevisa person match response',body.toString())
            try {
                var retData = JSON.parse(body);
            }catch (parseError){
                return callback(new ApplicationError.CodeResponse('数据解析异常', Config.error_code.system_error));
            }
            if(typeof retData['code'] != 'undefined' && retData['code'] !== 0)
            {
                return callback(errorHandler(retData['code']));
            }
            return callback(null, retData);
        }
        if(error) Logger.log('error',error);
        return callback(new ApplicationError.CodeResponse('系统服务调用异常', Config.error_code.system_error));
    });
}
exports.delFace = function(faceID, callback) {//删除人脸
    var postData = {
        client_id: appID,
        faceid:68651,
        timestamp: parseInt(new Date().getTime()/1000),
    };
    postData.sign = sign(postData, secret);
    var options = {
        url:host+'/v2/person/del_face',
        method: 'DELETE',
        headers: {
            'User-Agent': 'request',
        },
        form:postData,
    };
    request(options, function(error,response,body){
        var contentType = response.headers['content-type'] || response.headers['Content-Type'];
        if(error||response.statusCode !=200){
            console.log(contentType,body.toString());
            return callback('error');
        }
        console.log(contentType,body.toString());
        if (contentType =='application/json') {
        }
        callback(null);

    });

}
exports.clearFace = function(personID, callback) {//添加员工测试
    var postData = {
        client_id: appID,
        personid:0,
        timestamp: parseInt(new Date().getTime()/1000),
    };
    postData.sign = sign(postData, secret);
    var options = {
        url:host+'/v2/person/clear_face',
        method: 'DELETE',
        headers: {
            'User-Agent': 'request',
        },
        form:postData
    };
    request(options, function(error,response,body){
        var contentType = response.headers['content-type'] || response.headers['Content-Type'];
        if(error||response.statusCode !=200){
            console.log(contentType,body.toString());
            return callback('error');
        }
        console.log(contentType,body.toString());
        if (contentType =='application/json') {
        }
        callback(null);

    });

}
exports.getFace = function(personID, callback) {//添加员工测试
    var postData = {
        client_id: appID,
        faceid:68651,
        timestamp: parseInt(new Date().getTime()/1000),
    };
    postData.sign = sign(postData, secret);
    var options = {
        url:createUrl(host, '/v2/person/get_face',postData ),
        method: 'GET',
        headers: {
            'User-Agent': 'request',
        },
    };
    request(options, function(error,response,body){
        var contentType = response.headers['content-type'] || response.headers['Content-Type'];
        if(error||response.statusCode !=200){
            console.log(contentType,body.toString());
            return callback('error');
        }
        console.log(contentType,body.toString());
        if (contentType =='application/json') {
        }
        callback(null);

    });
}


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
function errorHandler(code) {
    switch (code)
    {
        case 100:
            return new ApplicationError.CodeResponse('参数错误',Config.error_code.system_error);
            break;
        case -218:
            return new ApplicationError.CodeResponse('未找到指定人员的人脸数据',Config.error_code.system_error);
            break;
        default:
            return new ApplicationError.CodeResponse('系统服务调用异常', Config.error_code.system_error)

    }
}