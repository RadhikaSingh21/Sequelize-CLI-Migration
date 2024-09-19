const { Employee, Device } = require("../models");

// Create an Employee with validation
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, devices } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingEmployee = await Employee.findOne({ where: { email } });
    if (existingEmployee) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const employee = await Employee.create({ name, email });

    if (devices && devices.length > 0) {
      const createdDevices = await Device.bulkCreate(
        devices.map((device) => ({
          deviceName: device.deviceName,
          employeeId: employee.id,
        }))
      );
      employee.dataValues.devices = createdDevices;
    }

    res
      .status(201)
      .json({ text: "Employee created successfully", data: employee });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Error creating employee" });
  }
};

// Get Employee by ID and include their devices
exports.getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Employee ID is required" });
    }

    const employee = await Employee.findOne({
      where: { id },
      include: [
        {
          model: Device,
          as: "devices", // Alias should match the model association
          attributes: ["id", "deviceName"],
        },
      ],
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const responseData = {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      devices: employee.devices.map((device) => ({
        id: device.id,
        deviceName: device.deviceName,
      })),
    };

    res.status(200).json({ data: responseData });
  } catch (error) {
    console.error("Error retrieving employee:", error);
    res.status(500).json({ error: "Error retrieving employee" });
  }
};
