const models = require("../models/index");
const  auth = require('../auth/auth')

// module.exports = (app) => app.delete('/api/pokemons:id',(req,res) => {
//     const id = +req.params.id
//         models.Pokemon.destroy({
//             where: {id: id}
//         }).then( _=>{
//                 const message = `Le pokemon numero ${pokemonDeleted.id}  a bien ete supprimer`
//                 res.json({message,data: pokemonDeleted})
//             } )
//     })
///REECRITURE DU CODE PRECDENT
module.exports = (app) =>
  app.delete("/api/pokemons/:id", auth ,(req, res) => {
    const id = req.params.id;
    models.Pokemon.findByPk(id).then((pokemon) => {
      if (pokemon === null) {
        const message =
          "Le Pokemon n'existe pas.Ressayer avec un autre identifiant";
        return res.status(404).json({ message });
        //mettre return a  une ligne comme ca dans la boucle if  va empecher l'execution du code qui vient juste apres la boucle if
      }
      const pokemonDeleted = pokemon;
      models.Pokemon.destroy({
        where: { id: pokemon.id },
      })
        .then((_) => {
          const message = `Le pokemon numero ${pokemonDeleted.id}  a bien ete supprimer`;
          res.json({ message, data: pokemonDeleted });
        })
        .catch((error) => {
          const message =
            "le pokemon n'a pas pu etre supprimer.Ressayer dans quelques instants.";
          res.status(500).json({ message, data: error });
        });
    });
  });
