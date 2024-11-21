"use strict";

const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const registeruser = require("./registration.model.js");
const stampInfo = require("./stapm.model.js");

const user = require("./user.model.js");
const post = require("./post.model.js");
const submitassignment = require("./submitassingment.model.js");

const db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

registeruser.hasOne(stampInfo, { foreignKey: "userid" });
stampInfo.belongsTo(registeruser, { foreignKey: "userid" });

registeruser.hasMany(submitassignment,{foreignKey:"registeruserId"});
submitassignment.belongsTo(registeruser,{foreignKey:"registeruserId"});


user.hasMany(post, {
  foreignKey: "userId",
  as: "posts",
});
post.belongsTo(user, {
  foreignKey: "userId",
  as: "user",
});

module.exports = db;
