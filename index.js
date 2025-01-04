import express  from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import blogRoutes from './routes/blog.js';
import dotenv from "dotenv"
import connectDB from './db/db.js';
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
// Middleware
app.use(bodyParser.json());

connectDB();

// Routes
app.use('/api/blogs', blogRoutes);
app.get("/",(req,res)=>{
  res.send("Hello World");
})
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
