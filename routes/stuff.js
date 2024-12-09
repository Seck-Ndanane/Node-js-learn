const express = require('express');

const router = express.Router();

const  Thing = require('../models/thing');

const stuffCtr = require('../controllers/stuff');
  
router.get('/', stuffCtr.getAllStuff);

router.post('/', stuffCtr.createThing);

router.get('/:id', stuffCtr.getOneThing);

router.put('/:id', stuffCtr.modifyThing);

router.delete('/:id', stuffCtr.deleteThing);




module.exports = router;