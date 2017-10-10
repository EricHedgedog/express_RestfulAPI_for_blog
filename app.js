var express = require('express');
var app = express(); // 获得express定义的app，app对象此时代表整个web应用
var bodyParser = require('body-parser');
var User = require('./models/user')
var url = "mongodb://localhost:27017/test" // 连接mongodb的url
var mongoose = require('mongoose');//加载mongoose模块
var apiRouters = require('./router-apis')
mongoose.connect(url); // 连接数据库
// 给app配置bodyParser中间件
// 通过如下配置在路由中处理request时，可以直接获得post请求的body部分
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port




// 注册路由
// 所有的路由会加上“／api”前缀
app.use('/api', apiRouters);


// 启动server
// =============================================================================
//开始监听端口
app.listen(port);
console.log('Magic happens on port ' + port);

// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('Example app listening at http://%s:%s', host, port);
// });