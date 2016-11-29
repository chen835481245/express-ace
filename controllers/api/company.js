var ApplicationError = require('../../lib/application_error');
var Config = require('../../config/config');
var DaoFactory = require('../../proxy');
var CommonFun = require('../../lib/common');
var MemberMod = require('../../model/member_mod');
var CompanyMod = require('../../model/company_mod');
var Moment  = require('moment');
var Async = require('async');
//通过邀请码获取公司信息
exports.invitationCode = function (req, res, next) {
    var postData = req.body;
    var inviteCode = postData.AddID;
    if(!inviteCode){
        return next(new ApplicationError.JsonResponse('公司邀请码参数不对', Config.error_code.param_error));
    }
    var memberInfo = req.memberInfo;
    CompanyMod.companyInfo({'AddID':inviteCode},function (err, companyInfo) {
        if(err) return next(new ApplicationError.JsonResponse(err.message,err.error_code));
        if(!companyInfo) next(new ApplicationError.JsonResponse('公司信息没有找到',Config.error_code.data_not_found));
        var ret = {
            CompanyName:companyInfo.CompanyName||'',
            CID:companyInfo.CID,
            Branches:companyInfo.Branches||[]
        }
        res.send(ret);
    })
}
//新增公司申请
exports.newCompany = function (req, res, next) {
    var postData = req.body;
    var memberInfo = req.memberInfo;
    if(memberInfo.CID){
        return next(new ApplicationError.JsonResponse('用户已经加入了公司',Config.error_code.add_company_already));
    }
    if(!postData.CompanyName||postData.CompanyName.length<2)
    {
        return next(new ApplicationError.JsonResponse('公司名称填写有误',Config.error_code.param_error));
    }
    if(!postData.Image||postData.Image.length<100) return next(new ApplicationError.JsonResponse('图片数据不对', Config.error_code.param_error));
    var imgBuff= new Buffer(postData.Image,'Base64');//
    CompanyMod.newCompany(postData.CompanyName,imgBuff,function (n_err,retval) {
        if(n_err) return next(new ApplicationError.JsonResponse(n_err.message,n_err.error_code));
        res.send(retval);
    })
}
//重新提交开通公司审核
exports.editNewCompany = function (req, res, next) {

}
//新增请假申请
exports.newAbsence = function (req, res, next) {
    var postData = req.body;
    var memberInfo = req.memberInfo;
    if(!memberInfo.CID){
        return next(new ApplicationError.JsonResponse('还未加入到公司',Config.error_code.add_company_not_yet));
    }
    var myreg= /^20[1-9]{1}[0-9]{1}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1} [0-1]{1}[0-9]{1}:[0-5]{1}[0-9]:[0-5]{1}[0-9]$/;
    if(!postData.StartDate||!myreg.test(postData.StartDate))
    {
        return next(new ApplicationError.JsonResponse('请假开始时间不对',Config.error_code.param_error));
    }
    if(!postData.EndDate||!myreg.test(postData.EndDate))
    {
        return next(new ApplicationError.JsonResponse('请假结束时间不对',Config.error_code.param_error));
    }
    if(postData.StartDate>postData.EndDate)
    {
        return next(new ApplicationError.JsonResponse('开始时间不能迟于结束时间',Config.error_code.param_error));
    }
    var reason = postData.Reason||'';
    //是否要判断今天已经请假过没有
    DaoFactory.getCompanyMemberAbsenceDao().insertData({
        MID:memberInfo['MID'],
        CID:memberInfo['CID'],
        StartDate:postData.StartDate,
        EndDate:postData.EndDate,
        Reason:reason
    },function (err) {
        if(err) return next(new ApplicationError.JsonResponse('插入数据异常',Config.error_code.system_error));
        res.send({});
    })



}
//获取当前考勤设置
exports.clockSet = function (req, res, next) {
    var postData = req.body;
    var memberInfo = req.memberInfo;
    if(!memberInfo.CID){
        return next(new ApplicationError.JsonResponse('还未加入到公司',Config.error_code.add_company_not_yet));
    }

}
//添加考勤wifi
exports.addWifi = function (req, res, next) {
    var postData = req.body;
    var memberInfo = req.memberInfo;
    if(!memberInfo.CID||memberInfo.StaffRole!=1){
        return next(new ApplicationError.JsonResponse('不是管理员',Config.error_code.not_company_admin));
    }
    if(!postData.WifiName||!postData.MacAddress)
    {
        return next(new ApplicationError.JsonResponse('参数上传不正确',Config.error_code.param_error));
    }
    DaoFactory.getCompanyClockWifiDao().getData({CID:memberInfo.CID,MacAddress:postData.MacAddress},function (g_err, row) {
        if(g_err) return next(new ApplicationError.JsonResponse('查询数据失败',Config.error_code.system_error));
        if(row) return next(new ApplicationError.JsonResponse('该记录已经存在',Config.error_code.data_exist))
        var insertData = {
            CID:memberInfo.CID,
            WifiName:postData.WifiName,
            MacAddress:postData.MacAddress
        }
        DaoFactory.getCompanyClockWifiDao().insertData(insertData, function (i_err, packet) {
            if(i_err) return next(new ApplicationError.JsonResponse('插入数据失败',Config.error_code.system_error));
            res.send({
                WFID:packet.insertId,
                CID:memberInfo.CID,
                WifiName:postData.WifiName,
                MacAddress:postData.MacAddress
            })

        })

    })
}
//删除考勤wifi
exports.delWifi = function (req, res, next) {
    var postData = req.body;
    var memberInfo = req.memberInfo;
    if(!memberInfo.CID||memberInfo.StaffRole!=1){
        return next(new ApplicationError.JsonResponse('不是管理员',Config.error_code.not_company_admin));
    }
    if(!postData.WFID)
    {
        return next(new ApplicationError.JsonResponse('参数上传不正确',Config.error_code.param_error));
    }
    DaoFactory.getCompanyClockWifiDao().getData({CID:memberInfo.CID,WFID:postData.WFID},function (g_err, row) {
        if(g_err) return next(new ApplicationError.JsonResponse('查询数据失败',Config.error_code.system_error));
        if(!row) return next(new ApplicationError.JsonResponse('该记录不存在',Config.error_code.data_not_found))
        DaoFactory.getCompanyClockWifiDao().deleteData({CID:memberInfo.CID,WFID:postData.WFID}, function (d_err, packet) {
            if(d_err) return next(new ApplicationError.JsonResponse('删除数据失败',Config.error_code.system_error));
            res.send({})
        })
    })
}
//添加考勤地点
exports.addLocation = function (req, res, next) {
    var postData = req.body;
    var memberInfo = req.memberInfo;
    if(!memberInfo.CID||memberInfo.StaffRole!=1){
        return next(new ApplicationError.JsonResponse('不是管理员',Config.error_code.not_company_admin));
    }
    if(!postData.Name||isNaN(postData.Longitude)||isNaN(postData.Latitude)||isNaN(postData.Distance))
    {
        return next(new ApplicationError.JsonResponse('参数上传不正确',Config.error_code.param_error));
    }
    var insertData = {
        Name:postData.Name,
        Longitude:parseFloat(postData.Longitude),
        Latitude: parseFloat(postData.Latitude),
        Distance:parseInt(postData.Distance),
        CID:memberInfo.CID
    }
    DaoFactory.getCompanyClockLocationDao().insertData(insertData, function (i_err, packet) {
        if(i_err) return next(new ApplicationError.JsonResponse('插入数据失败',Config.error_code.system_error));
        insertData.LID = packet.insertId;
        res.send(insertData);
    })
}
//删除考勤地点
exports.delLocation = function (req, res, next) {
    var postData = req.body;
    var memberInfo = req.memberInfo;
    if(!memberInfo.CID||memberInfo.StaffRole!=1){
        return next(new ApplicationError.JsonResponse('不是管理员',Config.error_code.not_company_admin));
    }
    if(!postData.LID)
    {
        return next(new ApplicationError.JsonResponse('参数上传不正确',Config.error_code.param_error));
    }
    DaoFactory.getCompanyClockLocationDao().getData({CID:memberInfo.CID,LID:postData.LID},function (g_err, row) {
        if(g_err) return next(new ApplicationError.JsonResponse('查询数据失败',Config.error_code.system_error));
        if(!row) return next(new ApplicationError.JsonResponse('该记录不存在',Config.error_code.data_not_found))
        DaoFactory.getCompanyClockLocationDao().deleteData({CID:memberInfo.CID,LID:postData.LID}, function (d_err, packet) {
            if(d_err) return next(new ApplicationError.JsonResponse('删除数据失败',Config.error_code.system_error));
            res.send({})
        })
    })

}
//编辑考勤时间
exports.editWorkClock = function (req, res, next) {
    //TODO 这里有一个是否更新今天考勤数据的操作?
    var postData = req.body;
    var memberInfo = req.memberInfo;
    if(!memberInfo.CID||memberInfo.StaffRole!=1){
        return next(new ApplicationError.JsonResponse('不是管理员',Config.error_code.not_company_admin));
    }

}
//获取考勤例外列表
exports.clockExceptionList = function (req, res, next) {
    var postData = req.body;
    var memberInfo = req.memberInfo;
    if(!memberInfo.CID||memberInfo.StaffRole!=1){
        return next(new ApplicationError.JsonResponse('不是管理员',Config.error_code.not_company_admin));
    }
    var where = {
        CID:memberInfo.CID
    }
    if(postData.Type==1){
        where['Type'] =1;
    }else if(postData.Type==2)
    {
        where['Type'] =2;
    }
    var page = postData.Page||1;
    var count = postData.Count||20;
//TODO 返回记录的总数
    DaoFactory.getCompanyWorkDayExceptionDao().getPageList(where,page,count,function (p_er, rows) {
        if(p_er) return next(new ApplicationError.JsonResponse('查询数据失败',Config.error_code.system_error));
        res.send({
            Records:rows
        })
    },'','WorkDate desc')
        
    
}
//添加考勤例外
exports.addClockException = function (req, res, next) {
    var postData = req.body;
    var memberInfo = req.memberInfo;
    if(!memberInfo.CID||memberInfo.StaffRole!=1){
        return next(new ApplicationError.JsonResponse('不是管理员',Config.error_code.not_company_admin));
    }
    if(postData.WorkDate<=Moment().format('YYYY-MM-DD'))
    {
        return next(new ApplicationError.JsonResponse('不能添加今天和之前时间的考勤例外',Config.error_code.param_error));
    }
    if(!postData.WorkDate)return next(new ApplicationError.JsonResponse('参数上传不正确',Config.error_code.param_error));

    if(postData.Type ==1 &&(!postData.Start||!postData.End||postData.Start<!postData.End))
    {
        return next(new ApplicationError.JsonResponse('上下班时间错误',Config.error_code.param_error));
    }
    DaoFactory.getCompanyWorkDayExceptionDao().getData({CID:memberInfo.CID,WorkDate:postData.WorkDate},function (g_err, row) {
        if(g_err) return next(new ApplicationError.JsonResponse('查询数据失败',Config.error_code.system_error));
        if(row) return next(new ApplicationError.JsonResponse('该记录已经存在',Config.error_code.data_exist));
        var insertData = {
            CID:memberInfo.CID,
            Type:postData.Type,
            WorkDate:postData.WorkDate,
            Reason:postData.Reason||'',
            Start:postData.Start||'09:00',
            End:postData.End||'18:00'
        }
        DaoFactory.getCompanyWorkDayExceptionDao().insertData(insertData,function (i_err, packet) {
            if(i_err) return next(new ApplicationError.JsonResponse('插入数据失败',Config.error_code.system_error))
            res.send(insertData);
        })
    })
}
//编辑考勤例外
exports.editClockException = function (req, res, next) {
    var postData = req.body;
    var memberInfo = req.memberInfo;
    if(!memberInfo.CID||memberInfo.StaffRole!=1){
        return next(new ApplicationError.JsonResponse('不是管理员',Config.error_code.not_company_admin));
    }
    if(postData.WorkDate<=Moment().format('YYYY-MM-DD'))
    {
        return next(new ApplicationError.JsonResponse('不能编辑今天和今天之前的考勤例外',Config.error_code.param_error));
    }
    if(!postData.WorkDate)return next(new ApplicationError.JsonResponse('参数上传不正确',Config.error_code.param_error));

    if(postData.Type ==1 &&(!postData.Start||!postData.End||postData.Start<!postData.End))
    {
        return next(new ApplicationError.JsonResponse('上下班时间错误',Config.error_code.param_error));
    }
    DaoFactory.getCompanyWorkDayExceptionDao().getData({CID:memberInfo.CID,WorkDate:postData.WorkDate},function (g_err, row) {
        if(g_err) return next(new ApplicationError.JsonResponse('查询数据失败',Config.error_code.system_error));
        if(!row) return next(new ApplicationError.JsonResponse('该记录不存在',Config.error_code.data_not_found));
        var updateData = {
            CID:memberInfo.CID,
            Type:postData.Type,
            WorkDate:postData.WorkDate,
            Reason:postData.Reason||'',
            Start:postData.Start||'09:00',
            End:postData.End||'18:00'
        }
        DaoFactory.getCompanyWorkDayExceptionDao().updateData({CID:memberInfo.CID,WorkDate:postData.WorkDate},updateData,function (u_err, packet) {
            if(u_err) return next(new ApplicationError.JsonResponse('更新数据失败',Config.error_code.system_error))
            res.send(updateData);
        })
    })
}
//删除考勤例外
exports.delClockException = function (req, res, next) {
    var postData = req.body;
    var memberInfo = req.memberInfo;
    if(!memberInfo.CID||memberInfo.StaffRole!=1){
        return next(new ApplicationError.JsonResponse('不是管理员',Config.error_code.not_company_admin));
    }
    if(postData.WorkDate<=Moment().format('YYYY-MM-DD'))
    {
        return next(new ApplicationError.JsonResponse('不能编辑今天和今天之前的考勤例外',Config.error_code.param_error));
    }
    if(!postData.WorkDate)return next(new ApplicationError.JsonResponse('参数上传不正确',Config.error_code.param_error));
    DaoFactory.getCompanyWorkDayExceptionDao().deleteData({CID:memberInfo.CID,WorkDate:postData.WorkDate},function (d_err, packet) {
        if(d_err) return next(new ApplicationError.JsonResponse('删除数据失败',Config.error_code.system_error));
        res.send({});

    })
}
//获取部门列表
exports.branchList = function (req, res, next) {
    var postData = req.body;
    var memberInfo = req.memberInfo;
    if(!memberInfo.CID){
        return next(new ApplicationError.JsonResponse('还未加入公司',Config.error_code.not_company_admin));
    }
    DaoFactory.getCompanyBranchDao().getList({CID:memberInfo.CID},function (err,rows) {
        if(err) return next(new ApplicationError.JsonResponse('查询数据失败',Config.error_code.system_error));
        res.send({
            Branches:rows
        })

    },['CID','BID','BranchName'])
}
//添加部门
exports.addBranch = function (req, res, next) {
    var postData = req.body;
    var memberInfo = req.memberInfo;
    if(!memberInfo.CID||memberInfo.StaffRole!=1){
        return next(new ApplicationError.JsonResponse('不是管理员',Config.error_code.not_company_admin));
    }
    if(!postData.BranchName)
    {
        return next(new ApplicationError.JsonResponse('参数错误',Config.error_code.param_error));
    }
    var insertData = {
        CID:memberInfo.CID,
        BranchName:postData.BranchName,
        AddTime:Moment().format('YYYY-MM-DD HH:mm:ss')
    };
    DaoFactory.getCompanyBranchDao().insertData(insertData, function(i_err, packet) {
        if(i_err) return next(new ApplicationError.JsonResponse('插入数据失败',Config.error_code.system_error));
        insertData.BID = packet.insertId;
        res.send(insertData);
    })
}
//编辑部门
exports.editBranch = function (req, res, next) {
    var postData = req.body;
    var memberInfo = req.memberInfo;
    if(!memberInfo.CID||memberInfo.StaffRole!=1){
        return next(new ApplicationError.JsonResponse('不是管理员',Config.error_code.not_company_admin));
    }
    if(!postData.BranchName||!postData.BID)
    {
        return next(new ApplicationError.JsonResponse('参数错误',Config.error_code.param_error));
    }
    DaoFactory.getCompanyBranchDao().getData({CID:memberInfo.CID,BID:postData.BID},function (g_err, row) {
        if(g_err) return next(new ApplicationError.JsonResponse('查询数据失败',Config.error_code.system_error));
        if(!row) return next(new ApplicationError.JsonResponse('部门没有找到',Config.error_code.data_not_found));
        DaoFactory.getCompanyBranchDao().updateData({CID:memberInfo.CID,BID:postData.BID},{BranchName:postData.BranchName},function (u_err, packet) {
            if(u_err) return next(new ApplicationError.JsonResponse('更新数据失败',Config.error_code.system_error));
            row.BranchName = postData.BranchName;
            res.send(row);
        })
    })
}
//删除部门
exports.delBranch = function (req, res, next) {
    var postData = req.body;
    var memberInfo = req.memberInfo;
    if(!memberInfo.CID||memberInfo.StaffRole!=1){
        return next(new ApplicationError.JsonResponse('不是管理员',Config.error_code.not_company_admin));
    }
    if(!postData.BID)
    {
        return next(new ApplicationError.JsonResponse('参数错误',Config.error_code.param_error));
    }
    Async.parallel({
        record:function (done) {
            DaoFactory.getCompanyBranchDao().getData({CID:memberInfo.CID,BID:postData.BID},function (g_err, row) {
                if(g_err) return done(new ApplicationError.JsonResponse('查询数据失败',Config.error_code.system_error));
                if(!row) return done(new ApplicationError.JsonResponse('部门没有找到',Config.error_code.data_not_found));
                done(null,row);
            })
        },
        'count':function (done) {
            DaoFactory.getMemberDao().getCount({CID:memberInfo.CID,BID:postData.BID},function (c_err, num) {
                if(c_err)return done(new ApplicationError.JsonResponse('查询数据失败',Config.error_code.system_error));
                if(num>0)return done(new ApplicationError.JsonResponse('部门下面还存在用户',Config.error_code.branch_has_accounts));
                done(null,num);
            },'MID')

        }
    },function (err, result) {
        if(err) return next(err);
        DaoFactory.getCompanyBranchDao().deleteData({BID:postData.BID},function (d_err, packet) {
            if(d_err) return next(new ApplicationError.JsonResponse('删除部门数据失败',Config.error_code.system_error));
            res.send({});
        })
    })


}
//获取部门员工列表
exports.branchMemberList = function (req, res, next) {
    //获取部门员工列表
    var postData = req.body;
    var memberInfo = req.memberInfo;
    if(!memberInfo.CID||memberInfo.StaffRole!=1){
        return next(new ApplicationError.JsonResponse('不是管理员',Config.error_code.not_company_admin));
    }
    Async.parallel({
        branches:function (done) {
            DaoFactory.getCompanyBranchDao().getList({CID:memberInfo.CID},function (g_err, rows) {
                if(g_err) return done(new ApplicationError.JsonResponse('查询数据失败',Config.error_code.system_error));
                done(null,rows);

            })
        },
        members:function (done) {
            DaoFactory.getMemberDao().getList({CID:memberInfo.CID,'StaffRole<>0':true},function (g_err, rows) {
                if(g_err) return done(new ApplicationError.JsonResponse('查询数据失败',Config.error_code.system_error));
                done(null,rows);
            })
        }
    },function (err, results) {
        if(err) return next(err);
        var branch={}
        for(var i ;i<results.branches.length;i++)
        {
            results.branches[i]['Members']=[];
            results.branches[i]['Count'] =0;
            branch[results.branches[i]['BID']] =results.branches[i];
        }
        var noBranch=[];
        for(var j=0;j<results.members.length;j++)
        {
            var tem = results.members[j];
            if(branch[tem['BID']])
            {
                branch[tem['BID']]['Count'] = branch[tem['BID']]['Count']+1;
                branch[tem['BID']]['Members'].push(tem);
            }else {
                noBranch.push(tem);
            }
        }
        var branches =[];
        for(var bid in branch){
            branches.push(branch[bid]);
        }
        res.send({
            Branches:branches,
            NoBranchMember:noBranch
        });
    })


}
//删除员工
exports.delMember = function (req, res, next) {

}
exports.changeAdmin =function (req, res, next) {

}