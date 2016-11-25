var winston = require('winston');
var config = require('../config/config');
var  DailyRotateFile=require('winston-daily-rotate-file');
var moment = require('moment');
//{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
var logger = new (winston.Logger)({
    transports: [
/*        new (winston.transports.File)({
            name: 'info-file',
            filename:config.logger.info_path,
            level: 'info'       //比info 小的都会记录这里 入error warn
        }),*/
        new DailyRotateFile({
            name: 'info-file',
            filename:config.logger.info_path,
            //  timestamp:dateFormat,
            timestamp: function() { return new Date().toString() },
            level: 'info',
            colorize:true,
            maxsize:1024*1024*10,
            datePattern:'.yyyy-MM-dd'
        }),
        new DailyRotateFile({
            name: 'warn-file',
            filename:config.logger.warn_path,
            //  timestamp:dateFormat,
            timestamp: function() { return new Date().toString() },
            level: 'warn',
            colorize:true,
            maxsize:1024*1024*10,
            datePattern:'.yyyy-MM-dd'
        }),
        new (winston.transports.File)({
            name: 'error-file',
            filename: config.logger.error_path,
            timestamp: function() { return new Date().toString() },
            level: 'error'  //比error小都会记录这里 就只有error
        }),
        new (winston.transports.Console)({
            level: 'debug'  //比debug小都会记录这里 就只有error warn info verbose debug
        }),
    ]
});
module.exports = logger;