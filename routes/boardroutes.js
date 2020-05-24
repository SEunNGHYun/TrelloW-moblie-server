const router = require('express').Router();
const controller = require('../controller/board');


router.get('/', controller.get);
router.get('/list', controller.list);
router.post('/create', controller.create);
router.delete('/delete/:id', controller.delete);
router.patch('/edit/:id', controller.edit);

module.exports = router;