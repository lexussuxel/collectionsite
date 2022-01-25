const ApiError = require("../error/ApiError");
const bcrypt = require('bcrypt');
const {User, Collection} = require('../models/models')
const {hash} = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config()

const generateJwt = (id, email, role, name) => {
    return jwt.sign(
        {id, email, role, name},
        `${process.env.SECRET_KEY}`,
        {expiresIn: '24h'});
};


class UserController{
    async registration(req, res, next){
        const {email, password, role, name} = req.body;
        if(!email || !password){
            return next(ApiError.badRequest("Incorrect email or password"));
        }
        var userName = name;
        if(!userName)
            userName = email;
        const candidate = await User.findOne({where: {email}});
        if(candidate){
            return next(ApiError.badRequest("User with such name exists!"));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, password: hashPassword, role, name: userName})
        const token= generateJwt(user.id, user.email, user.role, user.name);
        return res.json(token);
    }

    async login(req, res, next){
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if (!user) {
            return next(ApiError.internal("User is not found........."));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword){
            return next(ApiError.internal("Incorrect password!!!!"));
        }
        const token = generateJwt(user.id, user.email, user.role, user.name);
        return res.json(token);

    }
    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.name);
        return res.json(token);
    }

    async findById(req, res, next){
        const id = req.params.id;
        const user = await User.findOne({where: {id}});
        if (!user) {
            return next(ApiError.internal("User is not found........."));
        }
        return res.json(user);
    }

}

module.exports = new UserController()