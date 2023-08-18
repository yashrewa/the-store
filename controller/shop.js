const Product = require('../models/products')

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Products',
        });
    });

    // console.log(products);

};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findbyId(prodId, product => {
        res.render('shop/product-detail',{
            product: product,
            pageTitle: product.title
        })
    })
}



exports.getAbout = (req, res, next) => {
    res.render('shop/about', {
        pageTitle: 'About'
    })
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Home'
        });
    });
}

exports.postCart = (req, res, next) => {
    console.log({...req.body})
    res.redirect('/')
}

exports.getCart = (req, res, next) => {

    res.render('shop/cart', {
        pageTitle: "Your Cart"
    })
}


exports.getCheckout = (res, req, next) => {
    res.render('shop/checkout', {
        pageTitle: "checkout"
    })
}