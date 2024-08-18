
const { google } = require('googleapis');
const dotenv = require("dotenv")
dotenv.config()



const oauth2client = new google.auth.OAuth2({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri:   process.env.REDIRECRT_URI,
  

    
  })
  
  const credentials = {
    "access_token":"ya29.a0AcM612zrVn9272RczWg5oJcIJHx4ed0y9IR51nIoMcoT05BocxvYXkdhMh_DsT-zAX5i0-xV0ZDnryOZYRjbRuwpJWoZLIz1xlw7NI6AIwtF1ksSzlOjfFcLNR1JmgV4OEhTQe2EIuVwoufbthdk_RMeNn-hjRTsdrgxccqgaCgYKAcUSARISFQHGX2MiMIOGyWeFPZ8iKUiIMphW6g0175",
    "scope": ["https://www.googlya29.a0AXooCgs5SPgR3d5CgBNZMdhiSjKK-A8qWwi4lBY6kkysFn3otWGBA2g0nUjy9pRC8CYDZeZo6zwAvilTOSAhKq_W6E99TiyUDs9gr0LcKVKNYOnwQadqARtjmZEDrrlcKBw8BxqmmKO3HikoCkaYyZ02rT2Y9efhpPKwjwaCgYKAR8SARISFQHGX2MikD3zuGM6zeTIFsrJgv_EIw0173eapis.com/auth/drive"],
    "token_type": "Bearer",
    "expires_in": 3599,
    "refresh_token":"1//04JGIbnNRWEsTCgYIARAAGAQSNwF-L9IrxqvaHvp0zlhtRTDQn5w6EWbYcYWsUd7NsKMSBE69B3GsqKXzW-XF8lNPgoFMgSVBtL4",
  
  };
  



  


  
  
  oauth2client.setCredentials(credentials)

  let drive = google.drive({
    version: 'v3',
    auth: oauth2client
  });

  module.exports =(drive)


  