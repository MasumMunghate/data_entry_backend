const { DataTypes } = require("sequelize");
const sequelize  = require("../config/db.connection.js");

const user = sequelize.define(
  "user_relations",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
// user.sync({force:true});
module.exports = user;
