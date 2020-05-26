const router = require('express').Router();
const controller = require('../controller/container');


router.get('/:board_id', controller.get);
router.post('/:board_id', controller.create);
router.delete('/:container_id', controller.delete);
router.patch('/:container_id', controller.edit);

module.exports = router;