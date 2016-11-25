//调用facevisa 的接口
var request = require('request');
var config = require('../config/config');
var commonFun = require('../lib/common');
var async = require('async');
var logger = require('../lib/logger');
var fs = require('fs');
var DaoFactory = require('../proxy');
exports.getMenus = function (menuid,callback) {
    var where = {};
    var orderBy="ParentID asc ,OrderNo asc";
    var fields=false;
    DaoFactory.getAdminModuleDao().getList(where, function(err,rows){
        if (err) return done(err, null);
        var arr = {};
        for(var i in rows){
            rows[i]['Class']='';
            if(rows[i]['ParentID']==0){
                var tmpKey=rows[i]['ModuleID'];
                arr[tmpKey]={};
                arr[tmpKey]['parent']=[];
                arr[tmpKey]['subMenu']=[];
                arr[tmpKey]['parent']=rows[i];
            }else{
                var tmpKey=rows[i]['ParentID'];
                if(rows[i]['ModuleID']==menuid){
                    rows[i]['Class']='active';
                    arr[tmpKey]['parent']['Class']='active open';
                }
                arr[tmpKey]['subMenu'].push(rows[i]);
            }
        }
        callback(null,arr);
    },fields,orderBy)
}


