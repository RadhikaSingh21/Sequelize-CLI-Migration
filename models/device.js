"use strict";
module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define(
    "Device",
    {
      deviceName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Employees",
          key: "id",
        },
      },
    },
    {}
  );

  Device.associate = function (models) {
    Device.belongsTo(models.Employee, {
      foreignKey: "employeeId",
      as: "employee",
    });
  };

  return Device;
};
