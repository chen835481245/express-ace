var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function AdminRolePermission() {
    //Base.call(this);
    this.table = 'admin_role_permission';
}
util.inherits(AdminRolePermission, Base); //继承base原型方法
module.exports = AdminRolePermission;