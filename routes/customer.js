const express = require('express');

const { createCustomer, getCustomer, updateCustomer, deleteCustomer } = require("../controllers/customer");
const isAuth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

const route = express.Router();

route.get('/:id', getCustomer);
route.use(isAuth);
route.post('/', createCustomer);
route.put('/:id', updateCustomer);
route.delete('/:id', isAdmin, deleteCustomer);


module.exports = route;
