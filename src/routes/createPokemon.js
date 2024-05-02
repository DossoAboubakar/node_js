//const Pokemon = require("../db/sequelize")
const models = require("../models/index")
const  auth = require('../auth/auth')
const { ValidationError , UniqueConstraintError} = require("sequelize");

module.exports = (app) => {
    app.post('/api/pokemons',auth, (req,res)=>{ //il faut juste savoir que express autorise de passer un middleware comme deuxieme paramatre d'une route
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
            if(error instanceof UniqueConstraintError){
                return res.status(400).json({message:error.message, data:error})
            }
            const message = " le pokemon n\'a pas  pu etre creer, ressayer plus tard"
            res.status(500).json({message , data:error})
        } )
    })
} 