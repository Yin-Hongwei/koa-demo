const Koa = require('koa')
const json = require('koa-json')
const logger = require('koa-logger')
const user = require('./routes/user.js')
const foodList = require('./routes/foodList.js')
const path = require('path')
const serve = require('koa-static')
const historyApiFallback = require('koa2-history-api-fallback')
const cors = require('koa-cors')
const koaRouter = require('koa-router')
const koaBodyparser = require('koa-bodyparser')

const app = new Koa()
const router = koaRouter()
let port = 8888

app.use(koaBodyparser())
app.use(json())
app.use(logger())
app.use(async function (ctx, next) {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.use(cors({
  origin: function (ctx) {
    if (ctx.url === '/test') {
      return '*' // 允许来自所有域名请求
    }
    return 'http://localhost:8080' // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))
router.use('/user', user.routes()) // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
router.use('/foodList', foodList.routes())
app.use(router.routes()) // 将路由规则挂载到Koa上。

app.use(historyApiFallback())
app.use(serve(path.resolve('dist'))) // 将webpack打包好的项目目录作为Koa静态文件服务的目录

app.on('error', function (err, ctx) {
  console.log('server error', err)
})

app.listen(port, () => {
  console.log(`Koa is listening in ${port}`)
})
