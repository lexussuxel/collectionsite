const {Sequelize} = require("sequelize");

module.exports = new Sequelize(
    "userdb2", "alex", "Lola_1234_Kola", {
        dialect: "mysql",
        host: "localhost",
        port: "3306"
    }
);