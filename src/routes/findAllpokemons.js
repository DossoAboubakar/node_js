//const Pokemon = require("../models/pokemon")
//const Pokemon = require("../db/sequelize")
//ces deux methodes ci dessus ne passeront pas.Il faut les remplacer par celui du bas const "models = require("../models/index")"
const models = require("../models/index");
const { Op } = require("sequelize");
const  auth = require('../auth/auth')


module.exports = (app) =>
  app.get("/api/pokemons", auth, (req, res) => { //on a ajouter auth ici afin d'activer l'authentification  jwt avec le middleware auth
    if (req.query.name) {
      const name = req.query.name; 
      const limit = +req.query.name||5// name ici n'est pas dans l'url mais c'est un parametre de requette http. on peut donc l'avoir ainsi "req.query.name;"
      //models.Pokemon.findAll({ where: { name: name } }).then((pokemons)=>{...}// cette methode ne permettait de chercher obligatoirement un
      //pokemon avec son nom exact , c'est pourquoi on va passer avec l'utilisation de l'operateur sequelize appele "Op" qu'on a impporter plus haut
      //avec lui , on pourra chercher un pokemon qu'avec juste l'initial de son nom . Exemple: Bull au lieu Bullbizarre

      //   return models.Pokemon.findAll({
      //     where: {
      //       // name est le parametre de requette
      //       name: {
      //         //[Op.eq]: name, //c'est le critere de recherche , il fait exactement la meme chose que precedent
      //         [Op.like]: `%${name}%`,//on pourra chercher un pokemon qu'avec juste l'initial de son nom
      //         // `%${name}%`: on recherche un pokemon qui contient le terme de recherche
      //         // `${name}%`: on recherche un pokemon  commencant par le terme de recherche
      //         // `%${name}`: on recherche un pokemon qiu se termine par le terme de recherche
      //       },
      //     },
      //     limit:5//limiter le nombre de resultat de recherche a 5
      //   }).then((pokemons) => {
      //     const message = `il y a ${pokemons.length} correspodant au terme de recherche`;
      //     res.json({ message, data: pokemons });
      //   });
      // Maintenant puisque nous avons limiter le nombre de pokemon disponible pour un terme de recherche , il serait alors quand meme interressant
      //de signer aux consommateurs de notre api le nombre total reel de pokemon existant dans la base de doonne et que ce n'est le nombre limite defini.
      //pour cela , nous allons remplacer le code precedant en remplacant findAll par findAndCountAll et quelques petites modifications.voir le code suivant:
      if (name.length<2){
        const message = 'le terme de recherche doit contenir au moins 2 caracteres '
        return res.status(400).json({message:message})
      }
      return models.Pokemon.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        //limit: 5,
        limit: limit,
        
        
        //nous pouvons aussi ordonner les resultats par ordre (croissant ou decroissant): voir ce dessous
        order:['name'] //ou order:['name,'ASC'] pour ordre croissant
        //order:['name','DESC'] pour ordre decroissant
        //REMARQUE: nous avons ajouter aussi  order:['name'] dans le findAll() au cas ou on aimerait avoir la liste complete des pokemons

      }).then(({count, rows}) => {
        const message = `il y a ${count} correspodant au terme de recherche ${name} mais nous n'en donnerons que 5`;
        res.json({ message, data: rows });
      });
    } else {
      models.Pokemon.findAll({order:['name']})
        .then((pokemons) => {
          const message = "La liste des pokemons a bien ete retourner";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message =
            "impossible de recuperer la liste des pokemons, Ressayer dans quelques instant";
          res.status(500).json({ message, data: error });
        });
    }
  });
