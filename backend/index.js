//cria aplicação utilizando o express
const express = require('express');
const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017";
const dbName = "jornada-fullstack-agosto-22";

//Declaração da função main
async function main(){
  //Realizar a conexão com o MongoClient
  //MongoClient -> MongoDatastore -> MongoCollection
  //Conexões com o client podem levar um tempo para
  //concluir. Portanto, utilizamos o mecanismo de 
  //Promises do JS, que permitem 
  //aguardar esse tempo. Para isso, vamos usar o async/await

  console.log("Conectando com o banco de dados...");

  const cliente = await MongoClient.connect(url);
  const db = cliente.db(dbName);
  const collection = db.collection("pontuacoes");

  console.log("Banco de dados conectado com sucesso!");

  const app = express()

  //Sinalizando para o express que estamos usando
  //JSON no body das requisições
  app.use(express.json());

  //cria o endpoint principal
  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  app.get("/oi", function (req, res) {
    res.send("Olá, mundo!");
  });

  //Backend armazena a pontuação das jogadas
  //Criar a lista com as pontuações
  /*const lista = [
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
  ]; */

  //Endpoint READ ALL - [GET] / pontuações
  //sort ordenar e limit limita a quantidade de dados
  app.get("/pontuacoes", async function (req, res) {
    const itens = await collection
    .find()
    .sort({ pontos: -1})
    .limit(10)
    .toArray();
    res.send(itens);
  });
  //Endpoint CREATE - [POST] / pontuações
  app.post("/pontuacoes", async function (req, res) {
    //Peguei o item do corpo da requisição
    const item = req.body;
    // console.log(item);

    //Adicionar o item na lista
    // lista.push({
    //   id: lista.length + 1,
    //   nome: item.nome,
    //   pontos: item.pontos,
    // });
    await collection.insertOne(item);

    res.send(item);
  });

  //aplicação ouvindo na porta
  app.listen(3000);
}

//Executando a função main
main();