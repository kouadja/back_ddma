const express = require("express");
const dotenv = require("dotenv")
const http = require('http');
const {Server} = require('socket.io');
const routerUser = require("./src/Routes/userRoutes.js")
const routerProject = require("./src/Routes/projectRoutes.js")
const { createProxyMiddleware } = require('http-proxy-middleware');
const connectDB = require("./src/config/db.js")
const cors = require('cors');
const fs = require("fs")



const app = express();
const server = http.createServer(app)

const io = new Server(server,{
cors : {

  origin: 'http://localhost:5173', // Remplacez par l'origine de votre client React(très important)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}
})
io.on("connection",socket=>{
  
  console.log(`connected user ${socket.id}`)

  socket.on("approuve",(data)=>{

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






   


server.listen(PORT,()=>{
    console.log("server runnig on port" + " " +PORT )
})
