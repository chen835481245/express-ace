var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');//对favicon的处理
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/router');
var session = require('express-session');
var config = require('./config/config');
var app = express();
var logger = require('./lib/logger');//自己的日志

app.set('env', config.env);//设置运行环境
// view engine setup 模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//设置favicon的文件路径
app.use(favicon(config.favicon_path));
app.use(express.static(config.states_path));//静态文件
app.use(function(req, res, next) {
    try {
        var headers = req.headers;
        headers['url'] = req.url;
        headers['ip'] = req.ip;
        logger.log('info',headers);
    }catch (err){
        
    }

    next();
});
app.use(bodyParser.urlencoded({ extended: true ,limit:1024*1024}));//这个就支持了了application/x-www-form-urlencoded  extented 为true 支持数组?
app.use(bodyParser.json());//默认json  默认支持application/json
app.use(cookieParser());
app.use(session({
    secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
    resave: true,
    saveUninitialized: false
}));
routes(app);

// catch 404 and forward to error handler
//调用next() 就会执行下面 如果已经res.send 则会报错
app.use(function(req, res, next) {
    console.log('进入404错误')
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        if(err.isJson) {
            logger.log('info','development error',err.error_code,err.message);
            res.send({
                error_code:err.error_code,
                message:err.message,
            })
        }else {
            logger.log('info','development error',err);
            res.render('error', {
                message: err.message,
                error: err
            });
        }
    });
} else {
    // production error handler
    app.use(function(err, req, res, next) {
        //
        console.log('baseUrl',req.baseUrl,'path',req.path)
        res.status(err.status || 500);
        if(err.isJson) {
            logger.log('info','product error',err.error_code,err.message);
            res.send({
                error_code:err.error_code,
                message:err.message,
            })
        }else {
            logger.log('info','product error',err);
            res.render('error', {
                message: err.message,
                error: {}
            });
        }
    });
}
module.exports = app;
