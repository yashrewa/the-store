const {
    json
} = require('body-parser');
const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // fetch the previous cart information from filesystem 
        fs.readFile(p, (err, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0
            }
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // compare the product being added to product already present in the cart
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            console.log(existingProduct)
            let updatedProduct
            //Add the product / increase the quantity  
            if (existingProduct) {
                updatedProduct = {
                    ...existingProduct
                };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {
                    id: id,
                    qty: 1
                };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.products.reduce((total, product) => {
                return total + product.qty * +productPrice;
            }, 0);
            // if (updatedProduct.qty) {
            //     cart.totalPrice = cart.totalPrice + +productPrice * updatedProduct.qty;
            // }
            // else{
            //     cart.totalPrice = +productPrice;
            // }
            // console.log(cart)
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err)

            })

        })
    }
    static deleteProductFromCart(id, price) {
        fs.readFile(p, (err, fileContents) => {
            if (err) {
                return
            }
            let updatedCart = {
                ...JSON.parse(fileContents)
            };
            const product = updatedCart.products.find(product => product.id === id);

            updatedCart.products = updatedCart.products.filter(p => p.id !== id);

            if (product.qty) {
                updatedCart.totalPrice -= +price * product.qty;
            } else {
                updatedCart.totalPrice -= +price;
            }

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            })
        })
    }
    static getCart(cb) {
        fs.readFile(p, (err, fileContents) => {
            const cart = JSON.parse(fileContents);
            if (err) {
                cb(null);
            } else {
                // console.log(cart);
                cb(cart)
            }
        })
    }
}