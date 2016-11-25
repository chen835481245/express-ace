var config = require('../../config/config');
var moment = require('moment');
var async = require('async');
var ApplicationError = require('../../lib/application_error');
var adminModel = require('../../model/admin');
var logger = require('../../lib/logger');
var commonFun = require('../../lib/common');
//后台登陆页面
exports.login = function (req, res, next) {
    res.render('admin/login',{title:'慧芯智能人脸考勤平台'});
}
//后台首页
exports.home = function (req, res, next) {
    res.render('admin/index',{title:'慧芯智能人脸考勤平台',menu:req.menu});
}
//管理员列表
exports.user = function (req, res, next) {
    res.render('admin/user',{title:'慧芯智能人脸考勤平台',menu:req.menu});
}
exports.adminUserData = function (req, res, next) {
    var param = req.query;
    adminModel.adminUserData(param,function(err,rows){
        if (err) return next(err, null);
        res.contentType('json');//返回的数据类型
        res.send(JSON.stringify(rows));//给客户端返回一个json格式的数据
        res.end();
    });
}
exports.doAdminUser = function (req, res, next) {
    var param = req.body;
    param['IP']=commonFun.getClientIP(req);
    switch(param.oper)
    {
        case 'add':
            adminModel.addAdminUser(param,function(err,rows){
                if (err) return next(err, null);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({'code':0}));
            });
            break;
        case 'edit':
            adminModel.editAdminUser(param,function(err,rows){
                if (err) return next(err, null);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({'code':0}));
            });
            break;
        case 'del':
            adminModel.delAdminUser(param,function(err,rows){
                if (err) return next(err, null);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({'code':0}));
            });
            break;
        default:
            return next('param error', null);
    }

}
//公司列表
exports.company = function (req, res, next) {
    var param = req.body;
    adminModel.companyData(param,function(err,rows){
        if (err) return next(err, null);
        res.render('admin/company',{title:'慧芯智能人脸考勤平台',data:rows,menu:req.menu,menuid:req.query.menuid});
    });
}
exports.companyDel = function (req, res, next) {
    var param = req.body;
    adminModel.companyDel(param,function(err,rows){
        if (err) return next(err, null);
        res.contentType('json');//返回的数据类型
        var ret={};
        ret['code']=0;
        res.send(JSON.stringify(ret));//给客户端返回一个json格式的数据
        res.end();
    });
}
exports.companyView = function (req, res, next) {
    var cid = req.query.CID;
    adminModel.companyView(cid,function(err,row){
        if (err) return next(err, null);
        res.render('admin/companyView',{title:'慧芯智能人脸考勤平台',data:row,menu:req.menu,msg:''});
    });
}
exports.companyUpdate = function (req, res, next) {
    var param = req.body;
    adminModel.companyUpdate(param,function(err,row){
        if (err) return next(err, null);
        res.render('admin/companyView',{title:'慧芯智能人脸考勤平台',data:param,menu:req.menu,msg:'操作成功',menuid:req.query.menuid});
    });
}

//节假日列表
exports.holiday = function (req, res, next) {
    res.render('admin/holiday',{title:'慧芯智能人脸考勤平台',menu:req.menu});
}
exports.holidayData = function (req, res, next) {
    var param = req.query;
    adminModel.holidayData(param,function(err,rows){
        if (err) return next(err, null);
        res.contentType('json');//返回的数据类型
        res.send(JSON.stringify(rows));//给客户端返回一个json格式的数据
        res.end();
    });
}
//节假日操作
exports.doHoliday = function (req, res, next) {
    var param = req.body;
    switch(param.oper)
    {
        case 'add':
            adminModel.addHoliday(param,function(err,rows){
                if (err) return next(err, null);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({'code':0}));
            });
            break;
        case 'edit':
            adminModel.editHoliday(param,function(err,rows){
                if (err) return next(err, null);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({'code':0}));
            });
            break;
        case 'del':
            adminModel.delHoliday(param,function(err,rows){
                if (err) return next(err, null);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({'code':0}));
            });
            break;
        default:
            return next('param error', null);
    }

}
