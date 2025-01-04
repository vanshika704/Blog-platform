import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required:true,
    }
},{timestamps:true});

userSchema.pre("save", async function (next){
    if(this.isMofidied('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.matchPassword= async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
