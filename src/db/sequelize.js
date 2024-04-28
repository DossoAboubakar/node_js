const pokemonModel = require('../models/pokemon');
const { Sequelize, DataTypes } = require('sequelize');
const pokemons = require('./mock-pokemon');

const sequelize = new Sequelize({
  database: 'pokedex',
  dialect: 'mysql',
  username: 'root',
  password: 'root',
  host: 'localhost',
});
// Vérification de la connexion à la base de données
const Pokemon = pokemonModel(sequelize, DataTypes);
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  };

  
//Fonction pour initialiser la base de données
const initDb = () => {
  return sequelize.sync({force:true}).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      })
      .then(pokemon => console.log(pokemon.toJSON()))
    })
  })
}
  
//Export des fonctions ou objets nécessaires à l'extérieur du module
module.exports = {
  Pokemon,initDb
};

// Appel de la fonction d'initialisation de la base de données