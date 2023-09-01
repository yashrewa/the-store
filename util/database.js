const Sequelize = require('sequelize');

const sequelize = new Sequelize("node_app", "root", "2102", {
    dialect: "mysql",
    host: "localhost"
});

module.exports = sequelize;