const File = require('../Models/file.js');

// Controller to create a new file
exports.createFile = async (req, res) => {
  const { name,  folderId } = req.body;

  try {
    const newFile = new File({
      name,
     
      folder: folderId,
    });

    await newFile.save();

    res.status(201).json(newFile);
  } catch (err) {
    console.error('Error creating file:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getFile = async (req, res) => {
  try {
    const files = await File.find()
    res.status(200).json(files);
  } catch (error) {
    console.error('Error retrieving files:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getFilesInFolder = async (req, res) => {
  const { folderId } = req.params;

  try {
    const files = await File.find({ folder: folderId });
    res.status(200).json(files);
  } catch (error) {
    console.error('Error retrieving files:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
