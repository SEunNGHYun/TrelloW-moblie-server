const router = require('express').Router();
const controller = require('../controller/checklist');


router.post('/:card_id', controller.create);
router.delete('/:checklist_id', controller.delete);
router.patch('/:checklist_id', controller.edit);

module.exports = router;