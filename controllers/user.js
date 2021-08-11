//import du package bcrypt pour crypter le mot de passe
const bcrypt = require('bcrypt');

//import du modele User
const User = require('../models/User');

//import du package jsonwebtoken pour créer des Token secure
const jwt = require('jsonwebtoken');

//fonction qui permettra de s'inscrire au site: de creer un nouvel utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)//passe 10 fois le mdp dans le systeme de hachage
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash   //  /!\ peut etre le pb d'apparition du mdp!!!!!!!!!!!!  
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

//fonction qui permettra de se connecter au site: de recuperer un utilisateur et ses données
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};