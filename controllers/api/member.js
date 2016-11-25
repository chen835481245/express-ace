var ApplicationError = require('../../lib/application_error');
var Config = require('../../config/config');
var DaoFactory = require('../../proxy');
var CommonFun = require('../../lib/common');
var MemberMod = require('../../model/member_mod');
var Moment  = require('moment');

//校验登录
exports.checkLogin = function (req, res, next) {
    var postData = req.body;
    var phone = postData.Phone;
    var imgBuff= new Buffer(postData.Image,'Base64');//活体照片数据
    var uuid = postData.UUID;
    //处理流程 通过手机号码查询用户是否存在
    //如果不存在就返回走注册流程
    MemberMod.getMemberWithFacesInfo({Phone:phone},function (g_m_err, memberInfo) {
        if(g_m_err) return next(new ApplicationError.JsonResponse(g_m_err.message,g_m_err.error_code));
        if(!memberInfo) return res.send({Step:1});
        if(memberInfo['Faces'].length<1) return res.send({Step:5});
        MemberMod.faceLogin(memberInfo.PersonID,imgBuff,function (l_err, result) {
            if(l_err) return next(new ApplicationError.JsonResponse(l_err.message,l_err.error_code));
            if(result.result !=3 && memberInfo.UUID ==uuid) return res.send({Step:4});
            if(result.result !=3 && memberInfo.UUID !=uuid) return res.send({Step:5});
            if(result.result ==3 && memberInfo.UUID !=uuid) return res.send({Step:3});
            var token = CommonFun.generateToken(memberInfo.PersonID);
            DaoFactory.getMemberDao().updateData(
                {MID:memberInfo.MID},
                {UUID:uuid,LastLoginTime:Moment().format('YYYY-MM-DD HH:mm:ss'),'LoginCnt =LoginCnt+1':true,Token:token},
                function (u_err) {
                    if(u_err) return next(new ApplicationError.JsonResponse('更新用户信息出错',Config.error_code.system_error));
                    var retVal = {
                        Step:2,
                        Token:token,
                        Info:{
                            Name:memberInfo.Name||'',
                            Phone:memberInfo.Phone,
                            Status:memberInfo.Status,
                            CID:memberInfo.CID,
                            BID:memberInfo.BID,
                            Avatar:memberInfo.Avatar||'',
                            StaffRole:memberInfo.StaffRole||0,
                        }
                    };
                    res.send(retVal);
                }
            )
        })
    });

    //存在的情况下 调用人脸搜索接口搜索人员信息查看是否匹配
    //查看上次登录的机器码是否和这次的相同
    //返回人员信息和登录token
};
//发送验证码接口
exports.authCode = function (req, res, next) {
    var postData = req.body;
    var phone = postData.Phone;
    var type = postData.Type;//login
    var code = CommonFun.rd(100000,999999);
    var message= code+' (考勤APP手机验证码,请完成验证),如非本人操作,请忽略本短信。';
    MemberMod.sendAuthCode(phone,message,code,type,function (err) {
        if(err) return next(new ApplicationError.JsonResponse(err.message,err.error_code));
        res.send({});
    })
};
//验证短信验证码添加照片注册
exports.codeRegister = function (req, res, next) {
    var postData = req.body;
    var phone = postData.Phone;
    var authCode = postData.AuthCode;
    var uuid = postData.UUID;
    var imgBuff= new Buffer(postData.Image,'Base64');//活体照片数据
    MemberMod.verifyAuthCode(phone,authCode,'login',function (err) {
        if(err) return next(new ApplicationError.JsonResponse(err.message,err.error_code));
        MemberMod.register(phone,imgBuff,uuid,function (r_err, memberInfo) {
            if(r_err) return next(new ApplicationError.JsonResponse(r_err.message,r_err.error_code));
            var retVal = {
                Token:memberInfo.Token,
                Info:{
                    Name:memberInfo.Name||'',
                    Phone:memberInfo.Phone,
                    Status:memberInfo.Status||1,
                    CID:memberInfo.CID||0,
                    BID:memberInfo.BID||0,
                    Avatar:memberInfo.Avatar||'',
                    StaffRole:memberInfo.StaffRole||0,
                }
            };
            res.send(retVal);

        })
    })
};
//验证短信验证码添加照片登录接口
exports.codeAddFaceLogin = function (req, res, next) {
    var postData = req.body;
    var phone = postData.Phone;
    var type = postData.Type;//login
    var authCode = postData.AuthCode;
    var uuid = postData.UUID;
    var imgBuff= new Buffer(postData.Image,'Base64');//活体照片数据
    MemberMod.verifyAuthCode(phone,authCode,'login',function (err) {
        if(err) return next(new ApplicationError.JsonResponse(err.message,err.error_code));

    })

};
//验证短信验证码登录接口
exports.codeLogin = function (req, res, next) {

};

//邀请码后加入公司接口
exports.registerAddCompany = function (req, res, next) {

};
//用户获取自己的信息
exports.myInfo = function (req, res, next) {

};
//编辑自己信息
exports.editMyInfo = function (req, res, next) {

};
//获取员工的信息
exports.memberInfo = function (req, res, next) {

};
//编辑员工信息
exports.editMemberInfo = function (req, res, next) {

};