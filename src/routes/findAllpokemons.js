//const Pokemon = require("../models/pokemon")
const models = require('../models/index')
//const Pokemon = require("../db/sequelize")

module.exports = (app) => app.get('/api/pokemons',(req,res) => {
    models.Pokemon.findAll()
    .then( pokemons=>{
    const message = 'La liste des pokemons a bien ete retourner'
    res.json({message,data: pokemons})
    }
    ).catch(error =>{
        const message = 'impossible de recuperer la liste des pokemons, Ressayer dans quelques instant'
        res.status(500).json({message, data :error})
    })
})