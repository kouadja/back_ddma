const Message = require('../Models/message.js');

// Get all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new message
exports.createMessage = async (req, res) => {
  const message = new Message({
    user: req.body.user,
    message: req.body.message
  });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a single message by ID
exports.getMessageById = async (req, res, next) => {
  let message;
  try {
    message = await Message.findById(req.params.id);
    if (message == null) {
      return res.status(404).json({ message: 'Cannot find message' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.message = message;
  next();
};

// Update a message by ID
exports.updateMessage = async (req, res) => {
  if (req.body.user != null) {
    res.message.user = req.body.user;
  }
  if (req.body.message != null) {
    res.message.message = req.body.message;
  }
  try {
    const updatedMessage = await res.message.save();
    res.json(updatedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a message by ID
exports.deleteMessage = async (req, res) => {
  try {
    await res.message.remove();
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
