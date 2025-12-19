const Client = require('../models/Client');

// Add new client
exports.addClient = async (req, res) => {
  try {
    const { name, description, designation } = req.body;

    // Validate required fields
    if (!name || !description || !designation) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }

    // Create new client
    const client = new Client({
      image: req.file.path,
      name,
      description,
      designation
    });

    await client.save();

    res.status(201).json({
      success: true,
      message: 'Client added successfully',
      client
    });
  } catch (error) {
    console.error('Add client error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding client',
      error: error.message
    });
  }
};

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: clients.length,
      clients
    });
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching clients',
      error: error.message
    });
  }
};