const Router = require(`express`)
const router = new Router();
const swipeController = require('../controllers/swipeController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, swipeController.create)
router.post('/addProperty', authMiddleware, swipeController.swipeAddProperty)
router.post('/addProperties', authMiddleware, swipeController.swipeAddProperties)
router.get('/getOne', authMiddleware, swipeController.getOne)
router.get('/getAll', authMiddleware, swipeController.getAll)
router.get('/getProperties', authMiddleware, swipeController.getAllCurrentSwipeProperties)
router.get('/getDish', authMiddleware, swipeController.getDishAccordingToSwipes)
module.exports = router