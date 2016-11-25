var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function Member() {
    //Base.call(this);
    this.table = 'member';
}
util.inherits(Member, Base); //继承base原型方法
module.exports = Member;