const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 4000;
const url = process.env.GIT_API_URL;

const headers = {
  headers: {
    "Authorization" : process.env.GIT_TOKEN
  }
};

app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

app.get('/*', (req, res) => {
  axios.get(`${url + req.url}`, headers)
    .then((response) => res.status(200).json(response.data))
    .catch((err) => {
      res.status(500).json({message: err.message})
    })
})

app.put('/*', (req, res) => {
  axios.put(`${url + req.url}`, null, headers)
    .then((response) => res.sendStatus(200))
    .catch((err) => {
      res.status(500).json({message: err.message})
    })
})

app.post('/*', (req, res) => {
  axios.post(`${url + req.url}`, req.body, headers)
    .then((response) => res.sendStatus(200))
    .catch((err) => {
      res.status(500).json({message: err.message})
    })
})

app.listen(port);

console.log('Listening on port: ', port)