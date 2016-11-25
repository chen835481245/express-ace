var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function AdminModule() {
    //Base.call(this);
    this.table = 'admin_module';
}
util.inherits(AdminModule, Base); //继承base原型方法
module.exports = AdminModule;