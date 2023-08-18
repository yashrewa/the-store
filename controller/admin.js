const Product = require('../models/products')

exports.postAddProduct = (req, res, next) => {
    const props = Object.values(req.body);
    console.log(...props);
    const product = new Product(...props);
    product.save();
    res.redirect('/');
}

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(__dirname, '../', 'views', 'addtocart.html'))
    res.render('admin/add-product', 
    {pageTitle: 'Add Product'});
}

exports.getProducts = (req, res, next) =>{
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin products',
            path: 'admin/products'
        });
    });
}