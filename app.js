const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database')
const Products = require('./models/products');
const User = require('./models/user');
const Cart = require('./models/cart');  
const CartItem = require('./models/cart-item');
const Order = require('./models/order')
const OrderItem = require('./models/order-item');

const app = express();
const path = require('path');
const adminRoutes = require('./routes/admin.js')
const shopRoutes = require('./routes/shop.js');
const errorController = require('./controller/error.js')
// const cartRoutes = require('./routes/cart.js');

app.set('view engine', 'ejs');
app.set('views', 'views')

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next()
        })
        .catch((err) => console.error(err));
})


app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404);

Products.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});
User.hasMany(Products)
User.hasOne(Cart)
Cart.belongsToMany(Products, {through: CartItem})
Products.belongsToMany(Cart, {through: CartItem})
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Products, {through: OrderItem})


sequelize
    // .sync({force: true})
    .sync()
    .then(result => {
        return User.findByPk(1);

    })
    .then(user => {
        if (!user) {
            return User.create({
                userName: "yash",
                email: "yashrewa00@gmail.com",
                password: "321",
                DOB: "05-11-1999"
            })
        }
        return user
    })
    .then(user => {
        // console.log(user);
        return user.createCart();
        
    })
    .then(cart=> {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err)
    })


// const server = http.createServer(app);