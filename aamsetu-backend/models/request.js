module.exports = (sequelize, DataTypes) => {
    const Request = sequelize.define('Request', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      buyerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: 'requests',         // ✅ Force exact table name
      freezeTableName: true,         // ✅ Prevent pluralizing
    });
  
    Request.associate = (models) => {
      Request.belongsTo(models.User, {
        foreignKey: 'buyerId',
        as: 'buyer',
      });
    };
  
    return Request;
  };
  