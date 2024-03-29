const Router = require('express');
const router = new Router();
const itemController = require('../controllers/itemController');
const checkRole = require('../middleware/checkRoleMiddleware');
const checkId = require('../middleware/checkUserIdMiddleware')

router.post('/:id/create', checkId(), itemController.create);
router.get('/:id/items',itemController.getAll);
router.delete('/:id/delete/:item', checkId(), itemController.delete)
//router.get('/:id/items',itemController.getAll);
//router.get('/:id', itemController.getOne);
router.get('/last', itemController.getLast);

module.exports = router;