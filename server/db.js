const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME, //название бд
    process.env.DB_USER, //пользователь бд
    process.env.DB_PASSWORD, //Пароль бд
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)