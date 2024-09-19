const { Customer, Product } = require("../models");

exports.createCustomerWithProducts = async (req, res) => {
  const { name, email, products } = req.body;
  if (!name || !email || !products || !Array.isArray(products)) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const customer = await Customer.create({ name, email });
    if (products.length > 0) {
      const createdProducts = await Product.bulkCreate(products);
      await customer.addProducts(createdProducts);
    }
    res.status(201).json({
      message: "Customer created with products successfully",
      customer,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Controller to get customer with products
exports.getCustomerWithProducts = async (req, res) => {
  const { id } = req.params;

  try {
    // Find customer by ID and include associated products
    const customer = await Customer.findByPk(id, {
      include: [Product],
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
