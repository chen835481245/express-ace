var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function AddCompanyApply() {
    //Base.call(this);
    this.table = 'add_company_apply';
}
util.inherits(AddCompanyApply, Base); //继承base原型方法
module.exports = AddCompanyApply;