//import de mongoose
const mongoose = require('mongoose');

//Modèle attendu pour l'entrée des données
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false },
  dislikes: { type: Number, required: false },
  usersLiked: { type:["String <userId>"], required: false },
  usersDisliked: { type:["String <userId>"], required: false },
});

//Export du modele 
module.exports = mongoose.model('Sauce', sauceSchema);