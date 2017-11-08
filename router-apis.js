var express = require('express');
var app = express()
var User = require('./models/user')
var Articles = require('./models/articles')
var jwt = require('jsonwebtoken')
// var user = require('./controllers/user')
// API路由配置
// =============================================================================
var router = express.Router();              // 获得express router对象

app.set('superSecret', 'hahahaha') // secrete key

// 任何路由的每次request都执行
router.use(function(req, res, next) {
    // 打印
    res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log('Something is happening.');
    next(); // 在这里会将request交给下一个中间件，如果这个中间件后面没有其他中间件，请求会交给匹配的路由作处理
});


router.post('/user', function(req, res) {
        var users = new User();      // 创建一个Bear model的实例
        users.name = req.body.name;  // 从request取出name参数的值然后设置bear的name字段
        users.pwd = req.body.pwd;
        // 保存bear，加入错误处理，即把错误作为响应返回
        User.find( {name: req.body.name}, 'name pwd', function(err, user) {
        	if (err){
        		res.send(err) 
        		
        	} 
    		console.log('%s  is %s.', users.name, users.pwd)
    		// console.log(user)
        	if (user[0].name == users.name) {
    	 		res.json({ message: 'user is there!' });
        	} else {
        		res.json({message: 'null'})
        	}
        });
        
    });

// 必须要用lean()处理下从moongoDB 拉回来的数据， 这个数据不是一个 plain object 
// 如果不处理 会报错 Expect 'playload' to be a plain object
router.post('/auth', function(req, res) {
		console.log(req.body.name)
    // find the user
    User.findOne({
        name: req.body.name
    }).lean().exec(function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: '认证失败，用户名找不到' });
        } else if (user) {

            // 检查密码
            if (user.pwd != req.body.pwd) {
                res.json({ success: false, message: '认证失败，密码错误' });
            } else {

            	console.log(user)
                // 创建token
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: 1440 // 设置过期时间
                });

                // json格式返回token
                res.json({
                    success: true,
                    message: '登陆成功',
                    token: token,
                    isAdmin: user.isAdmin
                });
            }

        }

    });
});    

router.post('/addArticle', function(req, res) {
    var article = new Articles();      // 创建一个Bear model的实例
	article.title = req.body.title;  // 从request取出name参数的值然后设置bear的name字段
    ariticle.content = req.body.content;
    systemDate = new Date()
    article.date = systemDate.getFullYear()
    yield article.save(function(err, articles, numberAffected) {
    	if (err){
    		res.send(err) 
    	} else {
    		res.json({
                    success: true,
                    message: '添加成功',
                });
            }
    	}
    });
});


router.get('/articles', function(req, res) {
    Articles.find({}, function(err, articles) {
    	res.json(articles);
  	}); 
});


module.exports = router