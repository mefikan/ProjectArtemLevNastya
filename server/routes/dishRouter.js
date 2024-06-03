const Router = require(`express`)
const router = new Router();
const dishController = require('../controllers/dishController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, dishController.create)
router.get('/getOne', authMiddleware, dishController.getOne)
router.get('/getAll', authMiddleware, dishController.getAll)
router.post('/addProperty', authMiddleware, dishController.dishAddProperty)
router.post('/createWithProps', authMiddleware, dishController.createAndSet5Properties)

module.exports = router