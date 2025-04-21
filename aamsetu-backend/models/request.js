const Request = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    buyerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' },
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'Users', key: 'id' },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
    },
    // Additional fields
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    varieties: {
      type: DataTypes.JSON,
      allowNull: true,
    }
  });

  Request.associate = (models) => {
    Request.belongsTo(models.User, { foreignKey: 'buyerId', as: 'buyer' });
    Request.belongsTo(models.User, { foreignKey: 'sellerId', as: 'seller' });
    // ❌ Removed Product association
  };

  return Request;
};

module.exports = Request;
