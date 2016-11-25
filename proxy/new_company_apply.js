var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function NewCompanyApply() {
    //Base.call(this);
    this.table = 'new_company_apply';
}
util.inherits(NewCompanyApply, Base); //继承base原型方法
module.exports = NewCompanyApply;