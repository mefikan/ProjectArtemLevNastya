const Router = require(`express`)
const router = new Router();
const noteController = require('../controllers/noteController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', noteController.create)
router.get('/getOne', noteController.getOne)
router.get('/getAll', authMiddleware, noteController.getAll)

module.exports = router