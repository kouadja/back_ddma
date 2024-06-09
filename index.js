const express = require("express");
const dotenv = require("dotenv")
const http = require('http');
const socketIo = require('socket.io');
const routerUser = require("./src/Routes/userRoutes.js")
const routerProject = require("./src/Routes/projectRoutes.js")
const { createProxyMiddleware } = require('http-proxy-middleware');
const connectDB = require("./src/config/db.js")

const cors = require('cors');



dotenv.config()
const PORT = process.env.PORT || 8080
const app = express();
connectDB()
const server = http.createServer(app);
const io = socketIo(server);



// Handle socket connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
/* app.use('/', createProxyMiddleware({ target: 'http://localhost:5173', changeOrigin: true }));
 */
app.use(cors({
    origin: 'http://localhost:5173', // Remplacez par l'origine de votre client React
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/" ,routerUser)
app.use("/" ,routerProject)






   


app.listen(PORT,()=>{
    console.log("server runnig on port" + " " +PORT )
})
