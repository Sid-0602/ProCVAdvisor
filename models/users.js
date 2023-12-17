const Sequelize = require("sequelize");
const sequelize = require("../config/db-config");

//this will define table User with tuples:
const User = sequelize.define("users",{
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = User;