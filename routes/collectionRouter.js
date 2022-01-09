const Router = require('express');
const router = new Router();
const collectionController = require('../controllers/collectionController');

router.post('/', collectionController.create);
router.get('/p', collectionController.getAll);
router.get('/:id');


module.exports = router