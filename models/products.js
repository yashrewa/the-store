const fs = require('fs');
const path = require('path');
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
    constructor(title, price, description, imagelink) {

        this.title = title;
        this.price = price;
        this.description = description;
        this.imagelink = imagelink;
    }

    save() {

        getProductsFromFile((products)=>{
            this.id = Math.random().toString();
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err)
            })
        });
        

        // products.push(this);
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }

    static findbyId(id, cb){
        getProductsFromFile(products => {
            const product = products.find(p=> p.id === id)
            cb(product)
        })
    }
}