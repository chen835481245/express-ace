var config = require('../../config/config');
var moment = require('moment');
var async = require('async');
var ApplicationError = require('../../lib/application_error');
//后台登陆页面
exports.login = function (req, res, next) {
    res.render('auth/login',{title:'慧芯智能人脸考勤平台'});
}

