const Product = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
      availability: { type: DataTypes.BOOLEAN, defaultValue: true },
      sellerId: {
        type: DataTypes.INTEGER, // 👈 Must match User.id type
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    });
  
    Product.associate = (models) => {
      Product.belongsTo(models.User, {
        foreignKey: 'sellerId',
        as: 'seller',
      });
    };
  
    return Product;
  };
  
  module.exports = Product;
  