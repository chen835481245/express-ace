var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function CompanyBranch() {
    //Base.call(this);
    this.table = 'company_branch';
}
util.inherits(CompanyBranch, Base); //继承base原型方法
module.exports = CompanyBranch;