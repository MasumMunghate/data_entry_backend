const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.connection.js");
const bcrypt = require('bcrypt');

const userlogindetail = sequelize.define(
  "userlogindetail",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const hashedPassword = bcrypt.hashSync(value, 10);
        this.setDataValue("password", hashedPassword);
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    timestamps: true,
  }
);
// user.sync({force:true});
module.exports = userlogindetail;
