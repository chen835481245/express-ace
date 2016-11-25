var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function AuthCode() {
    //Base.call(this);
    this.table = 'auth_code';
}
util.inherits(AuthCode, Base); //继承base原型方法
module.exports = AuthCode;