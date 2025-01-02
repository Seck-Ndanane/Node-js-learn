
const  Thing = require('../models/thing');


exports.createThing=(req, res, next)=>{
  // ON envoit ici sous form form-data et non Json
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  delete thingObject._userId;
  const thing = new Thing({
    ...thingObject,
    userId: req.auth.userId,// On recupere ici le user Id a partir du token
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  thing.save()
    .then(() => res.status(201).json({message : 'Object enrefgistre avec succes'}))
    .catch(error => res.status(400).json({error}));
    
};

exports.modifyThing = (req, res, next) => {
  // regqrde si req.file existe dabord s'il existe on traite la new image sinon donnee entrante
  const thingObject = req.file ? {
    ...JSON.parse(req.body.thing),// tranforme un ibject stringfie en object JavaScript exploitable
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`// besoin de req.protocol et de req.get('host) connectes par '://' et suivis de req.file.filename pour reconstruire lurl 

  } : {...req.body};

  delete thingObject._userId;

  Thing.findOne({_id: req.params.id})
    .then((thing) =>{
      if(thing.userId != req.auth.userId){
        res.status(401).json({message: 'Not authorized'});
      }else{
        Thing.updateOne({_id: req.params.id}, {...thingObject, _id: req.params.id})
        .then(() => res.status(201).json({message: 'Object modifie avecc succes'}))
        .catch(error => res.status(400).json({error: error}));
      }
    })
    .catch((error) =>{
      res.status(400).json({error});
    });

    
};

exports.getOneThing = (req, res, next) => {
  //utilise la methode find de mongoose 
  Thing.findOne({_id: req.params.id})
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error: error}));
};
  
exports.deleteThing = (req, res, next) => {
  Thing.findOne({_id: req.params.id})
    .then(thing =>{
      if (thing.userId != req.auth.userId) {//verifier si le user connecte appartient aux donnes deleted
        res.status(401).json({message: 'Not Authorized'});
      } else {
        const filename = thing.imageUrl.split('/images/')[1];
        //le package fs expose des methodes pour interagir avec le systeme de fichier  du serveur
        fs.unlink(`images/${filename}`,() =>{//pour supprimer le fichier
          Thing.deleteOne({_id: req.params.id})
            .then(() => res.status(200).json({message : 'Object supprime avec succes'}))
            .catch(error => res.status(400).json({error: error}));
          });
      }
    })
    .catch(error => {
      res.status(500).json({error});
    })
  
};
  
exports.getAllStuff = (req, res, next) => {
  //utilise la methode find de mongoose
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));
};




/*exports.createThing=(req, res, next)=>{
  //On recoit ici sous format JSON
  const thing = new Thing({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  thing.save()
    .then(() => res.status(201).json({message : 'Object enrefgistre avec succes'}))
    .catch(error => res.status(400).json({error}));
    
};*/
  
  /* exports.put('/:id', (req, res, next) => {
    Thing.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
      .then(() => res.status(200).json({message: 'Object modifie avecc succes'}))
      .catch(error => res.status(400).json({error}))
  })*/
  

/*exports.modifyThing = (req, res, next) => {
  const thing = new Thing({
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId
  });
  Thing.updateOne({_id: req.params.id}, thing)
      .then(() => res.status(201).json({message: 'Object modifie avecc succes'}))
      .catch(error => res.status(400).json({error: error}))
};*/

/**
 * exports.deleteThing = (req, res, next) => {
  //utilise la methode find de mongoose
  Thing.deleteOne({_id: req.params.id})
    .then(things => res.status(200).json({message : 'Object supprime avec succes'}))
    .catch(error => res.status(400).json({error: error}));
};
  
 */