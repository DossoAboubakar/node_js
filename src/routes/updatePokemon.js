const { ValidationError } = require("sequelize");
const models = require("../models/index");

///PAS TRES PRATIQUE
// module.exports = (app) => {
//   app.put("/api/pokemons:id", (req, res) => {
//     const id = req.params.id;
//     models.Pokemon.update(req.body, {
//       where: { id: id },
//     }).then((_) => {
//       models.Pokemon.findByPk(id)
//         .then((pokemon) => {
//           if (pokemon === null) {
//             const message =
//               "Le Pokemon n'existe pas.Ressayer avec un autre identifiant";
//             return res.statut(404).json({ message });
//           }
//           const message = `Le pokemon ${pokemon.name}  a bien ete modifier`;
//           res.json({ message, data: pokemon });
//         })
//         .catch((error) => {
//           const message =
//             "Le pokemon n'a pas pu etre modifie. Ressayer dans quelques instants.";
//           res.statut(500).json({ message, data: error });
//         })
//         .catch(error => {
//             const message = 'le pokemon n\'a pas pu etre modifie.Ressayer dans quelques instants.'
//             res.statut(500).json({ message, data: error });

//         })
//     });
//   });
// }

/// CODE PRECEDENT FACTORISER AVEC L'AJOUT DE return a la ligne 40 et la suppression d'un bloc catch
module.exports = (app) => {
  app.put("/api/pokemons:id", (req, res) => {
    const id = req.params.id;
    models.Pokemon.update(req.body, {
      where: { id: id },
    }).then((_) => {
      return models.Pokemon.findByPk(id)
        .then((pokemon) => {
          if (pokemon === null) {
            const message =
              "Le Pokemon n'existe pas.Ressayer avec un autre identifiant";
            return res.status(404).json({ message });
          }
          const message = `Le pokemon ${pokemon.name}  a bien ete modifier`;
          res.json({ message, data: pokemon });
        })
        .catch((error) => {
          if (error instanceof ValidationError) {
            return res
              .status(400)
              .json({ message: error.message, data: error });
          }

          const message =
            "le pokemon n'a pas pu etre modifie.Ressayer dans quelques instants.";
          res.status(500).json({ message, data: error });
        });
    });
  });
};
