const express = require('express');
const cors = require('cors');
const db = require('./models'); // ✅ central import

const authRoutes = require('./routes/authRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const requestRoutes = require('./routes/requestRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/buyer', buyerRoutes);
app.use('/api/requests', requestRoutes);

// Sync all models properly
db.sequelize.sync({ alter: true }).then(() => {
  console.log('✅ Database synced!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
