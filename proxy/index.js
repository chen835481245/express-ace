var Base = require("../proxy/base");
var AddCompanyApply = require("../proxy/add_company_apply");
var AdminModule = require("../proxy/admin_module");
var AdminModulePermission = require("../proxy/admin_module_permission");
var AdminRolePermission = require("../proxy/admin_role_permission");
var AdminRoles = require("../proxy/admin_roles");
var AdminUser = require("../proxy/admin_user");
var AdminWorkDayException = require("../proxy/admin_work_day_exception");
var AuthCode = require("../proxy/auth_code");
var Company = require("../proxy/company");
var CompanyBranch = require("../proxy/company_branch");
var CompanyClockLocation = require("../proxy/company_clock_location");
var CompanyClockWifi = require("../proxy/company_clock_wifi");
var CompanyMemberAbsence = require("../proxy/company_member_absence");
var CompanyMemberClock = require("../proxy/company_member_clock");
var CompanyOutworkClock = require("../proxy/company_outwork_clock");
var CompanyWorkDay = require("../proxy/company_work_day");
var CompanyWorkDayException = require("../proxy/company_work_day_exception");
var MatchAction = require("../proxy/match_action");
var Member = require("../proxy/member");
var MemberFaces = require("../proxy/member_faces");
var Menus = require("../proxy/menus");
var MsgMatch = require("../proxy/msg_match");
var NewCompanyApply = require("../proxy/new_company_apply");
var _instances = {};
exports.getDao = function(table) {
    return new Base(table);
}
exports.getAddCompanyApplyDao = function(){
    if(typeof _instances['AddCompanyApply'] === 'undefined'){
        _instances['AddCompanyApply'] = new AddCompanyApply();
    }
    return  _instances['AddCompanyApply'];
}
exports.getAdminModuleDao = function(){
    if(typeof _instances['AdminModule'] === 'undefined'){
        _instances['AdminModule'] = new AdminModule();
    }
    return  _instances['AdminModule'];
}
exports.getAdminModulePermissionDao = function() {
    if (typeof _instances['AdminModulePermission'] === 'undefined') {
        _instances['AdminModulePermission'] = new AdminModulePermission();
    }
    return _instances['AdminModulePermission'];
}
exports.getAdminRolePermissionDao = function() {
    if (typeof _instances['AdminRolePermission'] === 'undefined') {
        _instances['AdminRolePermission'] = new AdminRolePermission();
    }
    return _instances['AdminRolePermission'];
}
exports.getAdminRolesDao = function() {
    if (typeof _instances['AdminRoles'] === 'undefined') {
        _instances['AdminRoles'] = new AdminRoles();
    }
    return _instances['AdminRoles'];
}
exports.getAdminUserDao = function() {
    if (typeof _instances['AdminUser'] === 'undefined') {
        _instances['AdminUser'] = new AdminUser();
    }
    return _instances['AdminUser'];
}
exports.getAdminWorkDayExceptionDao = function() {
    if (typeof _instances['AdminWorkDayException'] === 'undefined') {
        _instances['AdminWorkDayException'] = new AdminWorkDayException();
    }
    return _instances['AdminWorkDayException'];
}
exports.getAuthCodeDao = function() {
    if (typeof _instances['AuthCode'] === 'undefined') {
        _instances['AuthCode'] = new AuthCode();
    }
    return _instances['AuthCode'];
}
exports.getCompanyDao = function() {
    if (typeof _instances['Company'] === 'undefined') {
        _instances['Company'] = new Company();
    }
    return _instances['Company'];
}
exports.getCompanyBranchDao = function() {
    if (typeof _instances['CompanyBranch'] === 'undefined') {
        _instances['CompanyBranch'] = new CompanyBranch();
    }
    return _instances['CompanyBranch'];
}
exports.getCompanyClockLocationDao = function() {
    if (typeof _instances['CompanyClockLocation'] === 'undefined') {
        _instances['CompanyClockLocation'] = new CompanyClockLocation();
    }
    return _instances['CompanyClockLocation'];
}
exports.getCompanyClockWifiDao = function() {
    if (typeof _instances['CompanyClockWifi'] === 'undefined') {
        _instances['CompanyClockWifi'] = new CompanyClockWifi();
    }
    return _instances['CompanyClockWifi'];
}
exports.getCompanyMemberAbsenceDao = function() {
    if (typeof _instances['CompanyMemberAbsence'] === 'undefined') {
        _instances['CompanyMemberAbsence'] = new CompanyMemberAbsence();
    }
    return _instances['CompanyMemberAbsence'];
}
exports.getCompanyMemberClockDao = function() {
    if (typeof _instances['CompanyMemberClock'] === 'undefined') {
        _instances['CompanyMemberClock'] = new CompanyMemberClock();
    }
    return _instances['CompanyMemberClock'];
}
exports.getCompanyOutworkClockDao = function() {
    if (typeof _instances['CompanyOutworkClock'] === 'undefined') {
        _instances['CompanyOutworkClock'] = new CompanyOutworkClock();
    }
    return _instances['CompanyOutworkClock'];
}
exports.getCompanyWorkDayDao = function() {
    if (typeof _instances['CompanyWorkDay'] === 'undefined') {
        _instances['CompanyWorkDay'] = new CompanyWorkDay();
    }
    return _instances['CompanyWorkDay'];
}
exports.getCompanyWorkDayExceptionDao = function() {
    if (typeof _instances['CompanyWorkDayException'] === 'undefined') {
        _instances['CompanyWorkDayException'] = new CompanyWorkDayException();
    }
    return _instances['CompanyWorkDayException'];
}
exports.getMatchActionDao = function() {
    if (typeof _instances['MatchAction'] === 'undefined') {
        _instances['MatchAction'] = new MatchAction();
    }
    return _instances['MatchAction'];
}
exports.getMemberDao = function() {
    if (typeof _instances['Member'] === 'undefined') {
        _instances['Member'] = new Member();
    }
    return _instances['Member'];
}
exports.getMemberFacesDao = function() {
    if (typeof _instances['MemberFaces'] === 'undefined') {
        _instances['MemberFaces'] = new MemberFaces();
    }
    return _instances['MemberFaces'];
}
exports.getMenusDao = function() {
    if (typeof _instances['Menus'] === 'undefined') {
        _instances['Menus'] = new Menus();
    }
    return _instances['Menus'];
}
exports.getMsgMatchDao = function() {
    if (typeof _instances['MsgMatch'] === 'undefined') {
        _instances['MsgMatch'] = new MsgMatch();
    }
    return _instances['MsgMatch'];
}
exports.getNewCompanyApplyDao = function() {
    if (typeof _instances['NewCompanyApply'] === 'undefined') {
        _instances['NewCompanyApply'] = new NewCompanyApply();
    }
    return _instances['NewCompanyApply'];
}