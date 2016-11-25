//调用facevisa 的接口
var request = require('request');
var config = require('../config/config');
var commonFun = require('../lib/common');
var async = require('async');
var logger = require('../lib/logger');
var fs = require('fs');
var DaoFactory = require('../proxy');
var moment = require('moment');
exports.adminUserData = function (param, callback) {
    var where = {};
    var data = {};
    var page = param.page?param.page:1;
    var perPage = param.rows?param.rows:10;
    var sidx = param.sidx?param.sidx:'AdminID';
    var sord = param.sord?param.sord:'asc';
    var orderBy = sidx+' '+sord;
    DaoFactory.getAdminUserDao().getCount(where,function(err,num){
        if (err) return callback(err, null);
        DaoFactory.getAdminUserDao().getPageList(where,page,perPage, function(err,rows){
            if (err) return callback(err, null);
            data['page'] =page;
            data['total'] =Math.ceil(num/perPage);
            data['records'] =num;
            data['rows']=rows;
            for(var i in rows){
                rows[i]['Password']='******';
            }
            callback(null,data);
        },null,orderBy);
    });
}
exports.addAdminUser = function (param, callback) {
    var data = {};
    data['Name']=param.Name;
    data['Password']=commonFun.md5(param.Password);
    data['RoleID']=1;
    data['Status']=1;
    var now = moment();
    data['Createtime']=data['LastLoginTime']=now.format('YYYY-MM-DD HH:mm:ss');
    data['LastLoginIP']=data['CreateIP']=param.IP;

    DaoFactory.getAdminUserDao().getCount({'Name':param.Name},function(err,num){
        if(num<1){
            DaoFactory.getAdminUserDao().insertData(data, function(err,packet){
                if (err) return callback(err, null);
                callback(null,packet);
            });
        }else{
            return callback('此账号已存在', null);
        }
    });
}
exports.editAdminUser = function (param, callback) {
    var data = {};
    if(param.Password!='******'&&param.Password!=''){
        data['Password']=commonFun.md5(param.Password);
    }else{
        return callback(null, true);
    }
    DaoFactory.getAdminUserDao().updateData({'AdminID':param.AdminID},data, function(err,packet){
        if (err) return callback(err, null);
        callback(null,packet);
    });
}
exports.delAdminUser = function (param, callback) {
    var ids= param.id;
    var where = " AdminID in("+ids+")";
    DaoFactory.getAdminUserDao().deleteData(where, function(err,packet){
        if (err) return callback(err, null);
        callback(null,packet);
    });
}


exports.companyData = function (param, callback) {
    var where = {};
    DaoFactory.getCompanyDao().getList(where, function(err,rows){
        if (err) return callback(err, null);
        callback(null,rows);
    })
}
exports.companyDel = function (param, callback) {
    var where = {'CID':param.CID};
    DaoFactory.getCompanyDao().deleteData(where, function(err,packet){
        if (err) return callback(err, null);
        callback(null,packet);
    })
}
exports.companyView = function (cid, callback) {
    var where = {'CID':cid};
    DaoFactory.getCompanyDao().getData(where, function(err,row){
        if (err) return callback(err, null);
        callback(null,row);
    })
}
exports.companyUpdate = function (param, callback) {
    var where = {'CID':param.CID};
    DaoFactory.getCompanyDao().updateData(where,param, function(err,packet){
        if (err) return callback(err, null);
        callback(null,packet);
    })
}



exports.holidayData = function (param, callback) {
    var where = {};
    var data = {};
    var page = param.page?param.page:1;
    var perPage = param.rows?param.rows:10;
    var sidx = param.sidx?param.sidx:'ID';
    var sord = param.sord?param.sord:'asc';
    var orderBy = sidx+' '+sord;
    DaoFactory.getAdminWorkDayExceptionDao().getCount(where,function(err,num){
        if (err) return callback(err, null);
        DaoFactory.getAdminWorkDayExceptionDao().getPageList(where,page,perPage, function(err,rows){
            if (err) return callback(err, null);
            data['page'] =page;
            data['total'] =Math.ceil(num/perPage);
            data['records'] =num;
            data['rows']=rows;
            if(rows){
                for(var i in rows){
                    rows[i]['Type']=rows[i]['Type']==1?'休息':'上班';
                }
            }
            callback(null,data);
        },null,orderBy);
    });
}
exports.addHoliday = function (param, callback) {
    var data = {};
    data['WorkDate']=param.WorkDate;
    data['Reason']=param.Reason;
    data['Type']=param.Type;
    DaoFactory.getAdminWorkDayExceptionDao().getCount({'WorkDate':param.WorkDate},function(err,num){
        if(num<1){
            DaoFactory.getAdminWorkDayExceptionDao().insertData(data, function(err,packet){
                if (err) return callback(err, null);
                callback(null,packet);
            });
        }else{
            return callback('日期已存在', null);
        }
    });
}
exports.editHoliday = function (param, callback) {
    var data = {};
    data['WorkDate']=param.WorkDate;
    data['Reason']=param.Reason;
    data['Type']=param.Type;
    DaoFactory.getAdminWorkDayExceptionDao().updateData({'ID':param.ID},data, function(err,packet){
        if (err) return callback(err, null);
        callback(null,packet);
    });
}
exports.delHoliday = function (param, callback) {
    var ids= param.id;
    var where = " ID in("+ids+")";
    DaoFactory.getAdminWorkDayExceptionDao().deleteData(where, function(err,packet){
        if (err) return callback(err, null);
        callback(null,packet);
    });
}





