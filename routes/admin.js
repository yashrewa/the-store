const express = require('express');
const path = require('path')
const router = express.Router();
const adminController = require('../controller/admin')

// const products = [];

router.get('/add-product', adminController.getAddProduct)

router.post('/add-product', adminController.postAddProduct)

router.get('/edit-product/:productId', adminController.getEditProduct)

router.get('/products', adminController.getProducts);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);


// exports.routes = router;
// exports.products = products;
module.exports = router;