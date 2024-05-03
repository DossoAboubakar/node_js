/* Authentification : Créer un modèle User avec Sequelize */
const { User } = require('../db/sequelize')
const privateKey = require('../auth/private_key' )
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// on active pas l'authentification jwt sur ce endpoint  ...car c'est le debut , il faut donc lui permette d'activer les autres processus.
//on dit que c'est une route public. elle ne necessite pas de reponse JWT pour retourner une reponse .
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
  
    User.findOne(
        { where: { username: req.body.username } }).then(user => {
            if(!user){
                const message = 'l\' utilisateur demander n\'existe pas '
                return res.status(400).json({message:message})
            }
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if(!isPasswordValid) {
            const message = 'Le mot saisi  est incorrect , veuillez ressayer un autre';
            return res.status(401).json({ message })
          }
          //JWT (etape 1)
          //On va generer un jeton avec jwt 
          // voir le fichier auth.js pour l'etape 2
          const token = jwt.sign(
            { userId : user.id},
            privateKey,
            { expiresIn:'24h' }
          )
        if(isPasswordValid) {
          const message = `L'utilisateur a été connecté avec succès`;
          return res.json({ message, data: user ,token })
        }
      })
    }).catch(error=>{
        const message = 'l\'utilisateur n\'a pas pu etre connecté'
       return  res.status(500).json({message , data: error})
    }
        )

  })
}