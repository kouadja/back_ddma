const express = require("express");
const dotenv = require("dotenv")
const router = require("./src/Routes/userRoutes.js")
const { createProxyMiddleware } = require('http-proxy-middleware');
const connectDB = require("./src/config/db.js")

const cors = require('cors');


dotenv.config()
const PORT = process.env.PORT || 8080
const app = express();
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
app.use("/" ,router)
/* connectDB() */



   


app.listen(PORT,()=>{
    console.log("server runnig on port" + " " +PORT )
})
