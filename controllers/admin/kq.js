var config = require('../../config/config');
var moment = require('moment');
var async = require('async');
var ApplicationError = require('../../lib/application_error');
var kqModel = require('../../model/kq');
var adminModel = require('../../model/admin');
var logger = require('../../lib/logger');
//人员列表
exports.member = function (req, res, callback) {
    var param = res.body;
    adminModel.companyData(param,function(err,rows){
        if (err) return callback(err, null);
        res.render('kq/member',{title:'慧芯智能人脸考勤平台',company:rows,menu:req.menu});
    });
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
//考勤记录
exports.records = function (req, res, callback) {
    async.series({
        company: function (callback){
            adminModel.companyData({},function(err,rows){
                if (err) return callback(err, null);
                callback(null,rows);
            });
        },
    },function(err, results) {
        res.render('kq/records',{title:'慧芯智能人脸考勤平台',company:results.company,menu:req.menu});
    });
}
exports.recordsData = function (req, res, callback) {
    var param = req.query;
    kqModel.recordsData(param,function(err,data){
        if (err) return callback(err, null);
        res.contentType('json');//返回的数据类型
        res.send(JSON.stringify(data));//给客户端返回一个json格式的数据
        res.end();
    });
}
//考勤明细
exports.recordsMore = function (req, res, callback) {
    async.series({
        company: function (callback){
            adminModel.companyData({},function(err,rows){
                if (err) return callback(err, null);
                callback(null,rows);
            });
        },
    },function(err, results) {
        res.render('kq/records',{title:'慧芯智能人脸考勤平台',company:results.company,menu:req.menu});
    });
}
exports.recordsMoreData = function (req, res, callback) {
    var param = req.query;
    kqModel.recordsMoreData(param,function(err,data){
        if (err) return callback(err, null);
        res.contentType('json');//返回的数据类型
        res.send(JSON.stringify(data));//给客户端返回一个json格式的数据
        res.end();
    });
}





