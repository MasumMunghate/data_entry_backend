
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const database_name = process.env.DATABASE_NAME;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const sequelize = new Sequelize(database_name, username, password,{
    host : process.env.HOST,
    dialect : 'postgres'
});
  try {
     sequelize.authenticate();
    console.log("Connection has been establish successfully");
  } catch (error) {
    console.log("Uable to connect database", error);
  }
module.exports =  sequelize


// const  Sequelize = require("sequelize");
// const sequelize = new Sequelize("for_practice", "postgres", "root", {
//     dialect: 'postgres',
//     host: 'localhost'
// });

// try {
//  sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

// module.exports =  sequelize