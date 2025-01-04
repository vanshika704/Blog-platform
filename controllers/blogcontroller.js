import Blog from "../models/blog.js"; // Correct import of Blog model

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate input
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required." });
    }

    const newBlog = new Blog({ title, description });
    await newBlog.save();

    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error creating blog",
      details: error.message,
    });
  }
};

// Get all blogs (with "AI" ranked on top)
export const getBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find();

    // Prioritize blogs containing "AI" in the description
    const sortedBlogs = [
      ...allBlogs.filter(blog => blog.description.toLowerCase().includes("ai")),
      ...allBlogs.filter(blog => !blog.description.toLowerCase().includes("ai")),
    ];

    res.status(200).json(sortedBlogs);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching blogs",
      details: error.message,
    });
  }
};
