const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    buyerId: { type: DataTypes.UUID, allowNull: false },
    sellerId: { type: DataTypes.UUID, allowNull: false },
    productId: { type: DataTypes.UUID, allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'completed', 'cancelled'), defaultValue: 'pending' }
});

module.exports = Order;
