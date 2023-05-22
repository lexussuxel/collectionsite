const Router = require('express');
const router = new Router();
const commentController = require('../controllers/commentController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/:id', commentController.getAll);
router.delete('/:id',checkRole(['USER', 'ADMIN']), commentController.deleteOne);
router.post('/create', checkRole(['USER', 'ADMIN']),commentController.create)

module.exports = router