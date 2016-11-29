var DaoFactory = require('../proxy');
var Config = require('../config/config')
var ApplicationError = require('../lib/application_error');
var FacevisaServer =  require('../servers/facevisa');
var SendAuthCodeServer = require('../servers/send_auth_code');
var Moment = require('moment');
var CommonFun = require('../lib/common');
var FileManager = require('../lib/file_manage');
var Logger = require('../lib/logger');
var Fs = require('fs');
var Async = require('async');
//查询公司某天的考勤安排 考虑可以做一个缓存
exports.todayWorkInfo =function (cid,date,callback) {
    DaoFactory.getCompanyWorkDayDao().getData({CID:cid}, function (err, workDay) {
        if(err) return callback(new ApplicationError.CodeResponse('查询公司考勤安排失败',Config.error_code.system_error));
        if(!workDay) return callback(new ApplicationError.CodeResponse('公司工作日没有定义',Config.error_code.system_error));
        DaoFactory.getCompanyWorkDayExceptionDao().getData({CID:cid,WorkDate:date},function (e_err, workException) {
            if(err) return callback(new ApplicationError.CodeResponse('查询公司特例工作日失败',Config.error_code.system_error));
            var ret = {
                WorkDay:workDay,
                WorkDayException:workException
            }
            if(workDay.Holiday==2){
                return callback(null,ret);
            }
            DaoFactory.getAdminWorkDayExceptionDao().getData({WorkDate:date},function (a_w_err, adminWorkDayException) {
                if(a_w_err) return callback(new ApplicationError.CodeResponse('查询法定特例工作日失败',Config.error_code.system_error));
                ret['AdminWorkDayException'] = adminWorkDayException;
                callback(null,ret);
            })
        })

    })
}
//查看公司的考勤地点和wifi
exports.workWifiLocation = function (cid, callback) {
    Async.parallel({
        location:function (done) {
            DaoFactory.getCompanyClockLocationDao().getList({CID:cid},function (g_l_err, rows) {
                if(g_l_err) return done(new ApplicationError.CodeResponse('查询考勤位置出错',Config.error_code.system_error));
                done(null,rows);
            })
        },
        wifi:function (done) {
            DaoFactory.getCompanyClockWifiDao().getList({CID:cid},function (g_w_err, rows) {
                if(g_w_err) return done(new ApplicationError.CodeResponse('查询考Wifi出错',Config.error_code.system_error));
                done(null,rows);
            })
        }
    },function (err, result) {
        if(err) return callback(err);
        callback(null,{
            Location:result['location'],
            Wifi:result['wifi']
        });
    })
}
//查看用户某天的请假情况
exports.absenceInfo = function (date,mid,callback) {
    DaoFactory.getCompanyMemberAbsenceDao().getList({MID:mid})

}
//查看用户某天的打卡情况
exports.clockInfo = function (date, mid, callback) {
    
}
//用户某天的外勤情况
exports.outworkInfo = function (date, mid, callback) {
    
}