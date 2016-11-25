var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function AdminModulePermission() {
    //Base.call(this);
    this.table = 'admin_module_permission';
}
util.inherits(AdminModulePermission, Base); //继承base原型方法
module.exports = AdminModulePermission;