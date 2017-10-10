var express = require('express');

// API路由配置
// =============================================================================
var router = express.Router();              // 获得express router对象

// 任何路由的每次request都执行
router.use(function(req, res, next) {
    // 打印
    console.log('Something is happening.');
    next(); // 在这里会将request交给下一个中间件，如果这个中间件后面没有其他中间件，请求会交给匹配的路由作处理
});


// 用get动词访问 http://localhost:8080/api
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.get('/articles', function(req, res) {
    res.json({ message: 'articles' });   
});

module.exports = router