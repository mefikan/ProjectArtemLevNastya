const Router = require(`express`)
const router = new Router();
const dishController = require('../controllers/dishController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, dishController.create)
router.get('/getOne', authMiddleware, dishController.getOne)
router.get('/getAll', authMiddleware, dishController.getAll)
router.get('/addProperty', authMiddleware, dishController.dishAddProperty)

module.exports = router