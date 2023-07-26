const Router = require('express');
const router = new Router();
const playlistController = require('../Controllers/PlaylistController');
const auth = require('../Middlewares/auth');

router.post('/add', auth, playlistController.addPlaylist);

module.exports = router;