const fs = require('fs');
const path = require('path');
const Cart = require ('./cart')
// const products = [];
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'product.json');
const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([])
        } else {
            cb(JSON.parse(fileContent));

        }
    });
};

module.exports = class Product {
    constructor(id ,title, price, description, imagelink) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.imagelink = imagelink;
    }

    save() {
        getProductsFromFile((products) => {
            if (this.id) {
                const existingProductIndex = products.findIndex(p => p.id == this.id);
                console.log(existingProductIndex)
                const udpatetdProducts = [...products];
                udpatetdProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(udpatetdProducts), (err) => {
                    console.log(err)
                })
            } else {
                this.id = Math.floor(Math.random()*"10000000000").toString();
                products.unshift(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err)
                })
            }
        });


        // products.push(this);
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }

    static findbyId(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id)
            cb(product)
        });
    }

    static deleteProduct(id) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            let updatedProducts = products.filter(p => p.id !== id);
            console.log(updatedProducts)
            fs.writeFile(p, JSON.stringify(updatedProducts), err=>{
                if(!err){
                    Cart.deleteProductFromCart(id, product.price);

                }
            });
        });
    }
}