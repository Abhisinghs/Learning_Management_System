import mongoose, { Schema } from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken';

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
        required:[true,"Password enter your Password"],
        minLength:[6,"Password must be at least 6 characters"],
        select:false,
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user",
    },
    subscription:{
        id:String,
        status:String,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
    },
    playlist:[{
        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
        },
        poster:String
    }],
    createdAt:{
        type:Date,
        default:Date.now,
    },
    ResetPasswordToken:String,
    ResetPasswordExpire:String,

});

userSchema.method.getJWTToken = function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET,{
        expiresIn:"15d",
    });
}

//user modal 
const User = mongoose.model("UserData",userSchema);

//export modal 
export default User;