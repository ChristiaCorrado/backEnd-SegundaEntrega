const express = require("express");
const router = express.Router();

const product = require('./allProducts')
const carts = require('./carts')

router.use('/productos', product)
router.use('/carts', carts)

module.exports = router