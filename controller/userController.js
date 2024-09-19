const { User, Role } = require("../models");

exports.createUser = async (req, res) => {
  try {
    const { username, email, roleId } = req.body;
    if (!username || !email || !roleId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("test ==>", req.body);

    const roleRecord = await Role.findOne({ where: { id: roleId } });

    if (!roleRecord) {
      return res.status(404).json({ error: "Role not found" });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }
    const user = await User.create({
      username,
      email,
      roleId,
    });
    res.status(201).json({ text: "successfully created user", data: user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Role,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const responseData = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: {
        id: user.Role.id,
        name: user.Role.name,
      },
    };

    res.status(200).json({ data: responseData });
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Error retrieving user" });
  }
};
