//const Pokemon = require("../db/sequelize")
const models = require('../models/index')
const  auth = require('../auth/auth')



module.exports = (app) => {
    app.get('/api/pokemons/:id',auth, (req,res)=>{
        models.Pokemon.findByPk(req.params.id).then(
            pokemon =>{
                if(pokemon===null){
                    const message = 'le pokemon demander n\'exhiste pas'
                    return res.status(404).json({message})
                }
            message = `le pokemon  a bien ete  trouver`
            res.json({message,data:pokemon})
            }
        )
        .catch(error => { 
            const message = " le pokemon n\'a pas  pu etre recupere"
            res.status(500).json({message , data:error})
        } )
    })
}
