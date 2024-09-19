// seeders/XXXXXXXXXXXXXX-demo-user.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch the inserted roles
    const roles = await queryInterface.sequelize.query(
      `SELECT id, name FROM Roles;`
    );

    // Destructure the result to get the role rows
    const [roleRows] = roles;

    // Log roles for debugging (optional)
    console.log("Fetched roles:", roleRows);

    if (!roleRows.length) {
      throw new Error("No roles found in the database");
    }

    // Find roles by name
    const adminRole = roleRows.find((role) => role.name === "Admin");
    const userRole = roleRows.find((role) => role.name === "User");

    // Insert users with valid roleId
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John Doe",
          email: "john.doe@example.com",
          roleId: adminRole.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jane Doe",
          email: "jane.doe@example.com",
          roleId: userRole.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
