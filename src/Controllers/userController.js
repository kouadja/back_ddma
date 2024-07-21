const bcrypt = require('bcryptjs');
const User = require('../Models/user');
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv")
const jwt = require('jsonwebtoken');
const { google } = require('googleapis');
dotenv.config()



const generateAccesToken =(jsonData,options ={})=>{
    const secretKey = process.env.JWT_SECRET ;
    const token = jwt.sign(jsonData,secretKey,options)
    /* console.log(token) */
    return token
  }

/* exports.loginContoller = async (req,res)=>{
    try {
        const {password,email} = req.body
        const existingUser = await User.findOne({ email });
       
        
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log("ErreurMonu : " + error)
        
    }
 


} */

exports.loginContoller = async (req, res) => {
    try {
   
        const body = req.body;
        const { email, password } = req.body;
        if (!email || !password) {
          
        return res.status(400).json({ message: 'email and password are required' });
      }
      const saltRounds = 10;

      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const data = {...body,password:hashedPassword,}

      const existingUser = await User.findOne({ email });
      console.log("existingUser")
      if (existingUser) {
        return res.status(400).json({ message: "L'email existe déjà." });
      }
      
      
      const user = new User(data);

      // Sauvegardez l'utilisateur dans la base de données
      await user.save();
  

     return res.status(201).header('Authorization', 'Bearer ' + generateAccesToken(data)).json(user,...generateAccesToken(data));

    } catch (error) {

      res.status(500).json({ error: error });

    }
  }
  

 
  exports.login = async (req, res) => {
  
    try {
        const { email, password } = req.body;
        console.log(password)

        const user = await User.findOne({ email }).populate("roles");
 
        if (!user) {
          return res.status(401).json({ error: "Utilisateur non trouvé " });
        }

        const userRole = user.roles[0].name
        console.log(userRole)
        const match = await bcrypt.compare(password, user.password);
        console.log(match)
        if(!match){

   
        return res.status(401).json({ error: "Mot de passe ou e-mail est incorrecte " });
      }
     
    
        if(userRole){
        
          const accessToken= generateAccesToken({password:password})
          

          return res.json({role:userRole,user:user});

        }else if(userRole &&  !match){
          return res.status(401).json({ error: "Mot de passe incorrect" });
        }else if(userRole &&  !match){
          return res.status(401).json({ error: "Mot de passe incorrect" });
        }


       
    
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return res.status(401).json({ error: "Mot de passe incorrect" });
      }
    }
};
