const express = require('express');
const router = express.Router(); 
const roomController = require('../controllers/RoomController');
const auth = require('../middleware/auth'); 

router.post('/', auth, roomController.create);
router.get('/:id', auth, roomController.index);
router.put('/:id', auth, roomController.edit);
router.delete('/:id', auth, roomController.destroy);

module.exports = router;
