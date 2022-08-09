//cria aplicação utilizando o express
const express = require('express')	
const app = express()

//cria o endpoint principal
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get("/oi", function (req, res) {
  res.send("Olá, mundo!");
});

//aplicação ouvindo na porta
app.listen(3000)