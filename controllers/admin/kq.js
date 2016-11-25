var config = require('../../config/config');
var moment = require('moment');
var async = require('async');
var ApplicationError = require('../../lib/application_error');
var kqModel = require('../../model/kq');
var logger = require('../../lib/logger');
//人员列表
exports.member = function (req, res, next) {
    res.render('kq/member',{title:'慧芯智能人脸考勤平台',menu:req.menu});
}
exports.memberData = function (req, res, callback) {
    var param = req.query;

    kqModel.memberData(param,function(err,data){
        if (err) return callback(err, null);
        res.contentType('json');//返回的数据类型
        res.send(JSON.stringify(data));//给客户端返回一个json格式的数据
        res.end();
    });
}



