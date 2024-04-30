const Router = require(`express`)
<<<<<<< HEAD
const router = new Router();
=======
const router = Router();
>>>>>>> 1f1c816c4cdadd1a8e3b24e2ab37a027940b12de
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device',deviceRouter)

module.exports = router