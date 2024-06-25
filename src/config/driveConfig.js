
const { google } = require('googleapis');
const dotenv = require("dotenv")
dotenv.config()



const oauth2client = new google.auth.OAuth2({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri:   process.env.REDIRECRT_URI,
  
    
  })
  
  const credentials = {
    "access_token":"ya29.a0AXooCgv_YK30z02vDL0GauAMziiBljLdhWYKRUOGt3hh9Tm_AdfZ_Lf2w1u51yywEa_h2uwSYYYUyLt4T1TNUvbLne4YcuzazKrpy1SYRw02VLzh31guppaoTLJmig7PHJsi6WK4vSGE9pMQr0IhUCe4QcB-jnOb06g-aCgYKAfASARISFQHGX2MiC_KGoU_6oxTqbUnypBBP1g0171",
    "scope": ["https://www.googleapis.com/auth/drive"],
    "token_type": "Bearer",
    "expires_in": 3599,
    "refresh_token":"1//04z10Y5NK4XLfCgYIARAAGAQSNwF-L9IrDwYByv86nTzYy6i6s8Ox4aF6yj9WPRULMOTfjzmFdvsQfSdM7-0uV6QimW-f1cgbuW0",
  
  };
  

  
  
  
  oauth2client.setCredentials(credentials)

  let drive = google.drive({
    version: 'v3',
    auth: oauth2client
  });

  module.exports =(drive)
