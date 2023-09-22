import mongoose from "mongoose";
import validator from "validator";

//schema define 
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:validator.isEmail,
    },
    password:{
        type:String,
        required:[true,"Password enter your Password"]
    }
})

//user modal 
const User = mongoose.model("UserData",userSchema);

//export modal 
export default User;