/*
Navicat MySQL Data Transfer

Source Server         : 人脸测试数据库
Source Server Version : 50620
Source Host           : 114.55.101.177:3306
Source Database       : express_kq

Target Server Type    : MYSQL
Target Server Version : 50620
File Encoding         : 65001

Date: 2016-11-25 15:19:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for add_company_apply
-- ----------------------------
DROP TABLE IF EXISTS `add_company_apply`;
CREATE TABLE `add_company_apply` (
  `MID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `CID` int(11) DEFAULT NULL,
  `ApplyTime` datetime DEFAULT NULL,
  `Status` tinyint(1) DEFAULT '1' COMMENT '1申请中2申请失败',
  PRIMARY KEY (`MID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of add_company_apply
-- ----------------------------

-- ----------------------------
-- Table structure for admin_module
-- ----------------------------
DROP TABLE IF EXISTS `admin_module`;
CREATE TABLE `admin_module` (
  `ModuleID` int(11) NOT NULL,
  `ParentID` int(11) NOT NULL,
  `Title` varchar(20) DEFAULT NULL,
  `Link` varchar(255) DEFAULT NULL,
  `Icon` varchar(30) DEFAULT 'fa fa-circle-o',
  `OrderNo` int(11) DEFAULT '0',
  `IsMenu` tinyint(1) NOT NULL DEFAULT '1',
  `Description` varchar(255) DEFAULT NULL,
  `Nullity` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0启用1禁用',
  PRIMARY KEY (`ModuleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_module
-- ----------------------------
INSERT INTO `admin_module` VALUES ('1', '0', '后台管理', '#', 'icon-desktop', '1', '1', null, '0');
INSERT INTO `admin_module` VALUES ('3', '0', '考勤管理', '#', 'icon-edit', '20', '1', null, '0');
INSERT INTO `admin_module` VALUES ('10', '1', '公司列表', '/admin/admin/company', 'fa fa-circle-o', '0', '1', null, '0');
INSERT INTO `admin_module` VALUES ('11', '1', '管理员列表', '/admin/admin/user', 'fa fa-circle-o', '5', '1', null, '0');
INSERT INTO `admin_module` VALUES ('12', '1', '节假日管理', '/admin/admin/holiday', 'fa fa-circle-o', '10', '1', null, '0');
INSERT INTO `admin_module` VALUES ('31', '3', '人员列表', '/admin/kq/member', 'fa fa-circle-o', '0', '1', null, '0');

-- ----------------------------
-- Table structure for admin_module_permission
-- ----------------------------
DROP TABLE IF EXISTS `admin_module_permission`;
CREATE TABLE `admin_module_permission` (
  `ModuleID` int(11) NOT NULL,
  `PermissionValue` bigint(20) NOT NULL,
  `PermissionTitle` varchar(128) NOT NULL,
  `ParentID` int(11) NOT NULL,
  `Nullity` tinyint(1) DEFAULT '1' COMMENT '1启用',
  PRIMARY KEY (`ModuleID`,`PermissionValue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_module_permission
-- ----------------------------
INSERT INTO `admin_module_permission` VALUES ('101', '1', '查看', '1', '1');
INSERT INTO `admin_module_permission` VALUES ('101', '4', '编辑', '1', '1');
INSERT INTO `admin_module_permission` VALUES ('102', '1', '查看', '1', '1');
INSERT INTO `admin_module_permission` VALUES ('103', '1', '查看', '1', '1');
INSERT INTO `admin_module_permission` VALUES ('104', '1', '查看', '1', '1');
INSERT INTO `admin_module_permission` VALUES ('105', '1', '查看', '1', '1');
INSERT INTO `admin_module_permission` VALUES ('105', '2', '添加', '1', '1');
INSERT INTO `admin_module_permission` VALUES ('105', '4', '编辑', '1', '1');
INSERT INTO `admin_module_permission` VALUES ('105', '8', '删除', '1', '1');
INSERT INTO `admin_module_permission` VALUES ('106', '1', '查看', '1', '1');
INSERT INTO `admin_module_permission` VALUES ('901', '1', '查看', '9', '1');
INSERT INTO `admin_module_permission` VALUES ('901', '2', '添加', '9', '1');
INSERT INTO `admin_module_permission` VALUES ('901', '4', '编辑', '9', '1');
INSERT INTO `admin_module_permission` VALUES ('901', '8', '删除', '9', '1');
INSERT INTO `admin_module_permission` VALUES ('902', '1', '查看', '9', '1');
INSERT INTO `admin_module_permission` VALUES ('902', '2', '添加', '9', '1');
INSERT INTO `admin_module_permission` VALUES ('902', '4', '编辑', '9', '1');
INSERT INTO `admin_module_permission` VALUES ('902', '8', '删除', '9', '1');

-- ----------------------------
-- Table structure for admin_role_permission
-- ----------------------------
DROP TABLE IF EXISTS `admin_role_permission`;
CREATE TABLE `admin_role_permission` (
  `RoleID` int(11) NOT NULL,
  `ModuleID` int(11) NOT NULL,
  `OperationPermission` bigint(20) NOT NULL,
  PRIMARY KEY (`RoleID`,`ModuleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_role_permission
-- ----------------------------
INSERT INTO `admin_role_permission` VALUES ('2', '101', '5');
INSERT INTO `admin_role_permission` VALUES ('2', '102', '1');
INSERT INTO `admin_role_permission` VALUES ('2', '103', '1');
INSERT INTO `admin_role_permission` VALUES ('2', '901', '15');
INSERT INTO `admin_role_permission` VALUES ('2', '902', '15');

-- ----------------------------
-- Table structure for admin_roles
-- ----------------------------
DROP TABLE IF EXISTS `admin_roles`;
CREATE TABLE `admin_roles` (
  `RoleID` int(11) NOT NULL AUTO_INCREMENT,
  `RoleName` varchar(50) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`RoleID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_roles
-- ----------------------------
INSERT INTO `admin_roles` VALUES ('1', '超级管理员', '');
INSERT INTO `admin_roles` VALUES ('2', 'eee', '');

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `AdminID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) NOT NULL,
  `Password` varchar(32) NOT NULL,
  `RoleID` int(11) NOT NULL DEFAULT '0',
  `Createtime` datetime DEFAULT NULL,
  `CreateIP` varchar(15) DEFAULT NULL,
  `LastLoginTime` datetime DEFAULT NULL,
  `Status` tinyint(1) DEFAULT '1',
  `LastLoginIP` varchar(15) DEFAULT NULL,
  `LoginCnt` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`AdminID`),
  UNIQUE KEY `idx_1` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
INSERT INTO `admin_user` VALUES ('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '1', '2016-10-08 14:33:37', '', '2016-10-08 14:33:37', '1', '127.0.0.1', '91');
INSERT INTO `admin_user` VALUES ('2', 'admin1', 'e10adc3949ba59abbe56e057f20f883e', '1', '2016-10-08 14:33:37', '', '2016-10-08 14:33:37', '1', '127.0.0.1', '91');
INSERT INTO `admin_user` VALUES ('3', 'admin2', 'e10adc3949ba59abbe56e057f20f883e', '1', '2016-10-08 14:33:37', '', '2016-10-08 14:33:37', '1', '127.0.0.1', '91');
INSERT INTO `admin_user` VALUES ('8', 'test', 'd41d8cd98f00b204e9800998ecf8427e', '1', '2016-11-24 10:46:29', '127.0.0.1', '2016-11-24 10:46:29', '1', '127.0.0.1', '0');

-- ----------------------------
-- Table structure for admin_work_day_exception
-- ----------------------------
DROP TABLE IF EXISTS `admin_work_day_exception`;
CREATE TABLE `admin_work_day_exception` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `WorkDate` date DEFAULT NULL COMMENT '日期',
  `Type` tinyint(1) DEFAULT '1' COMMENT '1休息2上班',
  `Reason` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `wd` (`WorkDate`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_work_day_exception
-- ----------------------------
INSERT INTO `admin_work_day_exception` VALUES ('19', '2016-10-01', '1', '国庆');
INSERT INTO `admin_work_day_exception` VALUES ('20', '2016-10-02', '1', '国庆');
INSERT INTO `admin_work_day_exception` VALUES ('21', '2016-10-03', '1', '国庆');
INSERT INTO `admin_work_day_exception` VALUES ('22', '2016-10-04', '1', '国庆');
INSERT INTO `admin_work_day_exception` VALUES ('23', '2016-10-05', '1', '国庆');

-- ----------------------------
-- Table structure for auth_code
-- ----------------------------
DROP TABLE IF EXISTS `auth_code`;
CREATE TABLE `auth_code` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Code` varchar(6) DEFAULT NULL,
  `AddTime` datetime DEFAULT NULL,
  `Type` varchar(10) DEFAULT 'login' COMMENT 'login注册登录',
  `Phone` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of auth_code
-- ----------------------------
INSERT INTO `auth_code` VALUES ('1', '123456', '2016-11-18 17:30:00', 'login', '15158132014');

-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
  `CID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `CompanyName` varchar(50) NOT NULL DEFAULT '',
  `Address` varchar(255) DEFAULT NULL,
  `MID` int(11) DEFAULT NULL COMMENT '创建用户ID',
  `AddID` int(11) DEFAULT NULL COMMENT '用于员工加入公司的id',
  `LicenseImage` varchar(100) DEFAULT NULL COMMENT '营业许可证等',
  `Status` tinyint(2) NOT NULL DEFAULT '2' COMMENT '1审核通过  2待审核 3审核不通过',
  `Remark` varchar(100) DEFAULT '' COMMENT '公司申请备注',
  `Comment` varchar(60) DEFAULT '' COMMENT '后台管理员说明',
  PRIMARY KEY (`CID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of company
-- ----------------------------
INSERT INTO `company` VALUES ('1', '测试公司121', '地址21', '1', '2131321', '/upload/11.png', '1', '1', '1');

-- ----------------------------
-- Table structure for company_branch
-- ----------------------------
DROP TABLE IF EXISTS `company_branch`;
CREATE TABLE `company_branch` (
  `BID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `CID` int(11) DEFAULT NULL,
  `BranchName` varchar(25) DEFAULT NULL,
  `AddTime` datetime DEFAULT NULL,
  PRIMARY KEY (`BID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of company_branch
-- ----------------------------
INSERT INTO `company_branch` VALUES ('1', '1', '开发部', '2016-11-25 10:41:51');

-- ----------------------------
-- Table structure for company_clock_location
-- ----------------------------
DROP TABLE IF EXISTS `company_clock_location`;
CREATE TABLE `company_clock_location` (
  `LID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `CID` int(11) DEFAULT NULL,
  `Name` varchar(30) DEFAULT NULL COMMENT '地点名称',
  `Longitude` double DEFAULT '0' COMMENT '经度',
  `Latitude` double DEFAULT '0' COMMENT '维度',
  `Distance` int(11) DEFAULT '200' COMMENT '有效考勤距离',
  `MapType` tinyint(1) DEFAULT '1' COMMENT '地图类型1高德地图',
  PRIMARY KEY (`LID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of company_clock_location
-- ----------------------------

-- ----------------------------
-- Table structure for company_clock_wifi
-- ----------------------------
DROP TABLE IF EXISTS `company_clock_wifi`;
CREATE TABLE `company_clock_wifi` (
  `WFID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `CID` int(11) DEFAULT NULL,
  `WifiName` varchar(50) DEFAULT NULL,
  `MacAddress` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`WFID`),
  UNIQUE KEY `cmid` (`CID`,`MacAddress`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of company_clock_wifi
-- ----------------------------

-- ----------------------------
-- Table structure for company_member_absence
-- ----------------------------
DROP TABLE IF EXISTS `company_member_absence`;
CREATE TABLE `company_member_absence` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `CID` int(11) DEFAULT NULL,
  `MID` int(11) DEFAULT NULL,
  `StartDate` datetime DEFAULT NULL,
  `EndDate` datetime DEFAULT NULL,
  `Reason` varchar(1000) DEFAULT '' COMMENT '请假理由',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of company_member_absence
-- ----------------------------

-- ----------------------------
-- Table structure for company_member_clock
-- ----------------------------
DROP TABLE IF EXISTS `company_member_clock`;
CREATE TABLE `company_member_clock` (
  `ClockDate` date NOT NULL,
  `MID` int(11) NOT NULL,
  `CID` int(11) DEFAULT '0',
  `FirstClock` varchar(8) DEFAULT '',
  `FirstType` tinyint(1) DEFAULT '1' COMMENT '1WiFi 2地点',
  `FirstName` varchar(40) DEFAULT '' COMMENT 'wifi或地区名称',
  `FirstData` varchar(40) DEFAULT '' COMMENT '上班的WiFi或地区信息',
  `FirstImage` varchar(255) DEFAULT '' COMMENT '上班的脸',
  `LastClock` varchar(8) DEFAULT '',
  `LastType` tinyint(1) DEFAULT '1' COMMENT '1wifi 2 地点',
  `LastName` varchar(40) DEFAULT '' COMMENT 'wif 或地区名称',
  `LastData` varchar(11) DEFAULT '' COMMENT '下班的位置或者WiFi信息',
  `LastImage` varchar(255) DEFAULT '' COMMENT '下班的脸',
  `BeLate` tinyint(1) DEFAULT '0' COMMENT '1表示迟到2表示正常',
  `LeaveEarly` tinyint(1) DEFAULT '0' COMMENT '1表示早退2表示正常',
  PRIMARY KEY (`ClockDate`,`MID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of company_member_clock
-- ----------------------------

-- ----------------------------
-- Table structure for company_outwork
-- ----------------------------
DROP TABLE IF EXISTS `company_outwork`;
CREATE TABLE `company_outwork` (
  `OID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `MID` int(11) DEFAULT NULL,
  `OutDate` date DEFAULT NULL,
  `StartLocation` varchar(30) DEFAULT '',
  `StartName` varchar(50) DEFAULT '',
  `StartTime` varchar(19) DEFAULT '',
  `EndLocation` varchar(30) DEFAULT '',
  `EndName` varchar(50) DEFAULT '',
  `EndTime` varchar(30) DEFAULT '',
  `Reason` varchar(255) DEFAULT '',
  PRIMARY KEY (`OID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of company_outwork
-- ----------------------------

-- ----------------------------
-- Table structure for company_outwork_clock
-- ----------------------------
DROP TABLE IF EXISTS `company_outwork_clock`;
CREATE TABLE `company_outwork_clock` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `MID` int(11) DEFAULT NULL,
  `OID` int(11) DEFAULT NULL,
  `ClockDate` date DEFAULT NULL,
  `ClockTime` varchar(8) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL COMMENT '地址',
  `Note` varchar(1000) DEFAULT NULL COMMENT '备注',
  `Longitude` double DEFAULT NULL COMMENT '经度',
  `Latitude` double DEFAULT NULL COMMENT '维度',
  `MapType` tinyint(4) DEFAULT '1' COMMENT '1高德地图',
  `FaceImage` varchar(255) DEFAULT '' COMMENT '匹配照片',
  PRIMARY KEY (`ID`),
  KEY `idx_1` (`MID`,`ClockDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of company_outwork_clock
-- ----------------------------

-- ----------------------------
-- Table structure for company_work_day
-- ----------------------------
DROP TABLE IF EXISTS `company_work_day`;
CREATE TABLE `company_work_day` (
  `CID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Day_0_Status` tinyint(1) DEFAULT '2' COMMENT '周日是否上班1是2否',
  `Day_0_Start` varchar(5) DEFAULT '09:00',
  `Day_0_End` varchar(5) DEFAULT '18:00',
  `Day_1_Status` tinyint(1) DEFAULT '1',
  `Day_1_Start` varchar(5) DEFAULT '09:00',
  `Day_1_End` varchar(5) DEFAULT '18:00',
  `Day_2_Status` tinyint(1) DEFAULT '1',
  `Day_2_Start` varchar(5) DEFAULT '09:00',
  `Day_2_End` varchar(5) DEFAULT '18:00',
  `Day_3_Status` tinyint(1) DEFAULT '1',
  `Day_3_Start` varchar(5) DEFAULT '09:00',
  `Day_3_End` varchar(5) DEFAULT '18:00',
  `Day_4_Status` tinyint(1) DEFAULT '1',
  `Day_4_Start` varchar(5) DEFAULT '09:00',
  `Day_4_End` varchar(5) DEFAULT '18:00',
  `Day_5_Status` tinyint(1) DEFAULT '1',
  `Day_5_Start` varchar(5) DEFAULT '09:00',
  `Day_5_End` varchar(5) DEFAULT '18:00',
  `Day_6_Status` tinyint(1) DEFAULT '2',
  `Day_6_Start` varchar(5) DEFAULT '09:00',
  `Day_6_End` varchar(5) DEFAULT '18:00',
  `Start` varchar(5) DEFAULT '09:00',
  `End` varchar(5) DEFAULT '18:00',
  `Holiday` tinyint(4) DEFAULT '1' COMMENT '节假日自动排班1是2否',
  PRIMARY KEY (`CID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of company_work_day
-- ----------------------------

-- ----------------------------
-- Table structure for company_work_day_exception
-- ----------------------------
DROP TABLE IF EXISTS `company_work_day_exception`;
CREATE TABLE `company_work_day_exception` (
  `CID` int(11) unsigned NOT NULL,
  `WorkDate` date NOT NULL DEFAULT '0000-00-00',
  `Type` tinyint(1) DEFAULT '2' COMMENT '1上班2休息',
  `Reason` varchar(200) DEFAULT NULL,
  `Start` varchar(5) DEFAULT '09:00',
  `End` varchar(5) DEFAULT '18:00',
  PRIMARY KEY (`CID`,`WorkDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of company_work_day_exception
-- ----------------------------
INSERT INTO `company_work_day_exception` VALUES ('1', '0000-00-00', '2', null, '09:00', '18:00');

-- ----------------------------
-- Table structure for match_action
-- ----------------------------
DROP TABLE IF EXISTS `match_action`;
CREATE TABLE `match_action` (
  `ActionID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ActionName` varchar(50) DEFAULT '',
  `ActionType` varchar(20) DEFAULT 'text' COMMENT '回复消息类型 text image voice video music news server',
  `ActionContent` text COMMENT 'json 字符串 消息处理流程',
  `Note` varchar(500) DEFAULT '' COMMENT '备注',
  PRIMARY KEY (`ActionID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of match_action
-- ----------------------------
INSERT INTO `match_action` VALUES ('1', '测试', 'text', '啊啊啊', '');
INSERT INTO `match_action` VALUES ('2', '属性检测', 'server', '{\"class\":\"\\\\Api\\\\ActionServer\\\\FaceAttr\"}', '');
INSERT INTO `match_action` VALUES ('3', '照片比对', 'server', '{\"class\":\"\\\\Api\\\\ActionServer\\\\FaceMatch\"}', '');
INSERT INTO `match_action` VALUES ('4', 'OCR', 'server', '{\"class\":\"\\\\Api\\\\ActionServer\\\\ImageOcr\"}', '');

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `MID` int(11) NOT NULL AUTO_INCREMENT,
  `PersonID` int(11) DEFAULT NULL,
  `OpenID` char(40) DEFAULT NULL,
  `Token` varchar(20) DEFAULT NULL,
  `Nickname` varchar(20) DEFAULT '',
  `CID` int(11) DEFAULT '0' COMMENT '公司ID',
  `BID` int(11) DEFAULT '0' COMMENT '公司部门ID',
  `Name` varchar(20) NOT NULL DEFAULT '',
  `Email` varchar(60) DEFAULT '',
  `Phone` varchar(11) DEFAULT NULL,
  `Region` varchar(11) DEFAULT '86',
  `Avatar` varchar(255) DEFAULT '',
  `Gender` tinyint(1) NOT NULL DEFAULT '1' COMMENT '性别1 男2女3未知',
  `RegTime` datetime DEFAULT NULL,
  `LastLoginTime` datetime DEFAULT NULL,
  `LoginCnt` int(11) NOT NULL DEFAULT '0',
  `UUID` varchar(32) DEFAULT '',
  `StaffRole` tinyint(1) DEFAULT '0' COMMENT '0未加入公司1管理员2员工3加入公司未审核',
  `Status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1：账号正常 2账号被禁用不能登录',
  PRIMARY KEY (`MID`),
  UNIQUE KEY `idx_1` (`Phone`,`Region`),
  UNIQUE KEY `idx_token` (`Token`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of member
-- ----------------------------
INSERT INTO `member` VALUES ('1', '21356', '', '536cgqcSAZIX4J1VdON1', '昵称', '1', '1', '王五', '', '15158132010', '86', '', '1', '2016-11-18 11:14:48', '2016-11-18 12:01:09', '7', '11111111111111111111111111111111', '0', '1');
INSERT INTO `member` VALUES ('2', '21358', '', '536cgqcSAZIX4J1VdON2', '昵称', '1', '1', '王五', '', '15158132011', '86', '', '1', '2016-11-18 11:14:48', '2016-11-18 12:01:09', '7', '11111111111111111111111111111111', '0', '1');
INSERT INTO `member` VALUES ('3', '21356', '', '536cgqcSAZIX4J1VdON3', '昵称', '1', '1', '王五', '', '15158132012', '86', '', '1', '2016-11-18 11:14:48', '2016-11-18 12:01:09', '7', '11111111111111111111111111111111', '0', '1');
INSERT INTO `member` VALUES ('4', '21356', null, '536cgqcSAZIX4J1VdONp', '昵称', '1', '1', '王五', '', '15158132014', '86', '', '1', '2016-11-18 11:14:48', '2016-11-18 12:01:09', '7', '11111111111111111111111111111111', '0', '1');
INSERT INTO `member` VALUES ('5', '21356', '', '536cgqcSAZIX4J1VdON4', '昵称', '1', '1', '王五', '', '15158132015', '86', '', '1', '2016-11-18 11:14:48', '2016-11-18 12:01:09', '7', '11111111111111111111111111111111', '0', '1');
INSERT INTO `member` VALUES ('6', '21356', '', '536cgqcSAZIX4J1VdON5', '昵称', '1', '1', '王五', '', '15158132016', '86', '', '1', '2016-11-18 11:14:48', '2016-11-18 12:01:09', '7', '11111111111111111111111111111111', '0', '1');
INSERT INTO `member` VALUES ('7', '21358', '', '536cgqcSAZIX4J1VdON6', '昵称', '1', '1', '王五', '', '15158132017', '86', '', '1', '2016-11-18 11:14:48', '2016-11-18 12:01:09', '7', '11111111111111111111111111111111', '0', '1');
INSERT INTO `member` VALUES ('8', '21356', '', '536cgqcSAZIX4J1VdON7', '昵称', '1', '1', '王五', '', '15158132018', '86', '', '1', '2016-11-18 11:14:48', '2016-11-18 12:01:09', '7', '11111111111111111111111111111111', '0', '1');
INSERT INTO `member` VALUES ('9', '21356', '', '536cgqcSAZIX4J1VdON8', '昵称', '1', '1', '王五', '', '15158132019', '86', '', '1', '2016-11-18 11:14:48', '2016-11-18 12:01:09', '7', '11111111111111111111111111111111', '0', '1');
INSERT INTO `member` VALUES ('10', '21356', '', '536cgqcSAZIX4J1VdON9', '昵称', '1', '1', '王五', '', '15158132081', '86', '', '1', '2016-11-18 11:14:48', '2016-11-18 12:01:09', '7', '11111111111111111111111111111111', '0', '1');
INSERT INTO `member` VALUES ('11', '21356', '', '536cgqcSAZIX4J1VdO10', '昵称', '1', '1', '王五', '', '15158132071', '86', '', '1', '2016-11-18 11:14:48', '2016-11-18 12:01:09', '7', '11111111111111111111111111111111', '0', '1');
INSERT INTO `member` VALUES ('12', '21356', '', '536cgqcSAZIX4J1VdO11', '昵称', '1', '1', '王五', '', '15158132082', '86', '', '1', '2016-11-18 11:14:48', '2016-11-18 12:01:09', '7', '11111111111111111111111111111111', '0', '1');

-- ----------------------------
-- Table structure for member_faces
-- ----------------------------
DROP TABLE IF EXISTS `member_faces`;
CREATE TABLE `member_faces` (
  `FaceID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `MID` int(11) DEFAULT NULL,
  `ImagePath` varchar(255) DEFAULT NULL,
  `AddTime` datetime DEFAULT NULL,
  PRIMARY KEY (`FaceID`)
) ENGINE=InnoDB AUTO_INCREMENT=74663 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of member_faces
-- ----------------------------
INSERT INTO `member_faces` VALUES ('74662', '4', '/member/0/4/4/14794388892441000.jpg', '2016-11-18 11:14:49');

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus` (
  `MenuID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ParentID` int(11) DEFAULT '0',
  `Name` varchar(20) DEFAULT '',
  `Type` varchar(20) DEFAULT 'menu' COMMENT 'click view scancode_push scancode_waitmsg pic_sysphoto pic_photo_or_album pic_weixin location_select media_id view_limited',
  `Key` varchar(30) DEFAULT '',
  `MediaID` varchar(40) DEFAULT NULL,
  `SortOrder` tinyint(4) unsigned DEFAULT '100',
  `IsMenu` bit(1) DEFAULT b'1',
  PRIMARY KEY (`MenuID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menus
-- ----------------------------

-- ----------------------------
-- Table structure for msg_match
-- ----------------------------
DROP TABLE IF EXISTS `msg_match`;
CREATE TABLE `msg_match` (
  `MatchID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `MatchName` varchar(50) DEFAULT '',
  `MsgType` varchar(50) DEFAULT 'text' COMMENT '消息类型 text image voice video shortvideo location link evet',
  `MatchString` varchar(200) DEFAULT '',
  `EventType` varchar(20) DEFAULT 'CLICK' COMMENT 'subscribe unsubscribe SCAN LOCATION VIEW scancode_waitmsg scancode_push pic_sysphoto pic_photo_or_album pic_weixin location_select',
  `ActionID` int(11) DEFAULT '0' COMMENT '处理的操作',
  `MatchType` tinyint(1) DEFAULT '1' COMMENT '1全文字匹配2正则匹配0默认匹配',
  `StartTime` datetime DEFAULT '2000-01-01 00:00:00',
  `EndTime` datetime DEFAULT '2100-01-01 00:00:00',
  `SortOrder` int(11) DEFAULT '500' COMMENT '匹配先后顺序越大越先匹配',
  `Status` tinyint(1) DEFAULT '1' COMMENT '1启用2禁用',
  PRIMARY KEY (`MatchID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of msg_match
-- ----------------------------
INSERT INTO `msg_match` VALUES ('1', '测试匹配', 'text', '/HELLO/i', 'CLICK', '1', '2', '2000-01-01 00:00:00', '2100-01-01 00:00:00', '500', '1');
INSERT INTO `msg_match` VALUES ('2', '测试匹配二', 'text', 'test2', 'CLICK', '1', '0', '2000-01-01 00:00:00', '2100-01-01 00:00:00', '0', '1');
INSERT INTO `msg_match` VALUES ('3', '接收事件点击人脸属性检测', 'event', 'face_attr', 'CLICK', '2', '1', '2000-01-01 00:00:00', '2100-01-01 00:00:00', '500', '1');
INSERT INTO `msg_match` VALUES ('4', '事件人脸比对', 'event', 'face_match', 'CLICK', '3', '1', '2000-01-01 00:00:00', '2100-01-01 00:00:00', '500', '1');
INSERT INTO `msg_match` VALUES ('5', '图片消息属性检测', 'image', '', 'CLICK', '2', '0', '2000-01-01 00:00:00', '2100-01-01 00:00:00', '500', '1');
INSERT INTO `msg_match` VALUES ('6', '图片消息比对', 'image', '', 'CLICK', '3', '0', '2000-01-01 00:00:00', '2100-01-01 00:00:00', '500', '1');
INSERT INTO `msg_match` VALUES ('7', '身份证OCR', 'event', 'image_ocr', 'CLICK', '4', '1', '2000-01-01 00:00:00', '2100-01-01 00:00:00', '500', '1');
INSERT INTO `msg_match` VALUES ('8', '文字匹配OCR', 'text', '/ocr/i', 'CLICK', '4', '2', '2000-01-01 00:00:00', '2100-01-01 00:00:00', '500', '1');
INSERT INTO `msg_match` VALUES ('9', '图片消息OCR', 'image', '', 'CLICK', '4', '0', '2000-01-01 00:00:00', '2100-01-01 00:00:00', '500', '1');
INSERT INTO `msg_match` VALUES ('10', '', 'text', '', 'CLICK', '0', '1', '2000-01-01 00:00:00', '2100-01-01 00:00:00', '500', '1');

-- ----------------------------
-- Table structure for new_company_apply
-- ----------------------------
DROP TABLE IF EXISTS `new_company_apply`;
CREATE TABLE `new_company_apply` (
  `MID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `CompanyName` varchar(100) DEFAULT '' COMMENT '公司名称',
  `CID` int(11) DEFAULT '0',
  `Comment` varchar(200) DEFAULT '' COMMENT '审核失败说明',
  `LicenseImage` varchar(255) DEFAULT '' COMMENT '营业执照照片',
  `Status` tinyint(1) DEFAULT '1' COMMENT '1申请中2申请失败',
  PRIMARY KEY (`MID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of new_company_apply
-- ----------------------------
