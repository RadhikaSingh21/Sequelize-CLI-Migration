// seeders/XXXXXXXXXXXXXX-demo-role.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Roles",
      [
        {
          name: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "User",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Roles", null, {});
  },
};
