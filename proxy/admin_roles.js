var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function AdminRoles() {
    //Base.call(this);
    this.table = 'admin_roles';
}
util.inherits(AdminRoles, Base); //继承base原型方法
module.exports = AdminRoles;