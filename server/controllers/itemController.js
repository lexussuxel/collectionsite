const {Item} = require('../models/models');
const ApiError = require('../error/ApiError');
const path = require('path');
const uuid = require('uuid');

class ItemController{
    async create(req, res, next){
        try{
        const {name, description} = req.body;
        const userId = req.user.id;
        const collectionId = req.params.id;
        console.log(userId, collectionId, name, description);
        const {img} = req.files;
        let fileName = uuid.v4() + ".jpg"
        await img.mv(path.resolve(__dirname,'..','static', fileName));

        const item = await Item.create({name, description, collectionId, userId, img:fileName});

        return res.json(item);
        }catch (e){
            return next(ApiError.badRequest(e));
        }
    }
    async getAll(req, res){
        //const {collectionId} = req.query;
        const id = req.params.id
        const items = await Item.findAll({where: {collectionId: id}});

        return res.json(items);



    }
    async getOne(req, res){

    }
}

module.exports = new ItemController()