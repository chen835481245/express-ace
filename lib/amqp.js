var config = require('../config/config');
var amqp =require('amqplib/callback_api');
var logger = require('./logger');
var connect ;
var num = 0;
var channelList = new Array();
exports.setCh = function(fun)
{
    channelList.push(fun);
}
exports.createCh = function(fun)
{
    channelList.push(fun);
    if(connect)
    {
        logger.log('info', 'amqp channel create');
        connect.createChannel(fun);
    }else{
        setup();
    }

}
//发布消息？
exports.publish = function(fun)
{
    if(connect)
    {
        logger.log('info', 'amqp publish channel create');
        connect.createChannel(fun);
        return true;
    }else{
        return false;
    }
}
exports.clearCh = function()//清空数组
{
    channelList = new Array();
    //channelList = [];
    //channelList.length = 0;
}
exports.getLength= function()//清空数组
{
    return channelList.length;
}
function setup()
{
    amqp.connect(config.amqpHost, function(err, conn) {
        if(err)
        {
            num++;
            logger.log('error', 'amqp connect error', num,  err);
            if(num >= 5)
            {
                logger.log('error', 'amqp stop reconnect');
                return;
            }
            return setTimeout(setup, 10 * 1000);
        }
        num= 0;
        connect = conn;
        conn.on('error',function(err){
            logger.log('error', 'amqp error',err);
            connect = null;
            return setTimeout(setup, 10 * 1000);
        })
        for(ch in channelList)
        {
            logger.log('info', 'amqp channel create');
            conn.createChannel(channelList[ch]);
        }
    });
}
exports.setup=setup;




