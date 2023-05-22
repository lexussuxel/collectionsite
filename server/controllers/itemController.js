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
            console.log("ddddddddd")
            const {img} = req.files;
           // console.log(img)
            fileName = uuid.v4() + ".jpg";
            console.log("aaaaaaaaa")
            console.log(path.resolve(__dirname,'..','static'))
            await img.mv(path.resolve(__dirname,'..','static', fileName), (e)=> console.log(e));
            console.log("cccccccccccccccc")
        }
        catch(e){

            fileName = "null";
        }

        const item = await Item.create({name, description, collectionId, userId, img:fileName});
        
        return res.json(item);
        }catch (e){
            console.log(e);
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

    async getLast(req, res){
        console.log("bbbbb b bb b b")
        const items = await Item.findAll({
            limit: 3,
            
            order: [ [ 'createdAt', 'DESC' ]]})
        return res.json(items)
    }
}

module.exports = new ItemController()