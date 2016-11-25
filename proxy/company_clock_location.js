var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function CompanyClockLocation() {
    //Base.call(this);
    this.table = 'company_clock_location';
}
util.inherits(CompanyClockLocation, Base); //继承base原型方法
module.exports = CompanyClockLocation;