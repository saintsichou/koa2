const jwt = require('jsonwebtoken');
const cert = 'realgo';

module.exports = (userinfo) =>{
    const token = jwt.sign({
        user: userinfo.user_name,
        id: userinfo.id
    }, cert, { expiresIn: '1h' })
    return token;
}