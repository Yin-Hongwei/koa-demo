// 引入mysql的配置文件
const db = require('../config/db')

// 引入sequelize对象
const Sequelize = db.sequelize

// 引入数据表模型
const User = Sequelize.import('../schema/user.js')
User.sync({force: false}) // 自动创建表

class UserModel {
  /**
   * 根据用户名查找用户
   * @param name
   * @returns {Promise<>}
   */
  static async getUserByName (name) {
    return await User.findOne({
      where: {
        user_name: name
      }
    })
  }
}

module.exports = UserModel
