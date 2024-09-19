const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes.js");
app.use(express.json());
app.use("/users", userRoutes);
const initializeRoles = require("./controller/initializeRole.js");

module.exports = initializeRoles;

initializeRoles();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
