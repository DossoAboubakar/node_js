//const Pokemon = require("../db/sequelize")
const models = require("../models/index")
const { ValidationError } = require("sequelize");

module.exports = (app) => {
    app.post('/api/pokemons', (req,res)=>{
        models.Pokemon.create(req.body).then(
            pokemon =>{
            message = `le pokemon ${req.body.name} a bien ete ajouter a la collection`
            res.json({message,data:pokemon})
            }
             
        )
        .catch(error => { 
            if(error instanceof ValidationError){
                return res.status(400).json({message:error.message, data:error})
            }
            const message = " le pokemon n\'a pas  pu etre creer, ressayer plus tard"
            res.status(500).json({message , data:error})
        } )
    })
} 