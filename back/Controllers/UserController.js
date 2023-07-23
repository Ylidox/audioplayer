const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {secret} = require('../config');

const generateToken = (id, login) => {
    const payload = {id, login}
    return jwt.sign(payload, secret, {expiresIn: '24h'});
}

class UserController{
    async login(req, res){
        let {login, password} = req.body;
        let user = await db.query('select * from customer where login=$1', [login]);
        if(!user.rows.length) {
            res.status(404).json({message:"Пользователя не существует"});
            return;
        }
        let hashPassword = user.rows[0].password;
        if(!bcrypt.compareSync(password, hashPassword)){
            res.status(404).json({message:"Пароль не верен"});
            return;
        }
        const token = generateToken(user.rows[0].id, login);
        res.status(200).json({token});
    }
    async registration(req, res){
        let {login, password} = req.body;
        if(!login) {
            res.status(404).json({message:"Не найден логин"});
            return;
        }
        if(!password) {
            res.status(404).json({message:"Не найден пароль"});
            return;
        }
        let customer = await db.query('select * from customer where customer.login = $1', [login]);
        if(customer.rows.length){
            res.status(404).json({message:"Пользователь уже существует"});
            return;
        }
        const hashPassword = bcrypt.hashSync(password, 5);

        await db.query(`insert into customer (login, password) values ($1,$2)`, [login, hashPassword]);

        let fs = require('fs');
        fs.mkdir(`../audio/${login}`, err => {
            if(err) console.log(err); // не удалось создать папку
            console.log('Папка успешно создана');
        });

        let user = await db.query('select * from customer where login = $1', [login]);
        
        const token = generateToken(user.rows[0].id, login);
        res.status(200).json({token});
    }
    async update(req, res){
        let {id} = req.user;
        let {login, password} = req.body;
        if(password){
            const hashPassword = bcrypt.hashSync(password, 5);
            await db.query(`update customer set password = $1 where id = $2`, [hashPassword, id]);
        }
        if(login){
            const fs = require('fs');

            let oldLogin = await db.query('select * from customer where id = $1', [id]);

            // await fs.rename(`../audio/${oldLogin.rows[0].login}`, `../audio/${login}`, (err) => {
            //     if (err) console.error(err);
            //     else console.log('Папка успешно переименована');
            // });
            await db.query(`update customer set login = $1 where id = $2`, [login, id]);
        }
        const token = generateToken(id, login);
        res.status(200).json({token});
    }
    async delete(req, res){
        let {id, login} = req.user;

        let fs = require('fs');
        fs.rmdir(`../audio/${login}`, err => {
            if(err) console.log(err); // не удалось удалить папку
            console.log('Папка успешно удалена');
        });

        await db.query(`delete from customer where id = $1`, [id]);
        res.status(200).json({message:"Пользователь удален"});
    }
}

module.exports = new UserController();