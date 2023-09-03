const Product = require('../models/products')
const Cart = require('../models/cart')
const Order = require('../models/order')

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'Home'
            });
        })
        .catch(error => console.error(error));
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;

    Product.findByPk(prodId)
        .then(products => {
            res.render('shop/product-detail', {
                product: products,
                pageTitle: products.title
            })
        })
        .catch(error => console.error(error));


}



exports.getAbout = (req, res, next) => {
    res.render('shop/about', {
        pageTitle: 'About'
    })
};

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Home'
            });
        })
        .catch(error => console.error(error));


}



exports.postAddToCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({
                where: {
                    id: prodId
                }
            })
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0]
            }

            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;

            }
            return Product.findByPk(prodId)
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: {
                    quantity: newQuantity
                }
            })
        })
        .then(() => res.redirect("/cart"))
        .catch();
}



exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(cart => {
            cart.getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        pageTitle: "Your Cart",
                        products: products,
                        totalPrice: cart.totalPrice
                    })
                })
                .catch()
        })
        .catch(error => console.error(error));

}
exports.postCartDeleteItem = (req, res, next) => {
    const itemId = req.body.productId;

    req.user.getCart()
        .then(cart => {
            return cart.getProducts({
                where: {
                    id: itemId
                }
            })
        })
        .then(products => {
            const product = products[0];
            product.cartItem.destroy();
        })
        .then(result => {
            // console.log(result)
            res.redirect('/cart')

        })
        .catch(error => console.log(error));

}


exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            req.user.createOrder()
                .then(order => {
                    return order.addProduct(products.map(product => {
                        product.orderItem = {
                            quantity: product.cartItem.quantity
                        };
                        return product;
                    }))
                })
                .catch(error => console.log(error));
        })
        .then(result => {
            return fetchedCart.setProducts(null)
        })
        .then(result => {
            res.redirect('/order')
        })
        .catch(err => console.log(err))
}



exports.getOrder = (req, res, redirect) => {
    req.user.getOrders({include: ['products']})
    .then(orders => {
        console.log(orders)
        res.render('shop/order',{
            pageTitle: "Orders",
            orders: orders
        })
        
    })
    .catch(err => console.log(err))
}



exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: "checkout"
    })
}