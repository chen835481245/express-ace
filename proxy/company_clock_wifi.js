var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function CompanyClockWifi() {
    //Base.call(this);
    this.table = 'company_clock_wifi';
}
util.inherits(CompanyClockWifi, Base); //继承base原型方法
module.exports = CompanyClockWifi;