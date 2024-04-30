const Router = require(`express`)
<<<<<<< HEAD
const router = new Router();
=======
const router = Router();
>>>>>>> 1f1c816c4cdadd1a8e3b24e2ab37a027940b12de
const userController = require('../controllers/userController')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', userController.check)

module.exports = router