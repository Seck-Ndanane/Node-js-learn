const express = require('express');

const router = express.Router();

const  auth = require('../middleware/auth');

const stuffCtr = require('../controllers/stuff');

const multer = require('../middleware/multer-config');
  
router.get('/', auth, stuffCtr.getAllStuff);

router.post('/', auth, multer, stuffCtr.createThing);// il est importyant de mettre multer apres auth sinon mm non authenfie on peut enregistrer un ficher dqns le serveur

router.get('/:id', auth, stuffCtr.getOneThing);

router.put('/:id', auth, multer, stuffCtr.modifyThing);

router.delete('/:id', auth, stuffCtr.deleteThing);




module.exports = router;