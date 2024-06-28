
const { google } = require('googleapis');
const dotenv = require("dotenv")
dotenv.config()



const oauth2client = new google.auth.OAuth2({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri:   process.env.REDIRECRT_URI,
  
    
  })
  
  const credentials = {
    "access_token":"ya29.a0AXooCgtcBDt_sLm8vM6s4-RErE9cakmPreJhj9FXVewvCTWIai7K8x8tB9mJYwVVCPFP0qVgaKXA9fUf99KZ9Mt86vaJJqzIYipyjvINr6gZadIonqx27pE16mLVJ-G1q7pyteV3PY1dLSNLWNWq9jZSFUaYhMAlaDLEaCgYKAawSARISFQHGX2Mi18V8NaAADUL-YsxjDDEFXQ0171",
    "scope": ["https://www.googlya29.a0AXooCgs5SPgR3d5CgBNZMdhiSjKK-A8qWwi4lBY6kkysFn3otWGBA2g0nUjy9pRC8CYDZeZo6zwAvilTOSAhKq_W6E99TiyUDs9gr0LcKVKNYOnwQadqARtjmZEDrrlcKBw8BxqmmKO3HikoCkaYyZ02rT2Y9efhpPKwjwaCgYKAR8SARISFQHGX2MikD3zuGM6zeTIFsrJgv_EIw0173eapis.com/auth/drive"],
    "token_type": "Bearer",
    "expires_in": 3599,
    "refresh_token":"1//04G5jKKj6A_8gCgYIARAAGAQSNwF-L9IrrDzrhx_m_qUgczgE5TbVBBc6GBuNB_uAV980OYAM6iS-CcC9l64KzPn4aAsxTKYtcmI",
  
  };
  
  


  

  
  
  oauth2client.setCredentials(credentials)

  let drive = google.drive({
    version: 'v3',
    auth: oauth2client
  });

  module.exports =(drive)
