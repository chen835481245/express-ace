var config = require('../../config/config');
var moment = require('moment');
var async = require('async');
var ApplicationError = require('../../lib/application_error');
//人脸搜索
exports.home = function (req, res, next) {
    return next(new ApplicationError.JsonResponse('网站首页不存在'))
}