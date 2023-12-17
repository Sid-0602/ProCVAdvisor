const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize("procv-express-app",process.env.MYSQL_PORT,process.env.MYSQL_PASSWORD,{
    dialect: "mysql",
    host: "localhost",
});

module.exports = sequelize;