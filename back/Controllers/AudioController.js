const db = require('../db');


class AudioController{
    async addAudio(req, res){
        let file = req.files.file;
        let {id, login} = req.user;
        let {name, author} = req.body;
        if(!name) name = '';
        if(!author) author = '';
        let filePath = `/audio/${login}/${file.name}`;
        await file.mv(`${__dirname}/../..${filePath}`, (err) => {
            if(err){
                res.status(500).json({message:"Ошибка загрузки"});
                return;
            }
        });

        await db.query(
            `insert into musik (customer_id, path, name, author)
            values($1, $2, $3, $4)`, [id, file.name, name, author]);

        res.status(200).json({message:"Получили сообщение"})
    }
    async likeMusik(req, res){
        let {id} = req.user;
        let {musik_id, like} = req.body;
        await db.query('update musik set liked = $1 where id = $2 and customer_id = $3', [like, musik_id, id]);
        res.status(200).json({message:`Музыка ${musik_id}, liked: ${like}`});
    }
    async getAllMusiks(req, res){
        let {id, login} = req.user;
        let musiks = await db.query('select * from musik where customer_id = $1', [id]);
        res.status(200).json(musiks.rows);
    }
    async getLikedMusik(req, res){
        let {id} = req.user;
        let musiks = await db.query('select * from musik where customer_id = $1 and liked=$2', [id, true]);
        res.status(200).json(musiks.rows);
    }
    async changeMusik(req, res){
        let {id, login} = req.user;
        let musik_id = req.params.id;

        let {name, author} = req.body;
        if(name){
            await db.query('update musik set name = $1 where id = $2 and customer_id = $3', [name, musik_id, id]);
        }
        if(author){
            await db.query('update musik set author = $1 where id = $2 and customer_id = $3', [author, musik_id, id]);
        }
        res.status(200).json({message: 'Данные музыки изменены'});
    }
    async deleteMusik(req, res){
        let {id, login} = req.user;
        let musik_id = req.params.id;

        let musik = await db.query('select * from musik where id = $1 and customer_id = $2', [musik_id, id]);

        const fs = require('fs');

        const filePath = musik.rows[0].path;

        fs.unlink(`${__dirname}/../..${filePath}`, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        })
        await db.query('delete from musik where id=$1 and customer_id=$2', [musik_id, id]);

        res.status(200).json({message:'Музыка удалена'});
    }
}

module.exports = new AudioController();