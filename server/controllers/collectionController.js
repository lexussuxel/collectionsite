const {Collection} = require('../models/models')
const ApiError = require('../error/ApiError')
const itemController = require('./itemController')
const {Item} = require('../models/models')
const jwt = require("jsonwebtoken");


class CollectionController{
    async create(req, res){
        // const token = req.headers.authorization.split(' ')[1];
        // const decoded = jwt.verify(token, process.env.SECRET_KEY);
        //console.log(req.user.id);
        const {name, description} = req.body;
        const collection = await Collection.create({name, description, userId: req.user.id});
        return res.json(collection);
    }
    async getAll(req, res){
        const collections = await Collection.findAll();
        return res.json(collections);
    }
    async getOne(req, res){
        const id = Number(req.params.id);
        const  collection = await Collection.findOne({where: {id}});
        const a = collection.userId;
        console.log(a);
        //res.json(collection);
        // const items = itemController.getAll(req, res);
        // console.log(items);

        return res.json(collection);

    }

}

module.exports = new CollectionController()