
const  Thing = require('../models/thing');


exports.createThing=(req, res, next)=>{
  /*delete req.body._id;*/
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
    
};
  
  /* exports.put('/:id', (req, res, next) => {
    Thing.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
      .then(() => res.status(200).json({message: 'Object modifie avecc succes'}))
      .catch(error => res.status(400).json({error}))
  })*/
  
exports.modifyThing = (req, res, next) => {
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
};

exports.getOneThing = (req, res, next) => {
  //utilise la methode find de mongoose 
  Thing.findOne({_id: req.params.id})
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error: error}));
};
  
exports.deleteThing = (req, res, next) => {
  //utilise la methode find de mongoose
  Thing.deleteOne({_id: req.params.id})
    .then(things => res.status(200).json({message : 'Object supprime avec succes'}))
    .catch(error => res.status(400).json({error: error}));
};
  
exports.getAllStuff = (req, res, next) => {
  //utilise la methode find de mongoose
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));
};
