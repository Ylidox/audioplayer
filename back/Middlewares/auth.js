const {secret} = require('../config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization;
        if(!token){
            res.status(404).json({message:'Пользователь не авторизован'});
        }
        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;

        next();
    }
    catch(err){
        console.log(err);
        res.status(404).json({message:'Пользователь не авторизован'});
    }
}