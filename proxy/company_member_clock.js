var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function CompanyMemberClock() {
    //Base.call(this);
    this.table = 'company_member_clock';
}
util.inherits(CompanyMemberClock, Base); //继承base原型方法
module.exports = CompanyMemberClock;