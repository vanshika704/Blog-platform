import mongoose from "mongoose"

// Define the post schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a method to check if 'AI' exists in the description
postSchema.methods.containsAI = function () {
  return /AI/i.test(this.description); // Case-insensitive match
};

module.exports = mongoose.model('Post', postSchema);
