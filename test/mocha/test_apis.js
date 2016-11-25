var Apis = require('./lib/apis');
//Apis.register(function(err){if(err) console.log(err);})
Apis.checkLogin(function(err){if(err) console.log(err);})
//facevisaApi.addFace(function(err){if(err) console.log(err);})