const {Comment} = require('../models/models')
const ApiError = require('../error/ApiError')


class CommentController{
    async create(req, res){
        const {userId, itemId, text} = req.body;
        const comment = await Comment.create({userId, collectionId, text});
        return res.json(comment);
    }
    async getAll(req, res){
        const comments = await Comment.findAll();
        return res.json(comments);
    }
    async deleteOne(req, res){

    }


}

module.exports = new CommentController()