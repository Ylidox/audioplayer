const Router = require('express');
const router = new Router();
const audioController = require('../Controllers/AudioController');
const auth = require('../Middlewares/auth');

// /audio
router.post('/add', auth, audioController.addAudio);
router.get('/get_all', auth, audioController.getAllMusiks);
router.put('/change/:id', auth, audioController.changeMusik);
router.delete('/delete/:id', auth, audioController.deleteMusik)

module.exports = router;