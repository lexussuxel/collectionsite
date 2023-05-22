const {Collection, Item, Like, Comment} = require('../models/models')
const ApiError = require('../error/ApiError')
const sequelize = require("../db")
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
        return res.json();
        //res.json(collections);
    }
    
    async updateCollection(req, res){
        const id = req.params.id;
        const {name, description, addComments, privatee,} = req.body;
        const collection = await Collection.update( {name, description, addComments, private: privatee}, {where: {id}})
        return res.json();
    }

    async getBiggest(req, res){
        console.log("aaaaaaaaa afsge faef arf erger gerf ergerg ")
        const items = await Item.findAll({
            attributes: [
              "collectionId",
              [sequelize.fn("COUNT", sequelize.col("collectionId")), "count"],
            ],
            group: "collectionId",
          })
        console.log(items[0].getDataValue("count"))
        const filteredItems = items.sort((i, k)=> k.getDataValue("count") - i.getDataValue("count") )
        console.log(filteredItems)

        const collection = await Collection.findAll({where: {id:filteredItems[0].getDataValue('collectionId')}})
        return res.json(collection)
    }

}

module.exports = new CollectionController()