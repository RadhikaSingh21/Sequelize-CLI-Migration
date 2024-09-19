"use strict";
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
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
    {}
  );

  Employee.associate = function (models) {
    Employee.hasMany(models.Device, {
      foreignKey: "employeeId",
      as: "devices",
    });
  };

  return Employee;
};
