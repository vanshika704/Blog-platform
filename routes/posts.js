// import express from "express"
// import {Post} from "../models/Post.js"

// import jwt from "jsonwebtoken"
// const router = express.Router();

// // Middleware to verify JWT and get user info
// const protect = async (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Add user data to request
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// // Create a post
// router.post('/create', protect, async (req, res) => {
//   const { title, description } = req.body;

//   if (!title || !description) {
//     return res.status(400).json({ message: 'Title and description are required' });
//   }

//   try {
//     const newPost = new Post({
//       title,
//       description,
//       author: req.user.id, // Associate post with the logged-in user
//     });

//     await newPost.save();
//     res.status(201).json({ message: 'Post created successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Get all posts, sorted by posts containing 'AI' at the top
// router.get('/all', async (req, res) => {
//   try {
//     // Get all posts and sort them by whether they contain 'AI' in the description
//     const posts = await Post.find()
//       .populate('author', 'username email') // Populate author info
//       .sort({ description: /AI/i ? -1 : 1, createdAt: -1 }); // Sort by 'AI' and then by creation date

//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Get posts by a specific user
// router.get('/user/:id', async (req, res) => {
//   try {
//     const posts = await Post.find({ author: req.params.id })
//       .populate('author', 'username email')
//       .sort({ createdAt: -1 });

//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Edit a post
// router.put('/edit/:id', protect, async (req, res) => {
//     const { title, description } = req.body;
    
//     if (!title && !description) {
//       return res.status(400).json({ message: 'Please provide a title or description to update' });
//     }
  
//     try {
//       // Find the post by ID
//       const post = await Post.findById(req.params.id);
  
//       // Check if post exists
//       if (!post) {
//         return res.status(404).json({ message: 'Post not found' });
//       }
  
//       // Check if the logged-in user is the author of the post
//       if (post.author.toString() !== req.user.id) {
//         return res.status(403).json({ message: 'You are not authorized to edit this post' });
//       }
  
//       // Update the post fields
//       if (title) post.title = title;
//       if (description) post.description = description;
  
//       await post.save(); // Save the updated post
  
//       res.json({ message: 'Post updated successfully', post });
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });

//   // Delete a post
// router.delete('/delete/:id', protect, async (req, res) => {
//     try {
//       // Find the post by ID
//       const post = await Post.findById(req.params.id);
  
//       // Check if post exists
//       if (!post) {
//         return res.status(404).json({ message: 'Post not found' });
//       }
  
//       // Check if the logged-in user is the author of the post
//       if (post.author.toString() !== req.user.id) {
//         return res.status(403).json({ message: 'You are not authorized to delete this post' });
//       }
  
//       // Delete the post
//       await post.remove();
  
//       res.json({ message: 'Post deleted successfully' });
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
//   // Search posts by keyword in title or description
// router.get('/search', async (req, res) => {
//     const { query } = req.query;
  
//     if (!query) {
//       return res.status(400).json({ message: 'Search query is required' });
//     }
  
//     try {
//       // Perform a case-insensitive search for the query in the title and description
//       const posts = await Post.find({
//         $or: [
//           { title: { $regex: query, $options: 'i' } },
//           { description: { $regex: query, $options: 'i' } },
//         ],
//       })
//         .populate('author', 'username email')
//         .sort({ createdAt: -1 });
  
//       if (posts.length === 0) {
//         return res.status(404).json({ message: 'No posts found' });
//       }
  
//       res.json(posts);
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
  
// // Get all posts with pagination
// router.get('/all', async (req, res) => {
//     const page = parseInt(req.query.page) || 1; // Default to page 1
//     const limit = parseInt(req.query.limit) || 10; // Default to 10 posts per page
//     const skip = (page - 1) * limit; // Calculate the number of posts to skip
  
//     try {
//       const posts = await Post.find()
//         .populate('author', 'username email')
//         .sort({ description: /AI/i ? -1 : 1, createdAt: -1 })
//         .skip(skip)
//         .limit(limit); // Apply pagination
  
//       const totalPosts = await Post.countDocuments(); // Get the total number of posts
//       const totalPages = Math.ceil(totalPosts / limit); // Calculate total pages
  
//       res.json({
//         posts,
//         pagination: {
//           totalPosts,
//           totalPages,
//           currentPage: page,
//           postsPerPage: limit,
//         },
//       });
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
    
  
// module.exports = router;
