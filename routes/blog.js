import express from "express"
import  { createBlog, getBlogs } from '../controllers/blogcontroller.js';
const router = express.Router();

// Create a new blog
router.post('/', createBlog);

// Get all blogs
router.get('/', getBlogs);

export default router;
