const File = require('../Models/file.js');
const User = require('../Models/user.js');
const bcrypt = require('bcryptjs');

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
    console.log(files)
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


exports.addUserToFile = async (req, res) => {

  const { email,roles } = req.body;
  const { fileId } = req.params;

  try {
    let user = await User.findOne({ email });
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash("koua", saltRounds);


    if (!user) {
      user = new User({ email,roles,password:hashedPassword });
      await user.save();
    }

    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    if (!file.users.includes(user._id)) {
      file.users.push(user._id);
      await file.save();
    }

    res.status(200).json(file);
  } catch (error) {
    console.error('Error adding user to file:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getUsersInFile = async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await File.findById(fileId).populate('users','email');

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.status(200).json(file.users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
/* exports.getfileUser = async (req,res)=>{
  const {fileId,userId} = req.body
  const userBelongToFile = await
  const file = await File.findById(fileId).populate('users','__id');


  
}
 */