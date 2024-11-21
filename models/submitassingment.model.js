const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.connection.js");

const submitassignment = sequelize.define("submitassignment", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  totalform: {
    type: DataTypes.INTEGER,
    defaultValue: 400,
  },
  sumitedform: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  pendingform: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  wrongform: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  registeruserId:{
    type: DataTypes.INTEGER,
    references:{
        model:"registeruser",
        as:"id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  }
}, {
  timestamps: true, 
});
// submitassignment.sync({force:true})
module.exports = submitassignment;
