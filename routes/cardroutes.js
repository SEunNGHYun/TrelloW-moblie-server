const router = require('express').Router();
const controller = require('../controller/card');


router.get('/', controller.get);
router.post('/create', controller.create);
router.delete('/delete', controller.delete);
router.patch('/edit', controller.edit);

module.exports = router;