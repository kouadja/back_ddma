
const fs = require("fs")
const drive = require("../config/driveConfig.js");
/* const { drive } = require("googleapis/build/src/apis/drive/index.js"); */

 
  exports.list = async (req, res) => {
    try {
      const response = await drive.files.list({
        q: "mimeType contains 'image/'",
        pageSize: 10,
        fields: 'files(id, name)',
      });
  
      const files = response.data.files;
      
      if (files.length > 0) {
        console.log('Files:');
        files.forEach(file => {
          console.log(`${file.name} (${file.id})`);
        });
  
        res.json({ fileNames: files });
      } else {
        console.log('No files found.');
        res.json({ message: 'No files found.' });
      }
    } catch (error) {
      console.error('Error listing files:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  exports.uploadFile = async (req, res) => {
    try {
      const file = req.file;
      const fileName = file.originalname;
  
      const response = await drive.files.create({
        requestBody: {
          name: fileName,
          mimeType: file.mimetype,
        },
        media: {
          mimeType: file.mimetype,
          body: fs.createReadStream(file.path),
        },
      });
  
      fs.unlinkSync(file.path);
  
      res.json({ success: true, file: response.data });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  };
  
  exports.findByName = async (req, res) => {
    const fileName = req.body; // Assurez-vous que le nom du fichier est passé comme query parameter
  
    try {
      const response = await drive.files.list({
        q: `name='${fileName}'`,
        fields: 'files(id, name, mimeType, webViewLink)',
      });
  
      const files = response.data.files;
  
      if (files.length === 0) {
        return res.status(404).json({ message: 'No files found with that name.' });
      }
  
      res.json({ files });
    } catch (error) {
      console.error('Error finding file by name:', error);
      res.status(500).json({ error: 'Failed to find file by name' });
    }
  };

  exports.getFile = (req, res) => {
    const fileId = req.params.id;
    console.log(fileId)

   
  
    drive.files.get({ fileId: fileId, alt: 'media' }, { responseType: 'stream' },
      (err, driveResponse) => {
        if (err) {
          res.status(500).send('Error retrieving the image');
          return console.error('Error retrieving the image:', err);
        }
  
        const contentType = driveResponse.headers['content-type'];
        res.setHeader('Content-Type', contentType); // Définir le type MIME approprié        
        driveResponse.data.pipe(res);
      });
  };


  
  





  
  
  

  