var multer  = require('multer');
//app.use(multer().any());//使用这个不错
var siteContr = require('../controllers').siteController;
var authContr = require('../controllers').authController;
var apiMemberContr = require('../controllers').apiMemberController;
var apiCompanyContr = require('../controllers').apiCompanyController;
var apiClockContr = require('../controllers').apiClockController;
var apiAuthContr   = require('../controllers').apiAuthController;
var kqContr = require('../controllers').kqController;
var adminContr   = require('../controllers').adminController;
var upload = multer({ dest: 'uploads/' });
var modelBase = require('../model/base');
var session = require('express-session');


module.exports  = function(app) {
    app.post('/api/m/check_login',apiAuthContr.authApiSign,apiMemberContr.checkLogin);//登录校验接口
    app.post('/api/m/auth_code',apiAuthContr.authApiSign,apiMemberContr.authCode);//发送短信验证码接口
    app.post('/api/m/code_reg',apiAuthContr.authApiSign,apiMemberContr.codeRegister);//验证短信验证码添加照片注册 登录
    app.post('/api/m/code_face_login',apiAuthContr.authApiSign,apiMemberContr.codeAddFaceLogin);//验证短信验证码添加照片登录接口
    app.post('/api/m/code_login',apiAuthContr.authApiSign,apiMemberContr.codeLogin);//验证短信验证码登录接口
    app.post('/api/m/reg_add_c',apiAuthContr.authApiSignToken,apiMemberContr.registerAddCompany);//邀请码后加入公司接口
    app.post('/api/m/my_info',apiAuthContr.authApiSignToken,apiMemberContr.myInfo);//用户获取自己的信息
    app.post('/api/m/e_my_info',apiAuthContr.authApiSignToken,apiMemberContr.editMyInfo);//编辑自己信息
    app.post('/api/m/member_info',apiAuthContr.authApiSignToken,apiMemberContr.memberInfo);//获取员工的信息
    app.post('/api/m/e_member_info',apiAuthContr.authApiSignToken,apiMemberContr.editMemberInfo);//编辑员工信息
    app.post('/api/c/invite_code',apiAuthContr.authApiSignToken,apiCompanyContr.invitationCode);//通过邀请码获取公司信息
    app.post('/api/c/new_c',apiAuthContr.authApiSignToken,apiCompanyContr.newCompany);//申请开通公司
    app.post('/api/c/e_new_c',apiAuthContr.authApiSignToken,apiCompanyContr.editNewCompany);//重新上传开通公司
    app.post('/api/c/new_absence',apiAuthContr.authApiSignToken,apiCompanyContr.newAbsence);//添加请假申请
    app.post('/api/c/clock_set',apiAuthContr.authApiSignToken,apiCompanyContr.clockSet);//获取考勤设置
    app.post('/api/c/a_wifi',apiAuthContr.authApiSignToken,apiCompanyContr.addWifi);//添加考勤wifi
    app.post('/api/c/del_wifi',apiAuthContr.authApiSignToken,apiCompanyContr.delWifi);//删除考勤wifi
    app.post('/api/c/a_location',apiAuthContr.authApiSignToken,apiCompanyContr.addLocation);//添加考勤位置
    app.post('/api/c/del_location',apiAuthContr.authApiSignToken,apiCompanyContr.delLocation);//删除考勤位置
    app.post('/api/c/e_work_clock',apiAuthContr.authApiSignToken,apiCompanyContr.editWorkClock);//编辑考勤时间
    app.post('/api/c/clock_exc_list',apiAuthContr.authApiSignToken,apiCompanyContr.clockExceptionList);//考勤例外列表
    app.post('/api/c/a_clock_exc',apiAuthContr.authApiSignToken,apiCompanyContr.addClockException);//添加考勤例外
    app.post('/api/c/e_clock_exc',apiAuthContr.authApiSignToken,apiCompanyContr.editClockException);//添加考勤例外
    app.post('/api/c/del_clock_exc',apiAuthContr.authApiSignToken,apiCompanyContr.delClockException);//删除考勤例外
    app.post('/api/c/branch_list',apiAuthContr.authApiSignToken,apiCompanyContr.branchList);//部门列表
    app.post('/api/c/branch_members',apiAuthContr.authApiSignToken,apiCompanyContr.branchMemberList);//部门列表
    app.post('/api/c/a_branch',apiAuthContr.authApiSignToken,apiCompanyContr.addBranch);//添加部门
    app.post('/api/c/e_branch',apiAuthContr.authApiSignToken,apiCompanyContr.editBranch);//编辑部门
    app.post('/api/c/del_branch',apiAuthContr.authApiSignToken,apiCompanyContr.delBranch);//删除部门
    app.post('/api/c/del_member',apiAuthContr.authApiSignToken,apiCompanyContr.delMember);//删除员工
    app.post('/api/c/change_admin',apiAuthContr.authApiSignToken,apiCompanyContr.changeAdmin);//移交管理员
    app.post('/api/k/today_info',apiAuthContr.authApiSignToken,apiClockContr.todayInfo);//获取今天的打卡记录信息
    app.post('/api/k/first_clock',apiAuthContr.authApiSignToken,apiClockContr.firstClock);//第一次打卡操作
    app.post('/api/k/last_clock',apiAuthContr.authApiSignToken,apiClockContr.lastClock);//下班打卡操作
    app.post('/api/k/o_clock_start',apiAuthContr.authApiSignToken,apiClockContr.outworkClockStart);//外勤打卡开始
    app.post('/api/k/o_clock_end',apiAuthContr.authApiSignToken,apiClockContr.outworkClockEnd);//外勤打卡介绍
    app.post('/api/k/o_clock_location',apiAuthContr.authApiSignToken,apiClockContr.outworkClockLocation);//外勤打卡上报位置
    app.post('/api/k/c_one_day_info',apiAuthContr.authApiSignToken,apiClockContr.companyOneDayClockInfo);//公司的一天信息统计
    app.post('/api/k/member_clock_s',apiAuthContr.authApiSignToken,apiClockContr.memberClockStatistics);//员工一段时间的考勤统计
    app.post('/api/k/export_clock_s',apiAuthContr.authApiSignToken,apiClockContr.exportClockStatistics);//导出考勤统计信息

    app.use(function(req,res,next){
        var url = req.originalUrl;
        if(url != "/admin/auth/login" && !req.session.username){
            return res.redirect("/admin/auth/login");
        }
        next();
    });

    app.all('/admin/*', function (req, res, next) {
        var menuid=0;
        if(req.query.menuid){
            menuid=req.query.menuid;
            req.session.menuid=menuid;
        }
        if(menuid==0&&req.session.menuid){
            menuid=req.session.menuid;
        }
        modelBase.getMenus(menuid, function (err, menus) {
            if (err) return done(err, null);
            req.menu = menus;
            next();//把权限转移到下一个路由
        });
    });
    app.all('/admin/auth/login', authContr.login);
    app.all('/admin/auth/loginout', authContr.loginOut);
    app.all('/admin/admin/home', adminContr.home);
    app.all('/admin/admin/user', adminContr.user);
    app.all('/admin/admin/adminUserData', adminContr.adminUserData);
    app.all('/admin/admin/doAdminUser', adminContr.doAdminUser);
    app.all('/admin/admin/company', adminContr.company);
    app.all('/admin/admin/companyDel', adminContr.companyDel);
    app.all('/admin/admin/companyView', adminContr.companyView);
    app.all('/admin/admin/companyUpdate', adminContr.companyUpdate);
    app.all('/admin/admin/holiday', adminContr.holiday);
    app.all('/admin/admin/doHoliday', adminContr.doHoliday);
    app.all('/admin/admin/holidayData', adminContr.holidayData);
    app.all('/admin/kq/member', kqContr.member);
    app.all('/admin/kq/memberData', kqContr.memberData);
    app.all('/admin/kq/records', kqContr.records);
    app.all('/admin/kq/recordsData', kqContr.recordsData);


};
