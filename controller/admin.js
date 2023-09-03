const Product = require('../models/products')

exports.postAddProduct = (req, res, next) => {
    const props = {
        ...req.body
    };
    // console.log(props);
    req.user.createProduct(props)
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(error => console.error(error))
}

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        editing: false
    });
}

exports.postEditProduct = (req, res, next) => {
    const props ={ ...req.body};
    // console.log("data from site",props)
    Product.findByPk(props.productId)
    .then(result =>{
        result.id = req.body.productId;
        result.title = req.body.title;
        result.price = req.body.price;
        result.description = req.body.description;
        result.imagelink = req.body.imagelink;
        result.save();
        // console.log("result from db",result);
        res.redirect('/admin/products');
    })
    .catch(error => console.error(error))
    // const udpatetdProducts = new Product(...props);
    // udpatetdProducts.save();
    // res.redirect('/admin/products');
}


exports.getProducts = (req, res, next) => { 
    req.user.getProducts()
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
    req.user.getProducts({where: { id: prodId}})
        .then(products => {
            const product = products[0];
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