//调用facevisa 的接口
var request = require('request');
var config = require('../config/config');
var commonFun = require('../lib/common');
var async = require('async');
var logger = require('../lib/logger');
var fs = require('fs');
var DaoFactory = require('../proxy');
var moment = require('moment');

exports.memberData = function (param, callback) {
    var where = {};
    var data = {};
    var perPage = param.length?param.length:10;
    var page = param.start?Math.ceil(param.start/perPage)+1:1;
    var search=param['search']['value'];
    if(search){
        where = " Phone like '%"+search+"%' or Name like '"+search+"' or Nickname like '"+search+"'";
    }
    var orderBy = "MID desc";
    DaoFactory.getMemberDao().getCount(where,function(err,num){
        if (err) return callback(err, null);
        DaoFactory.getMemberDao().getPageList(where,page,perPage, function(err,rows){
            if (err) return callback(err, null);
            data['data']=rows;
            data['recordsTotal']=num;//总条数
            data['recordsFiltered']=num;//过滤后的条数
            data['draw']=param.draw;
            callback(null,data);
        },null,orderBy);
    });
}
exports.companyArray = function (param, callback) {
    var where = {};
    DaoFactory.getCompanyDao().getArray(where,function(err,data){
        if (err) return callback(err, null);
        callback(null,data);
    },['CID','CompanyName']);
}






