const Router = require(`express`)
const router = new Router();
const restaurantController = require('../controllers/restaurantController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware,restaurantController.create)
router.get('/getAll', authMiddleware, restaurantController.getAll)
router.post('/getOne', authMiddleware, restaurantController.getOne)

module.exports = router