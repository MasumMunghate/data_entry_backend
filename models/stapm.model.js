const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.connection.js");
const registeruser = require("./registration.model.js");
const stampInfo = sequelize.define(
  "stampInfo",
  {
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
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    end_date :{
      type: DataTypes.DATE,
      allowNull: true,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// registeruser.hasOne(stampInfo, { foreignKey: "user_id" });
// stampInfo.belongsTo(registeruser, { foreignKey: "user_id"});
// stampInfo.sync({force:true});
module.exports = stampInfo;
