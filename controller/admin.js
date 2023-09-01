const Product = require('../models/products')

exports.postAddProduct = (req, res, next) => {
    const props = Object.values(req.body);
    console.log(...props);
    const product = new Product(null,...props);
    product.save();
    res.redirect('/');
}

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(__dirname, '../', 'views', 'addtocart.html'))
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        editing: false
    });
}

exports.postEditProduct = (req, res, next) => {
    const props = Object.values(req.body);
    const udpatetdProducts = new Product (...props);
    // console.log(...props);
    udpatetdProducts.save();
    res.redirect('/admin/products');
}


exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin products', 
            path: 'admin/products'
        });
    });

}
exports.getEditProduct = (req, res, next) => {
    // res.sendFile(path.join(__dirname, '../', 'views', 'addtocart.html'))
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findbyId(prodId, product => {
        if(!product){
            return res.redirect('/')
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            editing: editMode,
            product: product
        });
        // console.log(product)
        // console.log(res)

    })
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = Object.values(req.body);
    console.log(...prodId);
    Product.deleteProduct(...prodId);
    res.redirect('/admin/products');
}