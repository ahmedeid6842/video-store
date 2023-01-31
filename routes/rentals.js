const express = require('express');
const { getRentals, getRental, addRental, backRental } = require("../controllers/rentals");
const router = express.Router();


router.get('/', getRentals);
router.get('/:customerId/:movieId', getRental);
router.post('/', addRental);
router.get('back/customerId/:movieId', backRental);

module.exports = router;