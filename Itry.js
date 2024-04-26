express = require('express')
const pokemons = require('./mock-pokemon.js')
const {succes} =require('./helper.js')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const port = 4000 
// const logger = (req ,res, next)=>{
//     console.log(`URL: ${req.url}`)
// }
//app.use(logger)
app.use(favicon(__dirname + '/favicon.ico'))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.get('/',(req,res) => res.send(`nous avons ${pokemons.length} pokemons actuellement`) )
app.get('/api/Pokemons',(req,res) => {
    const message = 'La liste des pokemons a bien ete retourner'
    res.json(succes(message,pokemons))
})
app.post('/api/pokemons/:id', (req,res)=>{
    id = +req.params.id
    message = `le pokemon ${id} a bien ete ajouter a la collection`
    createdPokemon = { ...req.body , ... {id:id , createdDate:new Date()}}
    pokemons.push(createdPokemon)
    res.json(succes(message,createdPokemon))
})
app.put('/api/pokemons/:id',(req,res)=>{
    id = +req.params.id
    modifiedPokemon = {...req.body , id}
    message = `le pokemon ${id}  qui  est ${modifiedPokemon.name} a bien ete mis a jour`
    pokemons.map( pokemon => {
       return pokemon.id==id ? modifiedPokemon : pokemon
    })
    res.json(succes(message,modifiedPokemon))
})
app.delete('/api/pokemons/:id', (req,res)=>{
    id= +req.params.id
    pokemonDeleted = pokemons.find(pokemon => pokemon.id==id)
    message = `le pokemon ${pokemonDeleted.name} a ete supprimer`
    conservedPokemons = pokemons.filter(pokemon => pokemon.id !== id)
    res.json(succes(message,conservedPokemons))
})

app.listen(port , _=> console.log(` nous sommes sur le port ${port}`) )
