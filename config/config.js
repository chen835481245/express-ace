var path = require('path');
var config = {
    port: 5000,
    env:'development',//product
    name:'Node版后台',
    host:'http://192.168.10.223:3000',
    sign_secret:'8d59683d7b8bf168bc3137118ceb852b1cdd6f68',//签名密钥
    facevisa:{
        apis:{
            addPerson:'https://open.facevisa.com/v2/person/new',
            addFace:'https://open.facevisa.com/v2/person/add_face',
            delFace:'https://open.facevisa.com/v2/person/del_face',
            clearFace:'https://open.facevisa.com/v2/person/clear_face',
            personMatch:'https://open.facevisa.com/v2/person/match',
            addGroup:'https://open.facevisa.com/v2/group/new',
            delGroup:'https://open.facevisa.com/v2/group/delete',
            personAddGroup:'https://open.facevisa.com/v2/group/add_person',
            personLeaveGroup:'https://open.facevisa.com/v2/group/del_person',
            ocr:'https://open.facevisa.com/v2/base/ocr',
            idAuthWithImg:'https://open.facevisa.com/v2/base/id_auth_with_img',
            crossMatch:'https://open.facevisa.com/v2/base/cross_match'
        },
        app_id:'53343455',
        app_secret:'96681926c7bceb488d0a1198781854db14a836fb'
    },
    aes_key:'8ae222dde641b681b4fc51ed129f9cb2',
    mysql: {
        connectionLimit: 10,
        host:'114.55.101.177',
        user: 'root',
        dateStrings: true,//解决日期格式化问题
        password: 'cdc!@#$%^xlj',
        database: 'express_kq',
    },
    apple_api:{
        buy:'https://buy.itunes.apple.com/verifyReceipt',
        sandbox:'https://sandbox.itunes.apple.com/verifyReceipt'
    },
    os: {
        ios: true,
        android: true
    },
    error_code: {
        system_error: 500,
        param_error: 100,
        token_invalid: 101,
        timestamp_error: 102,
        param_sign_error: 103,
        check_sign_error: 104,
        param_token_error: 105,
        account_exist: 106,
        ocr_fail: 110,
        record_not_found : 107,
        apple_verify_error: 109,
        auth_code_invalid: 110,//验证码无效
        auth_code_expired: 111,//验证码已经过期
        data_not_found:121 ,
        param_image_error: 201,
        account_pass_error: 200,
    },
    logger: {
        warn_path :path.join(__dirname,'../logs/warn_error.log'),
        info_path :path.join(__dirname,'../logs/info.log'),
        error_path :path.join(__dirname,'../logs/error.log'),
    },
    staff_status:{
        admin:1,
        staff:2,
        apply_staff:3,
        member:0
    },
    states_path:path.join(__dirname, '../public'),//静态文件存储地址
    favicon_path:path.join(__dirname, '../public/images', 'fs.ico'),//favicon文件地址

}
if(config.env === 'development') {//如果是开发模式
    config.mysql= {
        connectionLimit: 10,
        host:'114.55.101.177',
        user: 'root',
        dateStrings: true,//解决日期格式化问题
        password: 'cdc!@#$%^xlj',
        database: 'express_kq',
    };
}
module.exports = config;

