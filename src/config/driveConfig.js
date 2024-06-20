
const { google } = require('googleapis');
const dotenv = require("dotenv")
dotenv.config()



const oauth2client = new google.auth.OAuth2({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri:   process.env.REDIRECRT_URI,
  
  })
  
  const credentials = {
    "access_token": "ya29.a0AXooCgsk-LeAlWVbbqiC_lnsSGMrdfL_iR2izM6fsUoKjrJUBxx0nFc7w8F0MmpWs5enZ0bEHMicRmaMjKCqA4HQJBgvUVNv4NE-l-0O9ccp6DX9GOMb181KJM8Ji6Ukpxl1BkdfKY8fdtd5vb9dcwt3fLMkNx2vNX18aCgYKAXkSARISFQHGX2MiumJA6LVJFwmQaGVarc4diA0171",
    "scope": ["https://www.googleapis.com/auth/drive"],
    "token_type": "Bearer",
    "expires_in": 3599,
    "refresh_token": "1//04hKEUjWSYmt2CgYIARAAGAQSNwF-L9IrV5u_rDe2lxY-3vKPK51OqIT1zaoKjTmo_2CQhAwvoO7NCQ83CABy0PPwkDFS2fSVy2c",
  
  };
  

  
  
  
  oauth2client.setCredentials(credentials)

  let drive = google.drive({
    version: 'v3',
    auth: oauth2client
  });

  module.exports =(drive)
