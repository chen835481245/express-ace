var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function CompanyOutworkClock() {
    //Base.call(this);
    this.table = 'company_outwork_clock';
}
util.inherits(CompanyOutworkClock, Base); //继承base原型方法
module.exports = CompanyOutworkClock;