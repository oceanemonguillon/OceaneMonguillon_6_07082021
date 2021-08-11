//----------------- IMPORTS -------------//

//import d'express
const express = require('express');
//création du router 
const router = express.Router();
//import du controller user.js
const userCtrl = require('../controllers/user');


//----------------- ROUTES -------------//

//fonction permettant de s'inscrire sur l'app
router.post('/signup', userCtrl.signup);
//fonction permettant de se connecter sur l'app
router.post('/login', userCtrl.login);


//----------------- EXPORTS -------------//

//export du router
module.exports = router;