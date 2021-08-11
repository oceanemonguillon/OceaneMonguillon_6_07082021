//import de mongoose
const mongoose = require('mongoose');
//import du package unique validator pour avoir un seul utilisateur par email
const uniqueValidator = require('mongoose-unique-validator');


//Modèle attendu pour l'entrée des données
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//Ajout du plugin unique validator
userSchema.plugin(uniqueValidator);

//Export du modele 
module.exports = mongoose.model('User', userSchema);