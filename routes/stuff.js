const express = require('express');

const router = express.Router();

const  auth = require('../middleware/auth');

const stuffCtr = require('../controllers/stuff');
  
router.get('/', auth, stuffCtr.getAllStuff);

router.post('/', auth, stuffCtr.createThing);

router.get('/:id', auth, stuffCtr.getOneThing);

router.put('/:id', auth, stuffCtr.modifyThing);

router.delete('/:id', auth, stuffCtr.deleteThing);




module.exports = router;