var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function MsgMatch() {
    //Base.call(this);
    this.table = 'msg_match';
}
util.inherits(MsgMatch, Base); //继承base原型方法
module.exports = MsgMatch;