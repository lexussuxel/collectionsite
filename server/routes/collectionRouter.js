const Router = require('express');
const router = new Router();
const collectionController = require('../controllers/collectionController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('USER'), collectionController.create);
router.get('/', collectionController.getAll );
router.get('/:id', collectionController.getOne);


module.exports = router