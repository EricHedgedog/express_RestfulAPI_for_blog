var mongoose = require('mongoose')
var url = "mongodb://localhost:27017/test" // 连接mongodb的url
mongoose.connect(url, {useMongoClient: true,}); // 连接数据库
var Schema = mongoose.Schema;



var AriticleSchema = new Schema({
    title: type: String,
    content: type: String,
    date: type: Date
})


/**
 * 定义模型User
 * 模型用来实现我们定义的模式，调用mongoose.model来编译Schema得到Model
 * @type {[type]}
 */
// 参数User 数据库中的集合名称, 不存在会创建.
var Articles = mongoose.model('Articles', ArticleSchema)

module.exports = Articles