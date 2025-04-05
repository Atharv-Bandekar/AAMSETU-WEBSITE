// models/User.js

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
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
  
    // ✅ Define association
    User.associate = (models) => {
      User.hasMany(models.Request, {
        foreignKey: 'buyerId',
        as: 'requests',
      });
    };
  
    return User;
  };
  