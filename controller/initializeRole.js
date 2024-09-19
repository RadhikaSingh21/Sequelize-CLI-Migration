const { Role } = require("../models");
const initializeRoles = async () => {
  const roles = ["admin", "employee", "customer service"];

  try {
    // Check if the roles already exist in the database
    for (const roleName of roles) {
      const role = await Role.findOne({ where: { name: roleName } });
      if (!role) {
        // Create role if it doesn't exist
        await Role.create({ name: roleName });
        console.log(`Role '${roleName}' created.`);
      }
    }
    console.log("All roles initialized.");
  } catch (error) {
    console.error("Error initializing roles:", error);
  }
};

module.exports = initializeRoles;
