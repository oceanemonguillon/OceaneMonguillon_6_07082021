//Const qui importe le package Express pour créer un serveur plus rapidement.
const express = require('express');
//const pour ajouter le package de bodyParser qui permettra de lire le contenu en json
const bodyParser = require('body-parser');
//const pour ajouter le package de mongoose qui permettra le lien avec la bdd/le cluster mongoDB Atlas
const mongoose = require('mongoose');
//import du router de sauces.js
const saucesRoutes = require('./routes/sauce');
//import du router de user.js
const userRoutes = require('./routes/user');
//const pour importer le chemin des fichiers images 
const path = require('path');

//Connexion a mongoDB Atlas, donc API connectée a la bdd
mongoose.connect('mongodb+srv://oceane:oceane_01@cluster0.nta22.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

//autorise la discution entre plusieurs serveurs, les methodes definies et l'utilisation des headers
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
 });

//Fonction pour toutes requetes envoyées a images, on sert de manière statique le dossier images
app.use('/images', express.static(path.join(__dirname, 'images')));
//fonction qui défini la methode json du bodyparser, le corps envoyé sera traduit en json
app.use(bodyParser.json());
//Début des url de sauces.js lié au fichier en question 
app.use('/api/sauces', saucesRoutes);
//Début des url de user.js lié au fichier en question 
app.use('/api/auth', userRoutes);


//Export de l'application express pour y avoir acces depuis les autres fichiers (serveur node par exemple)
module.exports = app;