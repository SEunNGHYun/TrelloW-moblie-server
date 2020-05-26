const router = require('express').Router();
const controller = require('../controller/user');

router.get('/', controller.userInfo); 
router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.patch('/', controller.edit);
router.delete('/', controller.delete);

module.exports = router;