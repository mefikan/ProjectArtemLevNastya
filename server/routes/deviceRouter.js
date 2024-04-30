const Router = require(`express`)
<<<<<<< HEAD
const router = new Router();
const deviceController = require('../controllers/deviceController')


router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
=======
const router = Router();

router.post('/')
router.get('/')
router.get('/:id')
>>>>>>> 1f1c816c4cdadd1a8e3b24e2ab37a027940b12de

module.exports = router