import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const mongoURI = process.env.MONGO_URI;
const connectDB = async () => {
    try {
    
        await mongoose.connect(mongoURI, {
           
        });
        console.log("Connected to MongoDB Atlas! 🚀");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
       
    }
};

export default connectDB;