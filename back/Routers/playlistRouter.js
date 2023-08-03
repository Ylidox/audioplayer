const Router = require('express');
const router = new Router();
const playlistController = require('../Controllers/PlaylistController');
const auth = require('../Middlewares/auth');

// /list
router.post('/add', auth, playlistController.addPlaylist);
router.put('/add_musik/:playlist_id/:musik_id', auth, playlistController.addMusikToPlaylist);
router.get('/get_musiks/:playlist_id', auth, playlistController.getMusiksFromPlaylist);
router.delete('/delete_musik/:musik_id', auth, playlistController.deleteMusikFromPlaylist);
router.get('/get_playlist/:musik_id', auth, playlistController.getPlaylistByMusik);
router.get('/get_playlist_by_id/:playlist_id', auth, playlistController.getPlaylistById);
router.get('/get_playlists', auth, playlistController.getPlaylists);
router.delete('/delete_playlist/:playlist_id', auth, playlistController.deletePlaylist);

module.exports = router;