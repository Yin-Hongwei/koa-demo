const UserModel = require('../modules/user.js')
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')

class UserController {
  /**
   * 登录验证
   * @param ctx
   * @returns {Promise.<{}>}
   */
  static async postUser (ctx) {
    // try {
    const data = ctx.request.body // post过来的数据存在request.body里
    const userInfo = await UserModel.getUserByName(data.user_name)
    if (userInfo != null) { // 如果查无此用户会返回null
      console.log(data.password)
      console.log(userInfo.password)
      // if (!bcrypt.compareSync(data.password === userInfo.password)) {
      // 使用 bcrypt加密过的话用上面这行，这里我的密码没有加密所以不用了
      if (!(data.password === userInfo.password)) {
        ctx.body = {
          success: false, // success标志位是方便前端判断返回是正确与否
          code: 202,
          info: '密码错误！'
        }
      } else {
        const userToken = {
          name: userInfo.user_name,
          id: userInfo.id
        }
        const secret = 'koa-demo' // 指定密钥
        const token = jwt.sign(userToken, secret) // 签发token
        ctx.body = {
          success: true,
          code: 200,
          token: token // 返回token
        }
      }
    } else {
      ctx.body = {
        success: false,
        code: 201,
        info: '用户不存在！' // 如果用户不存在返回用户不存在
      }
    }
    // } catch (error) {
    //   ctx.throw(500)
    // }
  }
}

module.exports = UserController
