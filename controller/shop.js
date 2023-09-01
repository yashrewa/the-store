const Product = require('../models/products')
const Cart = require('../models/cart')

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
        res.render('shop/product-detail', {
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



exports.postAddToCart = (req, res, next) => {
    const prodId = req.body.productId;
    // console.log(prodId)
    Product.findbyId(prodId, (product) => {
        Cart.addProduct(prodId, product.price)
    })
    res.redirect('/')
}



exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(p => product.id === p.id);
                console.log(cartProductData);
                if(cartProductData){
                    cartProducts.push({productData: product, qty: cartProductData.qty })
                }
            }
            // console.log(cartProducts);
            res.render('shop/cart', {
                pageTitle: "Your Cart",
                products: cartProducts,
                totalPrice: cart.totalPrice
            })
        })

    })
}
exports.postCartDeleteItem = (req, res, next)=> {
    const itemId = req.body.productId;
    // console.log(itemId)
    Product.findbyId(itemId, product => {
        Cart.deleteProductFromCart(itemId, product.price);
        
    })
    res.redirect('/cart')

}


exports.getCheckout = (res, req, next) => {
    res.render('shop/checkout', {
        pageTitle: "checkout"
    })
}