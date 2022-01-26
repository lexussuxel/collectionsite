const {Sequelize} = require("sequelize");

require('dotenv').config({path: __dirname + '/.env'})

const db = process.env.SQL_DATABASE
const user = process.env.SQL_USER
const password = process.env.SQL_PASSWORD
const host = process.env.SQL_HOST
const port = process.env.SQL_PORT

console.log(user)

module.exports = new Sequelize(
    // "userdb2", "alex", "Lola_1234_Kola", {
    //     dialect: "mysql",
    //     host: "localhost",
    //     port: "3306"
    // }
    db, user, password, {
        dialect: "mysql",
        host: host,
        port: port
    }
);