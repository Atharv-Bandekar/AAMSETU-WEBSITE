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
  const {
    name,
    state,
    address,
    comments,
    varieties
  } = req.body;

  try {
    const newRequest = await Request.create({
      name,
      state,
      address,
      comments,
      varieties,
      buyerId: req.user.id  // Dynamically assign from logged-in user
    });

    res.status(201).json({
      message: 'Request submitted successfully',
      data: newRequest
    });
  } catch (err) {
    console.error("Error creating request:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getMyRequests = async (req, res) => {
  try {
    const buyerId = req.user.id;
    const requests = await Request.findAll({
      where: { buyerId },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json({ requests });
  } catch (error) {
    console.error("Error fetching buyer requests:", error);
    res.status(500).json({ message: 'Server error fetching buyer requests' });
  }
};

const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findByPk(id);

    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (request.buyerId !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    await request.update(req.body);
    res.status(200).json(request);
  } catch (err) {
    console.error("Error updating request:", err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findByPk(id);

    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (request.buyerId !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    await request.destroy();
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (err) {
    console.error("Error deleting request:", err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = {
  getBuyerRequests,
  createRequest,
  getMyRequests,
  updateRequest,
  deleteRequest
};
