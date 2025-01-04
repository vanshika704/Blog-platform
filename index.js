import express  from 'express'; // Import express
import bodyParser from 'body-parser';// bodyparser ek middleware h jisko humne import kiya json data parse krne ke liye 
import blogRoutes from './routes/blog.js'; // blog ka route import kiya
import userRoutes from './routes/auth.js'; // user ka route import kiya
import dotenv from "dotenv" // ye toh humara dot env bhai h
import connectDB from './db/db.js'; // or ye saare fasad ki jad h
const app = express(); // express ko app me call lgai taaki ab app use kren baar baar express na likhe
const PORT = process.env.PORT || 5000; // port define kiya
dotenv.config(); // dotenv ko configure kiya
// Middleware
app.use(bodyParser.json());// bodyparser use kiya json ke liye for whole application

connectDB();// db bulaya

// Routes
app.use('/api/blogs', blogRoutes);//  blog ka route bnaya
app.get("/",(req,res)=>{
  res.send("Hello World");
})
app.use('/api/auth', userRoutes); // auth route
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);// app.listen to start the server 
});
