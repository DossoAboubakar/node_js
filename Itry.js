const express = require("express");
const sql = require("./src/db/sequelize");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const port = process.env.PORT || 4000; // process est un objet global donc pas besoin de l'importer. c'est lui qui contient les variables d'environnement
sql.initDb();

app.use(favicon(__dirname + "/favicon.ico")); //Ici in utilise que des api avec app.use() mais on en cree pas 
app.use(morgan("dev"));
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.json('Hello,Heroku ! 👋')
})
require("./src/routes/findAllpokemons")(app);
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);
require("./src/routes/login")(app);

app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demander ! vous pouvez trouver une autre URL.";
  res.status(404).json(message);
});

app.listen(port, (_) => console.log(` nous sommes sur le port ${port}`));
