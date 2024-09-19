module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  Product.associate = (models) => {
    Product.belongsToMany(models.Customer, { through: "CustomerProduct" });
  };

  return Product;
};
