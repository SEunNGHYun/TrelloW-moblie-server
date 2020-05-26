const router = require('express').Router();
const controller = require('../controller/board');


router.get('/', controller.list);
router.post('/', controller.create);
router.delete('/:board_id', controller.delete);
router.patch('/:board_id', controller.edit);

module.exports = router;