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

router.post('/cart', shopController.postAddToCart)

router.post('/cart-delete-item', shopController.postCartDeleteItem)

router.get('/checkout', shopController.getCheckout)

router.get('/order', shopController.getOrder)

router.post('/create-order', shopController.postOrder)

// router.get('/shop/user-login', shopController.getLogin)

// router.get('/shop/user-signup', shopController.getSignup)

// router.post ('shop/user-signup', shopController.postSignup)


// exports.routes = router;
// exports.products = products;

module.exports = router;