const express = require("express");
const router = express.Router();
const userController = require("../controller/userController.js");
const employeeController = require("../controller/EmployeeController.js");
const customerController = require("../controller/customerProductController.js");

router.post("/create", userController.createUser);
router.get("/:id", userController.getUser);

router.post("/employees", employeeController.createEmployee);
router.get("/employees/:id", employeeController.getEmployee);

router.post("/product/create", customerController.createCustomerWithProducts);
router.get("/customer/:id", customerController.getCustomerWithProducts);

module.exports = router;
