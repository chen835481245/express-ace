var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function AdminWorkDayException() {
    //Base.call(this);
    this.table = 'admin_work_day_exception';
}
util.inherits(AdminWorkDayException, Base); //继承base原型方法
module.exports = AdminWorkDayException;