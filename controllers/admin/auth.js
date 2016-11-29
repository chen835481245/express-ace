var config = require('../../config/config');
var moment = require('moment');
var async = require('async');
var ApplicationError = require('../../lib/application_error');
var authModel = require('../../model/auth');
//后台登陆页面
exports.login = function (req, res, next) {
    var param = req.body;
    if(req.session.username){
        res.redirect('/admin/admin/home');
    }
    if(param.username){
        authModel.checkLogin(param,function(err,msg){
            if(err){
                res.render('auth/login',{title:'慧芯智能人脸考勤平台',msg:err});
            }else{
                req.session.username=param.username;
                res.redirect('/admin/admin/home');
            }
        });
    }else{
        res.render('auth/login',{title:'慧芯智能人脸考勤平台',msg:false});
    }
}
exports.loginOut = function (req, res, next) {
    req.session.username = null;
    res.redirect('/admin/auth/login');
}


