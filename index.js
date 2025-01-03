import express from "express";
import dotenv from "dotenv";
const rateLimit = require('express-rate-limit');
import connectDB from "./db/db.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes); // Use /api/auth for the authentication routes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
  });
  
  app.use(limiter); // Apply rate limiter to all routes
const postRoutes = require('./routes/posts');
app.use('/api/posts', postRoutes); // Use /api/posts for the blog post routes

app.listen(PORT, () => {
  connectDB()
  console.log(`http://localhost:${PORT}`);
});