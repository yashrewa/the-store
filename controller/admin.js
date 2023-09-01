const Product = require('../models/products')

exports.postAddProduct = (req, res, next) => {
    const props = {
        ...req.body
    };
    console.log(props);
    Product.create(props)
        .then(result => console.log(result))
        .catch(error => console.error(error))
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
    const udpatetdProducts = new Product(...props);
    // console.log(...props);
    udpatetdProducts.save();
    res.redirect('/admin/products');
}


exports.getProducts = (req, res, next) => {

    Product.findAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin products',
                path: 'admin/products'
            });
        })
        .catch(error => console.error(error))

}
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/')
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                editing: editMode,
                product: product
            });
        })
        .catch(error => console.error(error))
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = Object.values(req.body);
    console.log(prodId);
    Product.destroy({
        where: {id: prodId}
    })
    .then(result => console.log(result))
    .catch(error => console.error(error));
    // Product.deleteProduct(...prodId);
    res.redirect('/admin/products');
}