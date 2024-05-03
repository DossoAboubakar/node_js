/* Authentification : Créer un modèle User avec Sequelize */
//JWT (etape 2)
//MISE EN PLACE DU MIDDLEWARE DE SECURITE AVEC JWT
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
  
module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization // c'est dans headers  que va transiter le Jeton JWT
  // que veut dire l'erreur 401?
  
  if(!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
    return res.status(401).json({ message })
  }
    
    const token = authorizationHeader.split(' ')[1]// ici le authorizationHeader = 'bearer token' // donc pour avoir le token on utilise la cle [1] 
    // car le contenu de authorization est  une chaine de caractere on peut l'utiliser comme un tableau
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => { //a cette ligne on verifie que le jeton est valide
    if(error) {
      const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
      return res.status(401).json({ message, data: error })
    }
  
    const userId = decodedToken.userId
    if (req.body.userId && req.body.userId !== userId) {
      const message = `L'identifiant de l'utilisateur est invalide.`
      res.status(401).json({ message })
    } else {
      next()//Autoriser desormais l'utilisateur a acceder a la ressource en question
    }
  })
}
//rdv dans les points de terminnaison dans lesquels ont veut activer l'authentification jwt ; pour cela , on export le module ci et on l'ajoute dans les parametres dans routes qu'on veut 
//veut bloquer l'acces avec JWT . Allons des a present dans le fichier findAllPokemon.js