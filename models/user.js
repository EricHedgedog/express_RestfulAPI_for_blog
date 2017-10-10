var mongoose = require('mongoose')
var Schema = mongoose.Schema;



var UserSchema = new Schema({
    name: String
})

UserSchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name"
  console.log(greeting);
}


/**
 * 定义模型User
 * 模型用来实现我们定义的模式，调用mongoose.model来编译Schema得到Model
 * @type {[type]}
 */
// 参数User 数据库中的集合名称, 不存在会创建.
var User = mongoose.model('User', UserSchema)

module.exports = User