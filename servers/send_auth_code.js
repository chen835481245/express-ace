var Request = require('request');
var Iconv = require('iconv-lite');
var Logger = require('../lib/logger');
var ApplicationError = require('../lib/application_error');
var Config = require('../config/config');
//发送短信验证码
/**
 *
 * @param  array phones
 * @param message
 * @param callback
 */
exports.send =function (phones, message, callback) {
    message = '【Facevisa】'+message;
    if(typeof phones != 'object')
    {
        var phoneStr =phones;

    }
    try {
        var phoneStr= phones.join(',');
    }catch (e)
    {
        return callback(new ApplicationError.CodeResponse('参数有误', Config.error_code.system_error));
    }

    var options = {
        url:"http://202.91.244.252/qd/SMSSendYD?usr=&pwd=&mobile="+phoneStr+"&sms="+encodeURIComponent_GBK(content),
        method: 'GET',
        headers: {
            'User-Agent': 'request',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    Request(options, function(error,response,body){
        if (!error && response.statusCode == 200) {//出异常的时候也是这个条件 需要处理
            Logger.log('info','send auth code',body.toString())
            var ret = body.toString();
            if(ret.substr(0,1)!='0')
            {
                callback(new ApplicationError.CodeResponse('发送短信失败', Config.error_code.send_auth_code_error))
            }

            return callback(null);
        }
        if(error) Logger.log('error',error);
        return callback(new ApplicationError.CodeResponse('系统服务调用异常', Config.error_code.system_error));

    })
}
function encodeURIComponent_GBK(str)
{
    if(str==null || typeof(str)=='undefined' || str=='')
        return '';

    var a = str.toString().split('');

    for(var i=0; i<a.length; i++) {
        var ai = a[i];
        if( (ai>='0' && ai<='9') || (ai>='A' && ai<='Z') || (ai>='a' && ai<='z') || ai==='.' || ai==='-' || ai==='_') continue;
        var b = Iconv.encode(ai, 'gbk');
        var e = ['']; // 注意先放个空字符串，最保证前面有一个%
        for(var j = 0; j<b.length; j++)
            e.push( b.toString('hex', j, j+1).toUpperCase() );
        a[i] = e.join('%');
    }
    return a.join('');
}