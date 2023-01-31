const express = require('express');
const mongoose = require('mongoose');
const { createMovie, getMovie, updateMovie, deleteMovie } = require("../controllers/movie")

const route = express.Router();

route.get('/', getMovie);
route.post('/', createMovie);
route.put('/:id', updateMovie);
route.delete('/:id', deleteMovie);

module.exports = route;