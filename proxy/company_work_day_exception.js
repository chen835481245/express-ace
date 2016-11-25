var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function CompanyWorkDayException() {
    //Base.call(this);
    this.table = 'company_work_day_exception';
}
util.inherits(CompanyWorkDayException, Base); //继承base原型方法
module.exports = CompanyWorkDayException;