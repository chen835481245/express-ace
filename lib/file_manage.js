var fs = require('fs');
var moment = require('moment');
var config = require('../config/config');
var path = require('path');

var mkPath = exports.mkPath = function(dirPath,callback, mode) {
    if(!mode) mode = '0777';
    fs.exists(dirPath, function(exists) {
        if(exists) {
            callback(null);
        } else {
            //尝试创建父目录，然后再创建当前目录
            mkPath(path.dirname(dirPath), function(err){
                if(err) return callback(err);
                fs.mkdir(dirPath, mode, function(error){
                    if(error&&error.code!='EEXIST') return callback(error);
                    callback(null);
                });
            });
        }
    });
};
exports.saveFile = function(sourcePath , savePath, callback) {
    var readStream = fs.createReadStream(sourcePath);
    readStream.on('error',function(err){
        callback(err);
    })
    readStream.on('open', function(fd){
        var writeStream = fs.createWriteStream(savePath);
        writeStream.on('error',function(err){
            callback(err);
        })
        readStream.on('data', function(data){
            writeStream.write(data);
        });
        readStream.on('end', function(data){
            callback(null)
        });
    });
}
exports.saveFromFile = function(sourcePath , folder_1,folder_2,filename,callback) {
    fs.exists(path.join(config.directory, folder_1), function (exists_1) {
        if(exists_1)
        {
            fs.exists(path.join(config.directory, folder_1+'/'+folder_2), function (exists_2) {
                if(exists_2){
                    var readStream = fs.createReadStream(sourcePath);
                    var writeStream = fs.createWriteStream(path.join(config.directory, folder_1+'/'+folder_2+'/'+filename));
                    readStream.on('data', function(data){
                        writeStream.write(data);
                    });
                }else{
                    fs.mkdir(path.join(config.directory, folder_1+'/'+folder_2), function(err){
                       // if(err) return callback(err);
                        var readStream = fs.createReadStream(sourcePath);
                        var writeStream = fs.createWriteStream(path.join(config.directory, folder_1+'/'+folder_2+'/'+filename));
                        readStream.on('data', function(data){
                            writeStream.write(data);
                        });
                    })
                }
            })
        }else{
            fs.mkdir(path.join(config.directory, folder_1), function(err){
                //if(err) return callback(err);
                fs.mkdir(path.join(config.directory,  folder_1+'/'+folder_2), function(err){
                    //if(err) return callback(err);
                    var readStream = fs.createReadStream(sourcePath);
                    var writeStream = fs.createWriteStream(path.join(config.directory, folder_1+'/'+folder_2+'/'+filename));
                    readStream.on('data', function(data){
                        writeStream.write(data);
                    });
                })
            })
        }
    });
}


