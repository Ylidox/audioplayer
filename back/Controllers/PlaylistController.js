const db = require('../db');

class PlaylistController{
    async addPlaylist(req, res){
        let {id} = req.user;
        let {name} = req.body;

        await db.query('insert into playlist (customer_id, name) values ($1, $2)', [id, name]);
        res.status(200).json({message: 'Добавлен плейлист'});
    }
    async addMusikToPlaylist(req, res){
        let {id} = req.user;
        let {playlist_id, musik_id} = req.params;
        await db.query('update musik set playlist_id=$1 where id=$2 and customer_id=$3', [playlist_id, musik_id, id]);
        res.json({message:'Музыка добавлена в плейлист'});
    }
    async getMusiksFromPlaylist(req, res){
        let {id} = req.user;
        let {playlist_id} = req.params;
        let musiks = await db.query('select * from musik where customer_id = $1 and playlist_id = $2', [id, playlist_id]);
        res.status(200).json(musiks.rows);
    }
    async deleteMusikFromPlaylist(req, res){
        let {id} = req.user;
        let {musik_id} = req.params;
        await db.query('update musik set playlist_id=$1 where customer_id=$2 and id=$3', [null, id, musik_id]);
        res.json({message:'Музыка удалена из плейлиста'});
    }
    async getPlaylistByMusik(req, res){
        let {id} = req.user;
        let {musik_id} = req.params;
        let playlist_id = await db.query('select playlist_id from musik where customer_id=$1 and id = $2', [id, musik_id]);
        playlist_id = playlist_id.rows[0].playlist_id;
        // console.log(playlist_id);
        if(playlist_id !== null){
            let playlist = await db.query('select * from playlist where customer_id=$1 and id=$2', [id, playlist_id]);
            res.status(200).json(playlist.rows[0]);
        }
        res.status(200).json(null);
    }
    async getPlaylistById(req, res){
        let {id} = req.user;
        let {playlist_id} = req.params;
        let playlist = await db.query('select * from playlist where customer_id=$1 and id = $2', [id, playlist_id]);

        res.status(200).json(playlist.rows[0]);
    }
    async getPlaylists(req, res){
        let {id} = req.user;
        let playlists = await db.query('select * from playlist where customer_id=$1', [id]);
        res.json(playlists.rows);
    }
    async deletePlaylist(req, res){
        let {id} = req.user;
        let {playlist_id} = req.params;
        await db.query('update musik set playlist_id=$1 where playlist_id=$2 and customer_id=$3', [null, playlist_id, id]);
        await db.query('delete from playlist where id = $1', [playlist_id]);
        res.json({message: `Плейлист ${playlist_id} удален`});
    }
}

module.exports = new PlaylistController();