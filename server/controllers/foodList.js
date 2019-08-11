const FoodlistModel = require('../modules/foodList.js')

class FoodListController {
  /**
   * 创建一个foodlistitem
   * @param ctx
   * @returns {Promise.<{}>}
   */
  static async createFoodList (ctx) {
    try {
      const data = ctx.request.body
      const result = await FoodlistModel.createFoodListItem(data)
      ctx.response.status = 200
      ctx.body = {
        success: true,
        code: 200,
        msg: '添加成功',
        data: result
      }
    } catch (err) {
      ctx.response.status = 412
      ctx.body = {
        code: 412,
        msg: '添加错误',
        data: err
      }
    }
  }
  /**
   * 更新foodlist
   * @param ctx
   * @returns {Promise.<{}>}
   */
  static async updateFoodList (ctx) {
    try {
      const data = ctx.request.body
      const result = await FoodlistModel.updateFoodListItem(data)
      ctx.response.status = 200
      ctx.body = {
        success: true,
        code: 200,
        msg: '修改成功',
        data: result
      }
    } catch (err) {
      ctx.response.status = 412
      ctx.body = {
        code: 412,
        msg: '修改错误',
        data: err
      }
    }
  }
  /**
   * 删除foodlistitem
   * @param ctx
   * @returns {Promise.<{}>}
   */
  static async deleteFoodList (ctx) {
    try {
      const data = ctx.request.query
      const result = await FoodlistModel.deleteFoodListItem(data)
      ctx.response.status = 200
      ctx.body = {
        success: true,
        code: 200,
        msg: '修改成功',
        data: result
      }
    } catch (err) {
      ctx.response.status = 412
      ctx.body = {
        code: 412,
        msg: '修改错误',
        data: err
      }
    }
  }
  /**
   * 获取foodlist
   * @param ctx
   * @returns {Promise.<{}>}
   */
  static async getFoodListInfo (ctx) {
    try {
      const result = await FoodlistModel.getFoodListAll() // 通过await “同步”地返回查询结果
      ctx.response.status = 200
      ctx.body = {
        code: 200,
        msg: '获取成功',
        data: result
      }
    } catch (err) {
      ctx.response.status = 412
      ctx.body = {
        code: 412,
        msg: '查询错误',
        data: err
      }
    }
  }
}

module.exports = FoodListController
