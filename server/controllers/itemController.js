const {Item} = require('../models/models');
const ApiError = require('../error/ApiError');
const path = require('path');
const uuid = require('uuid');
const fs = require("fs");

class ItemController{
    async create(req, res, next){
        try{
        const {name, description} = req.body;
        const userId = req.user.id;
        const collectionId = req.params.id;
        console.log(userId, collectionId, name, description);
        let fileName;
        try{
            const {img} = req.files;
            fileName = uuid.v4() + ".jpg";
            await img.mv(path.resolve(__dirname,'..','static', fileName));}
        catch(e){

            fileName = "null";
        }

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

    async delete(req, res){
        const id = req.params.item;
        const item = await Item.findOne({where: {id}})
        if (item.img !== "null")
            fs.unlinkSync(path.join(__dirname, `../static/${item.img}`));
        await Item.destroy({where: {id}})

       return res.json();
    }
}

module.exports = new ItemController()