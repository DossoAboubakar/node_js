const express = require('express')
const sql= require('./src/db/sequelize')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const port = 4000 
sql.initDb()
  


app.use(favicon(__dirname + '/favicon.ico'))
app.use(morgan('dev'))
app.use(bodyParser.json())
require('./src/routes/findAllpokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)

app.use(({res})=>{
const message  = 'Impossible de trouver la ressource demander ! vous pouvez trouver une autre URL.'
res.status(404).json(message)
})


app.listen(port , _=> console.log(` nous sommes sur le port ${port}`) )
