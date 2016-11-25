var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function MemberFaces() {
    //Base.call(this);
    this.table = 'member_faces';
}
util.inherits(MemberFaces, Base); //继承base原型方法
module.exports = MemberFaces;