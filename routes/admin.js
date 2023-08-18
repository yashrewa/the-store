const express = require('express');
const path = require('path')
const router = express.Router();
const adminController = require('../controller/admin')

// const products = [];


router.get('/add-product', adminController.getAddProduct)

router.post('/add-product', adminController.postAddProduct)

router.get('/products', adminController.getProducts);



// exports.routes = router;
// exports.products = products;
module.exports = router;