const jwt = require('jsonwebtoken');
const cert = 'realgo'

module.exports = (tokens) => {
    if(tokens){
        let toke = tokens;
        try {
            let decode = jwt.verify(toke,cert)
            return decode
        }catch(err){
            console.log(err)
        }
    }else {
        console.log('error tokens')
    }
}