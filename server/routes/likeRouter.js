const Router = require('express');
const router = new Router();
const likeController = require('../controllers/likeController');
const checkId = require('../middleware/checkUserIdMiddleware')

router.post('/:id/create', checkId(), likeController.create);
router.get('/:id', likeController.getLikes);
router.delete('/:id/delete/:user',checkId(), likeController.deleteOne);

module.exports = router;