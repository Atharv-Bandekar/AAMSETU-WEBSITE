const { Request } = require('../models');

const getBuyerRequests = async (req, res) => {
  try {
    const requests = await Request.findAll({ where: { buyerId: req.user.id } });
    res.status(200).json(requests);
  } catch (err) {
    console.error("Error fetching buyer requests:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createRequest = async (req, res) => {
  const { title, description, quantity } = req.body;
  try {
    const newRequest = await Request.create({
      title,
      description,
      quantity,
      buyerId: req.user.id
    });
    res.status(201).json(newRequest);
  } catch (err) {
    console.error("Error creating request:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getBuyerRequests, createRequest };
