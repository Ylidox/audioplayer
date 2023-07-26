const db = require('../db');

class PlaylistController{
    async addPlaylist(req, res){
        let {id, login} = req.user;
        let {name} = req.body;

        await db.query('insert into playlist (customer_id, name) values ($1, $2)', [id, name]);
        res.status(200).json({message: 'Добавлен плейлист'});
    }
}

module.exports = new PlaylistController();