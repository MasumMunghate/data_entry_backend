const sequelize = require("../config/db.connection.js");
const { DataTypes } = require("sequelize");
const stampInfo = require("./stapm.model.js");

const registeruser = sequelize.define(
  "registeruser",
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
    },
    mobile_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true, 
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true, 
    },
    plan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    caller: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [
            [
              "caller 1",
              "caller 2",
              "caller 3",
              "caller 4",
              "caller 5",
              "caller 6",
              "caller 7",
              "caller 8",
              "caller 9",
            ],
          ],
          msg: "caller must be one of the allowed options.",
        },
      },
    },
    status: {
      type: DataTypes.ENUM,
      values: ["pending", "success", "freeze", "active"],
      defaultValue: "pending",
    },
    password : {
      type: DataTypes.STRING,
      allowNull: true,
    }
    // stampId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: stampInfo,
    //     key: "id",
    //   },
    // },

  },
  {
    freezeTableName: true,
  }
);

registeruser.belongsTo(stampInfo, { foreignKey: "stampId" });
stampInfo.hasOne(registeruser, { foreignKey: "stampId" });

// registeruser.sync({force:true});
module.exports = registeruser;
