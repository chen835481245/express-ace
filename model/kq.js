//调用facevisa 的接口
var request = require('request');
var config = require('../config/config');
var commonFun = require('../lib/common');
var async = require('async');
var logger = require('../lib/logger');
var fs = require('fs');
var DaoFactory = require('../proxy');
var moment = require('moment');
//人员列表
exports.memberData = function (param, callback) {
    var where = {};
    var data = {};
    var perPage = param.length ? param.length : 10;
    var page = param.start ? Math.ceil(param.start / perPage) + 1 : 1;
    var search = param['search']['value'];
    if (param.CID) {
        where['CID'] = param.CID;
    }
    if (search) {
        where["Phone like '%" + search + "%' or Name like '" + search + "' or Nickname like '" + search + "'"] = true;
    }
    var orderBy = "MID desc";
    async.series({
        num: function (callback) {
            DaoFactory.getMemberDao().getCount(where, function (err, num) {
                if (err) return callback(err, null);
                callback(null, num);
            });
        },
        rows: function (callback) {
            DaoFactory.getMemberDao().getPageList(where, page, perPage, function (err, rows) {
                if (err) return callback(err, null);
                callback(null, rows);
            }, null, orderBy);
        },
        company: function (callback) {
            DaoFactory.getCompanyDao().getList({}, function (err, rows) {
                if (err) return callback(err, null);
                callback(null, rows);
            }, ['CID', 'CompanyName']);
        },
        branch: function (callback) {
            DaoFactory.getCompanyBranchDao().getList({}, function (err, rows) {
                if (err) return callback(err, null);
                callback(null, rows);
            }, ['BID', 'BranchName']);
        },

    }, function (err, results) {
        var rows = results.rows;
        var company = results.company;
        var branch = results.branch;
        for (var i in rows) {
            var CID = rows[i]['CID'];
            var BID = rows[i]['BID'];
            for (var j in company) {
                if (company[j]['CID'] == CID) {
                    rows[i]['CompanyName'] = company[j]['CompanyName'];
                }
            }
            for (var k in branch) {
                if (branch[k]['BID'] == BID) {
                    rows[i]['BranchName'] = branch[k]['BranchName'];
                }
            }
        }

        data['data'] = results.rows;
        data['recordsTotal'] = results.num;//总条数
        data['recordsFiltered'] = results.num;//过滤后的条数
        data['draw'] = param.draw;
        callback(null, data);
    });
}
//考勤记录
exports.recordsData = function (param, callback) {
    var where = {};
    var data = {};
    var perPage = param.length ? param.length : 10;
    var page = param.start ? Math.ceil(param.start / perPage) + 1 : 1;
    var search = param['search']['value'];
    if (param.CID) {
        where['CID'] = param.CID;
    }
    if (param.beginDate && param.endDate) {
        var wh = "ClockDate between '" + param.beginDate + "' and '" + param.endDate + "'";
        where[wh] = true;
    }
    if (search) {
        where["ClockDate like '%" + search + "%'"] = true;
    }
    var orderBy = "ClockDate desc";
    async.series({
        num: function (callback) {
            DaoFactory.getCompanyMemberClockDao().getCount(where, function (err, num) {
                if (err) return callback(err, null);
                callback(null, num);
            });
        },
        rows: function (callback) {
            DaoFactory.getCompanyMemberClockDao().getPageList(where, page, perPage, function (err, rows) {
                if (err) return callback(err, null);
                callback(null, rows);
            }, null, orderBy);
        },
        company: function (callback) {
            DaoFactory.getCompanyDao().getList({}, function (err, rows) {
                if (err) return callback(err, null);
                callback(null, rows);
            }, ['CID', 'CompanyName']);
        },
        member: function (callback) {
            DaoFactory.getMemberDao().getList({}, function (err, rows) {
                if (err) return callback(err, null);
                callback(null, rows);
            }, ['MID', 'Name']);
        },
    }, function (err, results) {
        var rows = results.rows;
        var company = results.company;
        var member = results.member;
        for (var i in rows) {
            var CID = rows[i]['CID'];
            var MID = rows[i]['MID'];
            for (var j in company) {
                if (company[j]['CID'] == CID) {
                    rows[i]['CompanyName'] = company[j]['CompanyName'];
                }
            }
            for (var k in member) {
                if (member[k]['MID'] == MID) {
                    rows[i]['Name'] = member[k]['Name'];
                }
            }
        }

        data['data'] = results.rows;
        data['recordsTotal'] = results.num;//总条数
        data['recordsFiltered'] = results.num;//过滤后的条数
        data['draw'] = param.draw;
        callback(null, data);
    });
}







