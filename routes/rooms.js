const express = require('express');
const router = express.Router({mergeParams:true}); 
const roomController = require('../controllers/RoomController');
const auth = require('../middleware/auth'); 

router.post('/', auth, roomController.create);
router.get('/:id', auth, roomController.index);
router.patch('/:id', auth, roomController.edit);
router.delete('/:id', auth, roomController.destroy);

module.exports = router;
