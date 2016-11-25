var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function CompanyWorkDay() {
    //Base.call(this);
    this.table = 'company_work_day';
}
util.inherits(CompanyWorkDay, Base); //继承base原型方法
module.exports = CompanyWorkDay;