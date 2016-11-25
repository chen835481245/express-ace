var DaoFactory = require('../proxy');
var Config = require('../config/config')
var ApplicationError = require('../lib/application_error');
var FacevisaServer =  require('../servers/facevisa');
var Moment = require('moment');
var CommonFun = require('../lib/common');
var FileManager = require('../lib/file_manage');
var Logger = require('../lib/logger');
var Fs = require('fs');
/**
 * 获取某个用户的信
 * @param where
 * @param callback
 */
exports.getMemberWithFacesInfo = function (where, callback) {
    DaoFactory.getMemberDao().getData(where,function (g_m_err, row) {
        if(g_m_err) return callback(new ApplicationError.CodeResponse('获取用户信息失败',Config.error_code.system_error));
        if(!row) return callback(null,row);
        DaoFactory.getMemberFacesDao().getList({MID:row['MID']},function (g_f_err,rows) {
            if(g_f_err) return callback(new ApplicationError.CodeResponse('获取用户人脸记录失败',Config.error_code.system_error));
            row['Faces'] =rows;
            callback(null,row);
        })
    })
}
//登陆
exports.faceLogin = function (personID, imgBuff, callback) {
    FacevisaServer.personMatch(personID, imgBuff,function (m_err, result) {
        if(m_err) return callback(m_err);
        callback(null,result);
    })
}
//发送短信验证码
exports.sendAuthCode = function (phone, message, code, type, callback) {
    
    
}
//校验短信验证码
exports.verifyAuthCode = function (phone, code, type, callback) {
    DaoFactory.getAuthCodeDao().getData({Phone:phone,Code:code,Type:type},function (err, row) {
        if(err) return callback(new ApplicationError.CodeResponse('获取验证码记录失败',Config.error_code.system_error));
        if(!row) return callback(new ApplicationError.CodeResponse('验证码无效',Config.error_code.auth_code_invalid));
        //console.log(row['AddTime'],Moment().subtract(300,'seconds').format('YYYY-MM-DD HH:mm:ss'));
        if(row['AddTime']<Moment().subtract(300,'seconds').format('YYYY-MM-DD HH:mm:ss'))
        {
            return callback(new ApplicationError.CodeResponse('验证码已经过期',Config.error_code.auth_code_expired));
        }
        callback(null);
    },['*'],'ID desc')
}
exports.register = function (phone, imgBuff, uuid, callback) {
    var now = Moment();
    DaoFactory.getMemberDao().getData({Phone:phone},function (err, row) {
        if(err) return callback(new ApplicationError.CodeResponse('获取用户信息失败',Config.error_code.system_error));
        if(row) return callback(new ApplicationError.CodeResponse('用户已经存在',Config.error_code.account_exist));
        FacevisaServer.addPerson(0,function (a_p_err, retPerson) {
            if(a_p_err) return callback(a_p_err);
            var personID = retPerson.personid;

            var memberInfo = {
                PersonID:personID,
                Token:CommonFun.generateToken(personID,20),
                StaffRole:Config.staff_status.member,
                RegTime:now.format('YYYY-MM-DD HH:mm:ss'),
                LastLoginTime:now.format('YYYY-MM-DD HH:mm:ss'),
                Phone:phone,
                Status:1,
                UUID:uuid,
            }
            DaoFactory.getMemberDao().insertData(memberInfo,function (i_err,packet) {
                if(i_err) return callback(new ApplicationError.CodeResponse('插入用户数据失败',Config.error_code.system_error));
                memberInfo['MID'] =packet.insertId;
                console.log(memberInfo);
                memberInfo['Faces'] = []
                addFace(memberInfo['MID'],personID,imgBuff,function (i_f_err,faceItem) {
                    if(i_f_err) Logger.log('error',i_f_err.message,i_f_err.error_code);
                    if(faceItem)memberInfo.Faces.push(faceItem);
                    callback(null,memberInfo);
                })
            })
        })
    })
}
//添加更多的照片 校验
exports.addMoreFace = function (personID, imgBuff, callback) {

}
//添加用户的人脸 不校验之前的照片
function addFace(MID,personID, imgBuff, callback) {
    FacevisaServer.addFace(personID,imgBuff,function (a_f_err,retFace) {
        if(a_f_err) return callback(a_f_err);
        var faceid = retFace['faceid'];
        var now = Moment();
        var tempPath = '/member/'+parseInt(MID/500000)+'/'+parseInt(MID%500)+'/'+MID+'/';
        var dbPath = tempPath+now.format('x')+''+CommonFun.rd(1000,999)+'.jpg';
        var faceItem ={
            FaceID:faceid,
            MID:MID,
            ImagePath:dbPath,
            AddTime:now.format('YYYY-MM-DD HH:mm:ss')
        }
        FileManager.mkPath(Config.states_path+tempPath,function (m_err) {
            if(m_err) return Logger.log('error',m_err);
            Fs.writeFile(Config.states_path+dbPath,imgBuff, function (s_err) {
                if(s_err) Logger.log('error','存储照片失败',m_err);
            })

        })
        DaoFactory.getMemberFacesDao().insertData(faceItem,function (i_f_err) {
            if(i_f_err) return callback(new ApplicationError.CodeResponse('插入数据库失败',Config.error_code.system_error));
            callback(null,faceItem);

        })
    })
}
exports.addFace = addFace;