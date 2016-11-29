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
exports.companyInfo = function (where, callback) {
    DaoFactory.getCompanyDao().getData(where,function (g_c_err, row) {
        if(g_c_err) return callback(new ApplicationError.CodeResponse('获取公司信息失败',Config.error_code.system_error));
        if(!row) return callback(null,row);
        DaoFactory.getCompanyBranchDao().getList({CID:row['CID']},function (g_f_err,rows) {
            if(g_f_err) return callback(new ApplicationError.CodeResponse('获取部门记录失败',Config.error_code.system_error));
            row['Branches'] =rows;
            callback(null,row);
        },['BID','BranchName'])
    })
}
exports.newCompany = function (memberInfo, companyName, imgBuff, callback) {
    //创建分组
    //添加公司
    //人员加入分组
    //更新人员信息
    //创建公司工作日
}