import Blog from "../models/blog.js"; 

// Create a new blog
export const createBlog = async (req, res) => { // naya blog bnanae ki katha yha shuru hoti h
  try {
    const { title, description } = req.body; // define kiya ki phle title or description dega vo

    // Validate input
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required." }); // check bhi toh krenge na ki title description di bhi h ya ni
    }

    const newBlog = new Blog({ title, description }); // fir new blog bngya , usko db me save krwaya 
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
export const getBlogs = async (req, res) => { // fir ek katha likhi humne saare fetch krne ki . fetch krenge kaise???? btao btao
  try {
    const allBlogs = await Blog.find(); // find keyword ke sath or kaiseeeeeeeeeeeeeeeeee

    // Prioritize blogs containing "AI" in the description
    const sortedBlogs = [ // fir humne ek array define ki or fir humne spread  opterator lgaya h , jitne me ai word hoga phle saare vo lgenge 
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
