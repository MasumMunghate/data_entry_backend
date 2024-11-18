const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.connection");

const userbulkassingment = sequelize.define("userassignments", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    isEmail: true,
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isNumeric: true,
      len: [10, 10],
    },
  },
  zipCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  IP: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  license: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// userbulkassingment.sync({force:true});
module.exports = userbulkassingment;


