var request = require('request');
var config = require('../config/config');
var commonFun = require('../lib/common');
var async = require('async');
var logger = require('../lib/logger');
var fs = require('fs');
var DaoFactory = require('../proxy');
var moment = require('moment');
exports.checkLogin = function (param, callback) {
    var password = commonFun.md5(param.password);
    DaoFactory.getAdminUserDao().getCount({'Name':param.username,'Password':password}, function(err,num){
        if(num<1){
            return callback('用户名或密码不正确', null);
        }else{
            return callback(null, '登录成功');
        }
    });
}






