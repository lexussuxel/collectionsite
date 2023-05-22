const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter')
const collectionRouter = require('./collectionRouter')
const itemRouter = require('./itemRouter')
const likeRouter=require('./likeRouter')
const commentRouter = require('./commentRouter')

router.use('/user', userRouter);
router.use('/item', itemRouter);
router.use('/collection', collectionRouter);
router.use('/like', likeRouter);
router.use('/comment', commentRouter);



module.exports = router