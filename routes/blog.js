import express from "express" // express import ki 
import  { createBlog, getBlogs } from '../controllers/blogcontroller.js';// controller ko call lgai kuki kaam toh vohi krega 
const router = express.Router(); // router ko call lgai 

// Create a new blog
router.post('/', createBlog); // ek post method define kiya jisme hum createBlog function ko call krenge

// Get all blogs
router.get('/', getBlogs); // ye getposts ko lgai call

export default router;
