var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function MatchAction() {
    //Base.call(this);
    this.table = 'match_action';
}
util.inherits(MatchAction, Base); //继承base原型方法
module.exports = MatchAction;