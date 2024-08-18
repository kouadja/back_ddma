
const fs = require("fs")
const drive = require("../config/driveConfig.js");
const Video = require("../Models/video.js");
const { PassThrough } = require('stream');
const archiver = require('archiver');
const stream = require('stream');
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
          parents: [file],
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
    console.log("getfile")
    console.log(fileId)

   
  
    drive.files.get({ fileId: fileId, alt: 'media' }, { responseType: 'stream' },
      (err, driveResponse) => {
        if (err) {
          res.status(500).send('Error retrieving the image');
          return console.error('Error retrieving the image:', err);
        }
  
        const contentType = driveResponse.headers['content-type'];
        console.log(contentType)
        res.setHeader('Content-Type', contentType); // Définir le type MIME approprié        
       const a =  driveResponse.data.pipe(res);
       console.log("------------------------------------------")
       console.log(a)
       console.log("------------------------------------------")

      });
  };
  exports.getFilesByCampaign = async (req, res) => {
    const fileId = req.params.fileId;

    try {
        // Étape 1 : Obtenir les fichiers associés à la campagne depuis MongoDB
        const files = await Video.find({ fileId: fileId });
        console.log(files)
       

        if (files.length === 0) {
            return res.status(404).send('Aucun fichier trouvé pour cette campagne.');
        }

        // Étape 2 : Récupérer les fichiers depuis Google Drive
        const fileBuffers = []; // Tableau pour stocker les fichiers récupérés

        for (const file of files) {
         
            try {
                const driveResponse = await drive.files.get({
                    fileId: file.fileDriveId,
                    alt: 'media'
                }, { responseType: 'arraybuffer' }); // Récupérer les fichiers en tant que buffer

                const contentType = driveResponse.headers['content-type'];
                const buffer = Buffer.from(driveResponse.data);

                fileBuffers.push({
                    buffer,
                    contentType,
                    fileName: file.name
                });

            } catch (error) {
                console.error(`Erreur lors de la récupération du fichier ${file.fileDriveId}`, error);
                continue; // Passer au fichier suivant en cas d'erreur
            }
        }

        // Étape 3 : Envoyer tous les fichiers au client
        res.status(200).json(fileBuffers.map(f => ({
            content: f.buffer.toString('base64'), // Convertir les buffers en base64 pour l'envoi JSON
            contentType: f.contentType,
            fileName: f.fileName,
            fileId:fileId
        })));
        console.log(fileId)

    } catch (error) {
        console.error('Erreur lors de la récupération des fichiers de la campagne:', error);
        res.status(500).send('Erreur lors de la récupération des fichiers.');
    }
};



  // Route pour obtenir un fichier spécifique par ID




  
  





  
  
  

  