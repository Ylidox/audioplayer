const Router = require('express');
const router = new Router();
const userController = require('../Controllers/UserController');
const auth = require('../MiddleWares/auth');

// /user
router.get('/login', userController.login);
router.post('/registration', userController.registration);
router.put('/update', auth, userController.update);
router.delete('/delete', auth, userController.delete);

module.exports = router;