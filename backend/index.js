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

//Backend armazena a pontuação das jogadas
//Criar a lista com as pontuações
const lista = [
  {
    id: 1,
    nome: "Paulo",
    pontos: 90,
  },
  {
    id: 2,
    nome: "Daniel",
    pontos: 52,
  },
  {
    id: 3,
    nome: "Carolina",
    pontos: 97,
  },
];

//Endpoint READ ALL - [GET] / pontuações
app.get("/pontuacoes", function (req, res) {
  res.send(lista);
});
//Endpoint CREATE - [POST] / pontuações

//aplicação ouvindo na porta
app.listen(3000)