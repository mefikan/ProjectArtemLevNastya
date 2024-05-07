const Router = require(`express`)
const router = new Router();
const userRouter = require('./userRouter')
const noteRouter = require('./noteRouter')
const swipeRouter = require('./swipeRouter')
const restaurantRouter = require('./restaurantRouter')
const dishRouter = require('./dishRouter')

router.use('/user', userRouter)
router.use('/note', noteRouter)
router.use('/swipe', swipeRouter)
router.use('/restaurant', restaurantRouter)
router.use('/dish', dishRouter)

module.exports = router