//const pour importer le modèle de données crée dans sauce
const Sauce = require('../models/Sauce');
//import du package fs (filesystem)
const fs = require('fs');

//création de la fonction Créer un objet contenu dans les routes sauce.js
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;// suppression de l'id généré automatiquement et envoyé par le front-end. 
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

//création de la fonction modifier un objet contenu dans les routes sauce.js
exports.modifySauce = (req, res, next) => {
  let sauceObject = {};
  req.file ? ( //Si la modification contient une image alors on utilise ? (ternaire) comme condition.
    Sauce.findOne({_id: req.params.id})
      .then((sauce) => {//Suppression de l'ancienne image du serveur
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlinkSync(`images/${filename}`)
      }),
    sauceObject = {//Modification des données et ajout de la nouvelle image
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    }
  ) : (sauceObject = {...req.body})// Si la modification ne contient pas de nouvelle image
  
  Sauce.updateOne({_id: req.params.id}, {...sauceObject,_id: req.params.id})//On applique les paramètre de sauceObject pour modifier la sauce
    .then(() => res.status(200).json({message: 'Sauce modifiée !'}))
    .catch((error) => res.status(400).json({error}))
}


//création de la fonction supprimer un objet contenu dans les routes sauce.js
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};


//création de la fonction trouver UN objet, contenu dans les routes sauce.js
exports.findOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};


//création de la fonction trouver TOUT les objets, contenu dans les routes sauce.js
exports.findAllSauces = (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
};


// création de la fonction liker et disliker, contenu dans les routes sauce.js
exports.likeDislike = (req, res, next) => {
  //Récuperation du like
  let like = req.body.like
  //userID
  let userId = req.body.userId
  //id sauce
  let sauceId = req.params.id

  if (like === 1) { //Si on like
    Sauce.updateOne({_id: sauceId},{$push: {usersLiked: userId}, $inc: {likes: +1}})//On push l'id de l'utilisateur et on incrémente le compteur de like de 1
      .then(() => res.status(200).json({message: 'like ajouté !'}))
      .catch((error) => res.status(400).json({error}))
  }
  if (like === -1) {//Si on dislike
    Sauce.updateOne({_id: sauceId}, {$push: {usersDisliked: userId},$inc: {dislikes: +1}})//On push l'id de l'utilisateur et on incrémente le compteur de dislike de 1
      .then(() => res.status(200).json({message: 'Dislike ajouté !'}))
      .catch((error) => res.status(400).json({error}))
  }
  if (like === 0) { //Si on annule un like ou un dislike
    Sauce.findOne({_id: sauceId})
      .then((sauce) => {
        if (sauce.usersLiked.includes(userId)) { //Si on annule un like
          Sauce.updateOne({_id: sauceId}, {$pull: {usersLiked: userId},$inc: {likes: -1}})//On pull l'id de l'utilisateur et on incrémente le compteur de like de -1
            .then(() => res.status(200).json({message: 'Like retiré !'}))
            .catch((error) => res.status(400).json({error}))
        }
        if (sauce.usersDisliked.includes(userId)) { // Si on annule un dislike
          Sauce.updateOne({_id: sauceId}, {$pull: {usersDisliked: userId},$inc: {dislikes: -1}})//On pull l'id de l'utilisateur et on incrémente le compteur de dislike de -1
            .then(() => res.status(200).json({message: 'Dislike retiré !'}))
            .catch((error) => res.status(400).json({error}))
        }
      })
      .catch((error) => res.status(404).json({error}))
  }
}