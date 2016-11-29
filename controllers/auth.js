var CommonFun  = require('../lib/common');
var Logger = require('../lib/logger');
var Config = require('../config/config');
var DaoFactory = require('../proxy');
var ApplicationError = require('../lib/application_error');
//服务器的验证接口

//后台管理员验证
exports.authAdmin =function (req, res, next) {
    
}
//服务接口验证API Token

//校验签名的有效性
exports.authApiSign = function (req, res, next) {
    var postData = req.body;
    if(!postData.Timestamp || isNaN(postData.Timestamp)) {
        return next(new ApplicationError.JsonResponse('时间戳参数有误', Config.error_code.timestamp_error));
    }
    if(!postData.Sign || typeof postData.Sign != 'string' || postData.Sign.length!=32)
    {
        return next(new ApplicationError.JsonResponse('签名参数有误', Config.error_code.param_error));
    }
    if(!checkSign(postData))
    {
        return next(new ApplicationError.JsonResponse('校验签名失败', Config.error_code.check_sign_error));
    }
    next();
}

//校验签名和token 的有效性
exports.authApiSignToken = function (req, res, next) {
    var postData = req.body;
    if(!postData.Timestamp || isNaN(postData.Timestamp)) {
        return next(new ApplicationError.JsonResponse('时间戳参数有误', Config.error_code.timestamp_error));
    }
    if(!postData.Sign || typeof postData.Sign != 'string' || postData.Sign.length!=32)
    {
        return next(new ApplicationError.JsonResponse('签名参数有误', Config.error_code.param_error));
    }
    if(!postData.Token || typeof postData.Token != 'string' )
    {
        return next(new ApplicationError.JsonResponse('Token参数有误', Config.error_code.token_invalid));
    }
    if(!checkSign(postData))
    {
        return next(new ApplicationError.JsonResponse('校验签名失败', Config.error_code.check_sign_error));
    }
    //TODO  token的校验
    DaoFactory.getMemberDao().getData({Token:postData.Token},function (err, row) {
        if(err) return next(new ApplicationError.JsonResponse('获取数据出错', Config.error_code.system_error));
        if(!row) return next(new ApplicationError.JsonResponse('没有找到用户信息', Config.error_code.token_invalid));
        if(row.Status==2) next(new ApplicationError.JsonResponse('用户被禁用了', Config.error_code.account_forbid));
        req.memberInfo = row;
        next();
    })
}

function checkSign(postData) {
    return CommonFun.checkSign(postData, postData.Sign, Config.sign_secret,{Sign:true,Image:true,FaceImg:true});

}