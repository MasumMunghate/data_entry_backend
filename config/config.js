// const dotenv  = require('dotenv');
// dotenv.config();
// console.log("process.env.USERNAME================",process.env.USERNAME);

// module.exports={
//   development: {
//     username: process.env.USERNAME,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE_NAME,
//     host: process.env.HOST,
//     dialect: "postgres",
//   },
// };

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  "development": {
    "username": "postgres",
    "password": "root",
    "database": "glorry_eterprises",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
