const Client = require('mysql-pro')
const db = new Client({
    mysql:{
        host: "localhost",
        port: 3306,
        database: "realgo",
        user: "root",
        password: "12345678"
    }
})
module.exports = db