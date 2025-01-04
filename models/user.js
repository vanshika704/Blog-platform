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

userSchema.pre("save", async function (next){ // userschema ke ander humne pre method use kiya , mtlb , save krne se phle ye middleware chle , fir middleware ka use krke password ko hash kediyaaa
    if(this.isMofidied('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.matchPassword= async function (enteredPassword){ // yha bycrpt ka use krke hi password check krre h ki actual ke barabar h 
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
