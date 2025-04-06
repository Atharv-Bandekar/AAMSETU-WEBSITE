module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER, // 👈 You're using INTEGER, not UUID
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true, // or use a regex if you want a specific format
        len: [10, 10]     // assuming 10-digit Indian numbers
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('buyer', 'seller'),
      allowNull: false,
    },
  });

  // ✅ Define associations
  User.associate = (models) => {
    // For buyers making requests
    User.hasMany(models.Request, {
      foreignKey: 'buyerId',
      as: 'requests',
    });

    // For sellers posting products
    User.hasMany(models.Product, {
      foreignKey: 'sellerId',
      as: 'products',
    });
  };

  return User;
};

  