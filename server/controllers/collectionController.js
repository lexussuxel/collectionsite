const {Collection, Item, Like, Comment} = require('../models/models')
const ApiError = require('../error/ApiError')

const uuid = require("uuid");
const path = require("path");


class CollectionController{
    async create(req, res){
        // const token = req.headers.authorization.split(' ')[1];
        // const decoded = jwt.verify(token, process.env.SECRET_KEY);
        //console.log(req.user.id);
        const {name, description, addComments, privatee, author, userId } = req.body;
        //const {img} = req.files;
        let fileName = uuid.v4() + ".jpg"
      //  await img.mv(path.resolve(__dirname,'..','static', fileName));
        const collection = await Collection.create({name, description, author, /*img:fileName,*/ addComments, private: privatee, userId});
        return res.json(collection);
    }
    async getAll(req, res){
        const collections = await Collection.findAll();
        return res.json(collections);
    }
    async getOne(req, res){
        const id = req.params.id;
        const  collection = await Collection.findOne({where: {id}});
        //res.json(collection);
        // const items = itemController.getAll(req, res);
        // console.log(items);

        return res.json(collection);
    }
    async getUserCollections(req, res){
        const id = Number(req.params.id);
        const collections = await Collection.findAll({where: {userId: id}});
        return res.json(collections);
    }

    async delete(req, res){
        const id = req.params.id;
        const collection = await Collection.findOne({where: {id}});
        if (!collection){
            return res.status(400).json({message:"No collection to delete!"});
        }
        const collections = await Collection.destroy({where: {id}});
        await Item.destroy({where: {collectionId: id}});
        await Like.destroy({where: {collectionId: id}});
        await Comment.destroy({where: {collectionId: id}});
        res.json(collections);
    }

}

module.exports = new CollectionController()