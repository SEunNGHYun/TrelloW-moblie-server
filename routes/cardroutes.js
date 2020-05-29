const router = require('express').Router();
const controller = require('../controller/card');


router.get('/:card_id', controller.get);
router.get('/list/:container_id',controller.list);
router.post('/:container_id', controller.create);
router.delete('/:card_id', controller.delete);
router.patch('/:card_id', controller.edit);

module.exports = router;