
const { google } = require('googleapis');
const dotenv = require("dotenv")
dotenv.config()



const oauth2client = new google.auth.OAuth2({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri:   process.env.REDIRECRT_URI,
  
    
  })
  
  const credentials = {
    "access_token":"ya29.a0AXooCguJ6bxT5jM6BKkqPb28wESxgugy7-j6hySUyhRb8_Za5sL_njotWwHAMTD4uWdIZPjF5-vZfo5KexgKhg_sOW1uSzgTKbzlBZI0yu97qEawBoPVbg6VMwE7gURzvEDPqV_rANcuCCGRCRNX39Q1-aaNpDmHVTUYaCgYKAaQSARISFQHGX2MiZ31y4PzBa5t07kXabULrLw0171",
    "scope": ["https://www.googlya29.a0AXooCgs5SPgR3d5CgBNZMdhiSjKK-A8qWwi4lBY6kkysFn3otWGBA2g0nUjy9pRC8CYDZeZo6zwAvilTOSAhKq_W6E99TiyUDs9gr0LcKVKNYOnwQadqARtjmZEDrrlcKBw8BxqmmKO3HikoCkaYyZ02rT2Y9efhpPKwjwaCgYKAR8SARISFQHGX2MikD3zuGM6zeTIFsrJgv_EIw0173eapis.com/auth/drive"],
    "token_type": "Bearer",
    "expires_in": 3599,
    "refresh_token":"1//048zfLqEZT6nxCgYIARAAGAQSNwF-L9Irzo0pxI10nVfiSsKHw1UEfR02JUa9vFOWdHwPV01kKSEtvT0lqbDrj1yN6xYoFjZmHS4",
  
  };
  
  


  


  
  
  oauth2client.setCredentials(credentials)

  let drive = google.drive({
    version: 'v3',
    auth: oauth2client
  });

  module.exports =(drive)
