const express = require("express");
const cors = require("cors");

const {
  v4: uuid
} = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // title, url e techs - body
  // { id: "uuid", title: 'Desafio Node.js', url: 'http://github.com/...', techs: ["Node.js", "..."], likes: 0}

  const {
    title,
    url,
    techs
  } = request.body;
  const data = {
    id: uuid(),
    title,
    techs,
    likes: 0,
    url
  };

  repositories.push(data);

  return response.json(data);
});

app.put("/repositories/:id", (request, response) => {
  // title, a url e as techs
  const {
    id
  } = request.params;
  const {
    title,
    url,
    techs
  } = request.body;

  console.log(id);

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)

  if (repositorieIndex < 0) {
    return response.status(400).json({
      error: "ID nao encontrado."
    })
  }

  const likes = repositories[repositorieIndex].likes;

  const data = {
    id,
    title,
    url,
    techs,
    likes
  }
  repositories[repositorieIndex] = data;

  return response.json(data);
});

app.delete("/repositories/:id", (request, response) => {
  const {
    id
  } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)

  if (repositorieIndex < 0) {
    return response.status(400).json({
      error: "ID nao encontrado."
    })
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {
    id
  } = request.params;

  let repository = repositories.find(repository => repository.id === id)
  
  if (repository < 0) {
    return response.status(400).json({
      error: "ID nao encontrado."
    })
  }

  repository.likes += 1;

  return response.json(repository)
});

module.exports = app;