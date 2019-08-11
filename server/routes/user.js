const user = require('../controllers/user.js')
const koaRouter = require('koa-router')
const router = koaRouter()

router.post('/', user.postUser)

module.exports = router
