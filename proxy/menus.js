var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function Menus() {
    //Base.call(this);
    this.table = 'menus';
}
util.inherits(Menus, Base); //继承base原型方法
module.exports = Menus;