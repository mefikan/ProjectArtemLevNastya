const Router = require(`express`)
<<<<<<< HEAD
const router = new Router();
const typeController = require('../controllers/typeController')

router.post('/', typeController.create)
router.get('/', typeController.getAll)
=======
const router = Router();

router.post('/')
router.get('/')
>>>>>>> 1f1c816c4cdadd1a8e3b24e2ab37a027940b12de

module.exports = router