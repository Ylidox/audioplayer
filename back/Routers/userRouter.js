const Router = require('express');
const router = new Router();
const userController = require('../Controllers/UserController');
const auth = require('../Middlewares/auth');

// /user
router.post('/login', userController.login);
router.post('/registration', userController.registration);
router.put('/update', auth, userController.update);
router.delete('/delete', auth, userController.delete);

module.exports = router;