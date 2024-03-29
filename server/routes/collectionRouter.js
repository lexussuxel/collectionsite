const Router = require('express');
const router = new Router();
const collectionController = require('../controllers/collectionController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole(['USER', 'ADMIN']), collectionController.create);
router.get('/user/:id', collectionController.getUserCollections);
router.get('/all', collectionController.getAll );
router.get('/:id', collectionController.getOne);
router.delete('/:id', collectionController.delete);
router.post('/:id', checkRole(['USER', 'ADMIN']),collectionController.updateCollection)
router.get('/biggest/big', collectionController.getBiggest)

module.exports = router