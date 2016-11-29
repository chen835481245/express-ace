var ApplicationError = require('../../lib/application_error');
var Config = require('../../config/config');
var DaoFactory = require('../../proxy');
var CommonFun = require('../../lib/common');
var MemberMod = require('../../model/member_mod');
var CompanyMod = require('../../model/company_mod');
var Moment  = require('moment');
var Async = require('async');
//获取今天的打卡信息(配置,记录)
exports.todayInfo = function (req, res, next) {
    var postData = req.body;
    var memberInfo = req.memberInfo;
    var now =Moment();
    var today = now.format('YYYY-MM-DD');
}
//上班打卡
exports.firstClock = function (req, res, next) {

}
//下班打卡
exports.lastClock = function (req, res, next) {

}
//外勤打卡开始 申请单
exports.outworkClockStart = function (req, res, next) {
    

}
//外勤打卡结束
exports.outworkClockEnd = function (req, res, next) {


}
//外勤打卡上报位置
exports.outworkClockLocation = function (req, res, next) {


}
//公司某一天的考勤信息
exports.companyOneDayClockInfo = function (req, res, next) {

}
//员工某段时间的考勤统计
exports.memberClockStatistics = function (req, res, next) {

}
//导出考勤统计 一段时间
exports.exportClockStatistics = function (req, res, next) {

}
