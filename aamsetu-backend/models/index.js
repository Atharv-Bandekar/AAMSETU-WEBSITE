const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./User')(sequelize, DataTypes);
db.Request = require('./request')(sequelize, DataTypes);

// Setup associations
Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = db;
