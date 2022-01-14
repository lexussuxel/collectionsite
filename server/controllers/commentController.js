const {Comment} = require('../models/models')
const ApiError = require('../error/ApiError')


class CommentController{
    async create(req, res){
        const {userId, collectionId, text} = req.body;
        const comment = await Comment.create({userId, collectionId, text});
        return res.json(comment);
    }
    async getAll(req, res){
        const comments = await Comment.findAll();
        return res.json(comments);
    }


}

module.exports = new CommentController()