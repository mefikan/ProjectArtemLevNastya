const Router = require(`express`)
<<<<<<< HEAD
const router = new Router();
const brandController = require('../controllers/brandController')


router.post('/', brandController.create)
router.get('/', brandController.getAll)
=======
const router = Router();

router.post('/')
router.get('/')
>>>>>>> 1f1c816c4cdadd1a8e3b24e2ab37a027940b12de

module.exports = router