const router = require('express').Router();
const controller = require('../controller/card');


router.get('/:container_id', controller.get);
router.post('/:container_id', controller.create);
router.delete('/:card_id', controller.delete);
router.patch('/:card_id', controller.edit);

module.exports = router;