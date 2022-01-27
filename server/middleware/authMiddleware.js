const jwt = require('jsonwebtoken')
require('dotenv').config({path: __dirname + '../.env'})

module.exports = function (req, res, next) {
    console.log("123")
    if (req.method === "OPTIONS") {
        next()
    }
    console.log(__dirname + '../.env')
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token,`${process.env.SECRET_KEY}`)
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
};