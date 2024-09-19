"use strict";
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {}
  );

  Role.associate = function (models) {
    Role.hasOne(models.User, {
      foreignKey: "roleId",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  };

  return Role;
};
