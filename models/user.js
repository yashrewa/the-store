const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Users = sequelize.define("users", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    DOB: {
        type: Sequelize.DATE,
        allowNull: false,
    }
})

module.exports = Users;