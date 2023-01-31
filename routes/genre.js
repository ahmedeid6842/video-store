const mongoose = require('mongoose');
const express = require('express');
const { getGenre, createGenre, updateGenre, deleteGenre } = require("../controllers/genre");
const isAuth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

const route = express.Router();

route.get('/', getGenre);
route.post('/', isAuth, isAdmin, createGenre);
route.put('/:id', isAuth, isAdmin, updateGenre);
route.delete('/:id', isAuth, isAdmin, deleteGenre);

module.exports = route;






