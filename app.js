const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database')


const app = express();
const path = require('path');
const adminRoutes = require('./routes/admin.js')
const shopRoutes = require('./routes/shop.js');
const errorController = require('./controller/error.js')
// const cartRoutes = require('./routes/cart.js');

app.set('view engine', 'ejs');
app.set('views', 'views')



app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404);

sequelize.sync()
    .then(result => {
        console.log(result);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err)
    })


// const server = http.createServer(app);


