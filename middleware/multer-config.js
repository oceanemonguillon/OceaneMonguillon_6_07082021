//import du package multer pour gérer les fichiers entrants dans les requêtes https
const multer = require('multer');

//différents types de formats d'images et ses equivalents
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//fonction qui indique a multer ou enregistrer les fichiers
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); //enleve les espaces et remplace par _
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension); //donne un timestamp a l'image date/heure/minutes/secondes/millisecondes...
  }
});

//Export de multer avec une constant storage et une indication specifiant que nous gerons seulement telechargements des fichiers d'images 
module.exports = multer({storage: storage}).single('image');