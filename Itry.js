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


app.listen(port , _=> console.log(` nous sommes sur le port ${port}`) )
