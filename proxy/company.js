var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function Company() {
    //Base.call(this);
    this.table = 'company';
}
util.inherits(Company, Base); //继承base原型方法
module.exports = Company;