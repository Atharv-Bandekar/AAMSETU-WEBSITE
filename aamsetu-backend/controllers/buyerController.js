const User = require('../models/User');


const getBuyerProfile = async (req, res) => {
  try {
    const buyer = await User.findByPk(req.user.id);

    if (!buyer || buyer.role !== 'buyer') {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    // Exclude sensitive fields
    const { id, name, email, phone, address } = buyer; // adjust fields as per your model

    res.status(200).json({ id, name, email, phone, address }); // send only safe data
  } catch (err) {
    console.error('Error fetching buyer profile:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = { getBuyerProfile };
