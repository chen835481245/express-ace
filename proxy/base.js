var MysqlQuery = require('../lib/mysql');
var Logger = require('../lib/Logger');
var CommonFun =  require('../lib/common.js');

/**
 * TODO 下一版本考虑分表分库的实现
 * @param table
 * @constructor
 */
function Base(table) {
    this.table =table;
}
Base.prototype.getTable = function() {
    return this.table;
}

/*Base.prototype.getTable = function() {
    return this.table;
}*/
Base.prototype.getList = function (where, callback, fields,orderBy) {
    var whereField = '';
    if( whereField = CommonFun.toWhereFields(where))
    {
        whereField= ' where '+ whereField;
    }
    var selectFields = " * ";
    if(fields)
    {
        selectFields = CommonFun.implode(',',fields);
    }
    var orderByField = '';
    if(orderBy){
        orderByField = ' order by '+orderBy;
    }
    var selectSql = "SELECT "+selectFields+"  from "+this.table+" "+whereField+orderByField;
    MysqlQuery(selectSql, function(err,rows,fields){
        if(err) {
            Logger.log('error',selectSql,err);
            return callback(err,null);
        }
        callback(null, rows);
    });
}
Base.prototype.getPageList = function (where, page, perPage, callback, fields, orderBy) {
    var whereField = '';
    if( whereField = CommonFun.toWhereFields(where))
    {
        whereField= ' where '+ whereField;
    }
    var selectFields = " * ";
    if(fields)
    {
        selectFields = CommonFun.implode(',',fields);
    }
    var orderByField = '';
    if(orderBy){
        orderByField = ' order by '+orderBy;
    }
    var limitField = '';
    if(page){
        var start = (page -1)*perPage;
        limitField = ' limit '+start+','+perPage;
    }
    var selectSql = "SELECT "+selectFields+"  from "+this.table+" "+whereField+orderByField+limitField;
    MysqlQuery(selectSql, function(err,rows,fields){
        if(err) {
            Logger.log('error',selectSql,err);
            return callback(err,null);
        }
        callback(null, rows);
    });
}
Base.prototype.insertData = function (data, callback) {
    var insertFields = CommonFun.toInsertFields(data);
    var insertSql = "INSERT into "+this.table+"("+insertFields.field+") values("+insertFields.value+")";
    MysqlQuery(insertSql, function(err, packet){
        if(err) {
            Logger.log('error',insertSql, err);
            return callback(err);
        }
        callback(null,packet);
    });
}
Base.prototype.getData = function(where, callback, fields,orderBy) {
    var whereField = '';
    if( whereField = CommonFun.toWhereFields(where))
    {
        whereField= ' where '+ whereField;
    }
    var orderByField = '';
    if(orderBy){
        orderByField = ' order by '+orderBy;
    }
    var selectFields = " * ";
    if(fields)
    {
        selectFields = CommonFun.implode(',',fields);
    }
    var selectSql = "SELECT "+selectFields+"  from "+this.table + whereField +orderByField+ " limit 1 ";
    MysqlQuery(selectSql, function (err, rows, fields) {
        if (err) {
            Logger.log('error', selectSql, err);
            return callback(err, null);
        }
        callback(null, rows[0]);
    });
}
Base.prototype.updateData =function(where, data, callback)
{
    var whereField = '';
    if( whereField = CommonFun.toWhereFields(where))
    {
        whereField= ' where '+ whereField;
    }
    var updateField = CommonFun.toUpdateFields(data);
    var updateSql = "UPDATE "+this.table+" set "+updateField+whereField;
    MysqlQuery(updateSql, function(err, packet){
        if(err) {
            Logger.log('error',updateSql, err);
            return callback(err,null);
        }
        callback(null, packet);
    });
}
Base.prototype.deleteData =function(where, callback)
{
    var whereField = '';
    if( whereField = CommonFun.toWhereFields(where))
    {
        whereField= ' where '+ whereField;
    }
    var deleteSql = "DELETE FROM "+this.table+whereField;
    MysqlQuery(deleteSql, function(err, packet){
        if(err) {
            Logger.log('error',deleteSql, err);
            return callback(err,null);
        }
        callback(null, packet);
    });
}
Base.prototype.getCount = function (where, callback, field)
{
    var whereField = '';
    if( whereField = CommonFun.toWhereFields(where))
    {
        whereField= ' where '+ whereField;
    }
    var countField ='*';
    if(field && typeof field=='string') countField = field;
    var selectSql = "SELECT COUNT("+countField+") as num  from "+this.table+" "+whereField;
    MysqlQuery(selectSql, function(err, row,packet){
        if(err) {
            Logger.log('error',selectSql, err);
            return callback(err,null);
        }
        callback(null, row[0]['num']);
    });
}
Base.prototype.getArray = function (where, callback, fields)
{
    var whereField = '';
    if( whereField = CommonFun.toWhereFields(where))
    {
        whereField= ' where '+ whereField;
    }
    if(!fields){
        return callback('fields error', null);
    }
    selectFields = CommonFun.implode(',',fields);
    var selectSql = "SELECT "+selectFields+"  from "+this.table + whereField ;
    MysqlQuery(selectSql, function (err, rows, fields) {
        if (err) {
            Logger.log('error', selectSql, err);
            return callback(err, null);
        }
        var data ={};
        for(var i in rows){
            var fieldKey = fields[0];
            var fieldval = fields[1];
            var key = row[i][fieldKey];
            var val = row[i][fieldval];
            data[key]=val;
        }
        callback(null, data);
    });
}
module.exports = Base;



