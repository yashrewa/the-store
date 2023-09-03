const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Orders = sequelize.define('orders', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
})

module.exports = Orders;