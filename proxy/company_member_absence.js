var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function CompanyMemberAbsence() {
    //Base.call(this);
    this.table = 'company_member_absence';
}
util.inherits(CompanyMemberAbsence, Base); //继承base原型方法
module.exports = CompanyMemberAbsence;