const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    availability: { type: DataTypes.BOOLEAN, defaultValue: true },
    sellerId: { type: DataTypes.UUID, allowNull: false }
});

module.exports = Product;
