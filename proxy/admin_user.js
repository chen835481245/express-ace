var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function AdminUser() {
    //Base.call(this);
    this.table = 'admin_user';
}
util.inherits(AdminUser, Base); //继承base原型方法
module.exports = AdminUser;