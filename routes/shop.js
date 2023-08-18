const path = require('path');
const express = require('express');
const router = express.Router();
const shopController = require('../controller/shop')
// const adminData = require('./admin');

// const {products} = adminData



router.get('/', shopController.getIndex)

router.get('/about', shopController.getAbout)

router.get('/products', shopController.getProducts)

router.get('/products/:productId', shopController.getProduct)
 
router.get('/cart', shopController.getCart)

router.post('/cart',shopController.postCart)

router.get('/checkout', shopController.getCheckout)

// exports.routes = router;
// exports.products = products;

module.exports = router;