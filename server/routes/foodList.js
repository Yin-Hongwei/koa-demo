const foodList = require('../controllers/foodList.js')
const koaRouter = require('koa-router')
const router = koaRouter()

router.get('/', foodList.getFoodListInfo)
router.post('/create', foodList.createFoodList)
router.post('/update', foodList.updateFoodList)
router.delete('/delete', foodList.deleteFoodList)

module.exports = router
