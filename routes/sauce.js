//----------------- IMPORTS -------------//

//import d'express
const express = require('express');
//création du router
const router = express.Router();
//import du controller sauce
const saucectrl = require('../controllers/sauce');
//import du fichier auth, middleware
const auth = require('../middleware/auth');
//import du multer, middleware 
const multer = require('../middleware/multer-config');

//----------------- ROUTES -------------//

//Fonction route post, permet de capturer l'envoie de l'utilisateur sur l'url choisi et de lui retourner qqchose
router.post('/', auth, multer, saucectrl.createSauce); 
//fonction permettant de modifier un objet dans l'API grace a une requete PUT
router.put('/:id', auth, multer, saucectrl.modifySauce);  
//fonction permettant de supprimer un objet dans l'API grace a une requete DELETE 
router.delete('/:id', auth, saucectrl.deleteSauce);  
//Fonction qui sert a récuperer les infos d'un seul objet grace a son id
router.get('/:id', auth, saucectrl.findOneSauce); 
//Fonction route get, permet de créer l'API, d'inserer les objets a l'interieur de celle-ci sur l'url choisi, et de le renvoyer en format json.
router.get('/', auth, saucectrl.findAllSauces);
// Route qui permet de gérer les likes des sauces
// Définit le statut "j'aime" pour userID fourni. Si j'aime = 1,l'utilisateur aime la sauce. Si j'aime = 0,l'utilisateur annule ce qu'il aime ou ce qu'il n'aime pas. Si j'aime =-1, l'utilisateur n'aime pas la sauce.L'identifiant de l'utilisateur doit être ajouté ou supprimé du tableau approprié, engardant une trace de ses préférences et en l'empêchant d'aimer ou de ne pas aimer la même sauce plusieurs fois. Nombre total de "j'aime" et de "je n'aime pas" à mettre à jour avec chaque "j'aime".
router.post('/:id/like', auth, saucectrl.likeDislike)
  

//----------------- EXPORTS -------------//

//export du router 
module.exports = router;