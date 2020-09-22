const express = require("express");
const cors = require("cors");

 const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  // title, url e techs - body
  // { id: "uuid", title: 'Desafio Node.js', url: 'http://github.com/...', techs: ["Node.js", "..."], likes: 0}

  const { title, url, techs } = request.body;
  const data = {id: uuid, title, techs, likes: 0, url};
  
  console.log(data)
  
  repositories.push(data);

  return response.json(data);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  // title, a url e as techs
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
