console.log('hello ,world 👋')
const express =  require ('express') 
const favicon = require('favicon')
const morgan = require('morgan')
const {succes} = require('./helper') //je charge ici la methode ici
let pokemons = require('./mock-pokemon')
const app = express()
const port = 3000
const logger = (req, res ,next)=>{
    console.log(`URL: ${req.url}`)
    next()
}
//app.use(logger)
pp.use(morgan('dev'))
app.use(favicon(__dirname + ' /favivcon'))
app.get('/',(req,res)=> res.send(`nous avons ${pokemons.length} pokedex pour le moment`))
// app.get('/api/pokemons/:id/:name',(req,res)=> {
//     const id = req.params.id
//     const name = req.params.name
//     res.send(`hello, vous avez demander le pokemon Numero ${id}! qui est ${name}`)
// })
app.get('/api/pokemons/:id',(req,res)=> {
    const id = +req.params.id
    //ou  aussi const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    // res.send(`hello, vous avez demander le pokemon Numero ${pokemon.name}`)
    // le code ci dessus renvoi la reponse sous forme de chaine de caractere
    const message = 'un message a bien ete trouve.'
    res.json(succes(message,pokemon))


}) 
app.get('/api/pokemons',(req,res)=> {
    const listPokemons =  pokemons
    const message = 'voici la liste de tous les pokemons'
    res.json(succes(message,listPokemons))
})
app.listen(port,()=> console.log(`Notre application Node est demaree sur :http:/localhost:${port}`))
