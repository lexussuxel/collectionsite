const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter')
const collectionRouter = require('./collectionRouter')
const itemRouter = require('./itemRouter')


router.use('/user', userRouter);
router.use('/item', itemRouter);
router.use('/collection', collectionRouter);



module.exports = router