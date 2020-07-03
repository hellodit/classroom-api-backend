const express = require('express');
const router = express.Router({mergeParams:true}); 
const materialController = require('../controllers/MaterialController'); 
const auth = require('../middleware/auth'); 

router.get('/', auth, materialController.index); 
router.post('/', auth, materialController.craete); 

module.exports = router; 
