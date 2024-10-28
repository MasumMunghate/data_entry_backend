const { DataTypes } = require("sequelize");
const  sequelize  = require("../config/db.connection");

const stapmModel = sequelize.define("stampInfo", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  signature: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passport_photo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // store current date and time.
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});


module.exports = stapmModel;