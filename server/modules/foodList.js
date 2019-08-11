// 引入mysql的配置文件
const db = require('../config/db')

// 引入sequelize对象
const Sequelize = db.sequelize

// 引入数据表模型
const FoodList = Sequelize.import('../schema/foodList.js')
FoodList.sync({force: false}) // 自动创建表

class FoodListModel {
  /**
   * 创建一个foodlistitem
   * @param data
   * @returns {Promise<>}
   */
  static async createFoodListItem (data) {
    // const date = new Date()
    // const now = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    const now = Date.now()
    return await FoodList.create({
      name: data.name,
      toggle: data.toggle,
      create_time: now,
      updated_time: now
    })
  }
  /**
   * 删除一个foodlist项
   * @param data
   * @returns {Promise<>}
   */
  static async deleteFoodListItem (data) {
    return await FoodList.destroy({
      where: {
        name: data.name
      }
    })
  }
  /**
   * 更新一个foodlistitem
   * @param data
   * @returns {Promise<>}
   */
  static async updateFoodListItem (data) {
    return await FoodList.update({
      toggle: data.toggle
    }, {
      where: {
        name: data.name
      }
    })
  }
  /**
   * 查询所有FoodListItem
   * @param void
   * @returns {Promise<>}
   */
  static async getFoodListAll () {
    return await FoodList.findAll()
  }
  /**
   * FoodList中是否有指定的FoodListItem
   * @param name
   * @returns {Promise<>}
   */
  static async getFoodListByName (name) {
    return await FoodList.findOne({
      where: {
        name: name
      }
    })
  }
}

module.exports = FoodListModel
