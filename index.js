const express = require("express");
const dotenv = require("dotenv")
const http = require('http');
const {Server} = require('socket.io');
const routerUser = require("./src/Routes/userRoutes.js")
const routerProject = require("./src/Routes/projectRoutes.js")
const routerDrive= require("./src/Routes/driveRoute.js")
const routerFile= require("./src/Routes/fileRoutes.js")
const routerFolder= require("./src/Routes/folderRoutes.js")
const routerApprovals= require("./src/Routes/approvalRoutes.js")
const routerCompaign= require("./src/Routes/campaignRoutes.js")


const { createProxyMiddleware } = require('http-proxy-middleware');
const connectDB = require("./src/config/db.js")
const cors = require('cors');
const fs = require("fs")
const User = require("./src/Models/user.js");

const Message = require('./src/Models/message.js');
const Project = require('./src/Models/project.js');



const app = express();
const server = http.createServer(app)

const io = new Server(server,{
cors : {

  origin: 'http://localhost:5173', // Remplacez par l'origine de votre client React(très important)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}
})
const users = {};
io.on("connection",socket=>{

   // Associer l'utilisateur à la socket
   socket.on('register', async userId => {
    const user = await User.findById(userId);
    if (user) {
 
        users[userId] = socket.id;
    } else {
        console.log('User not found');
    }
});
socket.on('sendMessageToUser', async ({ from, to, project, message }) => {

  const newMessage = new Message({ from, to, project, message });

  // Sauvegarde du message dans MongoDB
  await newMessage.save();
  const recipientSocketId = users[to];
  if (recipientSocketId) {
      // Envoyer le message à l'utilisateur spécifié
      io.to(recipientSocketId).emit('message', { from, message });
  }
});



  socket.on("send_message",data=>{
    console.log(data)
    socket.broadcast.emit("receive_message",{data:data,userId:socket.id})
  })

  socket.on("approuve",(data)=>{
    console.log(data)

    socket.broadcast.emit("response_approuve",data)
  })




})










dotenv.config()
const PORT = process.env.PORT || 8080

connectDB()






















/* app.use('/', createProxyMiddleware({ target: 'http://localhost:5173', changeOrigin: true }));
 */
app.use(cors({
    origin: 'http://localhost:5173', // Remplacez par l'origine de votre client React(très important)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/" ,routerUser)
app.use("/" ,routerProject)
app.use("/" ,routerDrive)
app.use("/" ,routerFile)
app.use("/" ,routerFolder)
app.use("/" ,routerApprovals)
app.use("/" ,routerCompaign)







   


server.listen(PORT,()=>{
    console.log("server runnig on port" + " " +PORT )
})
