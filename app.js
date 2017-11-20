var express = require('express');
var app = express(); // 获得express定义的app，app对象此时代表整个web应用
var port = process.env.PORT || 3000;        // set our port
var bodyParser = require('body-parser');
var router = express.Router()
var User = require("./models/user")
var apiRouters = require("./router-apis")


// 给app配置bodyParser中间件
// 通过如下配置在路由中处理request时，可以直接获得post请求的body部分
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// 用get动词访问 http://localhost:8080/api
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// 注册路由
// 所有的路由会加上“／api”前缀
app.use('/api', apiRouters);


// 启动server
// =============================================================================
//开始监听端口
app.listen(port);
console.log('Magic happens on port ' + port);
