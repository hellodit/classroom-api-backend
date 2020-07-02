const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController')
const auth = require ('../middleware/auth')

router.post('/', userController.register);
router.post('/login', userController.login);
router.get('/index', userController.index);
router.get('/profile', auth, userController.profile);
module.exports = router