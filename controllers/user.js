//const { hash } = require("bcrypt");
//const { json } = require("express");
const  User = require('../models/User');


exports.signup = (req, res, next) =>{
    //ici ca demander de saler le mot de passe 10 fois plus la valuer est grande plus l'execution de la fonction sera longue
    // plus ce=a devient plus securiser
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message :' Utilisateur cree avec succes!'}))
                .catch(error => res.status(400)>json({error}));
        })
        .catch(error => res.status(500).json({error}));
};



exports.login = (req, res, next) =>{
    User.findOne({email : req.body.email})
        .then(user => {
            if(!user){
                return res.status(401).json({ message : 'Email or Password incorrect!!'});
            }
            //compare le hash du pwd entrer avec celui de la base
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid){
                        return res.status(401).json({ message : 'Email or Password incorrect!!'})
                    }
                    res.status(200).json({
                        userId : user._id,
                        token : 'TOKEN'
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
    
};