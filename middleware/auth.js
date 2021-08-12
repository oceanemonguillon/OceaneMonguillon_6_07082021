//import du package json web token 
const jwt = require('jsonwebtoken');

//middleware qui permet de proteger les routes choisi et de verifier l'authentification
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];//récuperation du token 
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');//Décodage du token
    const userId = decodedToken.userId; //decodage token de l'utilisateur
    if (req.body.userId && req.body.userId !== userId) { 
      throw 'id utilisateur invalide';
    } else {
      next();
    }
  } catch {
    res.status(401).json({ //erreur pb d'authentification
      error: new Error('requete invalide!')
    });
  }
};