const {Like, Comment} = require("../models/models")


class LikeController{

    async create(req, res){
        const {userId, collectionId} = req.body;
        const like = await Like.create({userId, collectionId});
        return res.json(like);
    }

    async deleteOne(req, res){
        const {id, user} = req.params;

        const a = await Like.destroy({where: {collectionId:id, userId:user}});
        res.json(a);
    }

    async getLikes(req, res){
        const id = req.params.id;
        const count = await Like.findAll({where: {collectionId: id}});
        res.json(count);
    }

}

module.exports= new LikeController()