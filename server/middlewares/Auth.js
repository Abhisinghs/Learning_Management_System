import  jwt from "jsonwebtoken";
import catchAsynError from "./catchAsynError.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/User.modal.js";


const isAuthenticated = catchAsynError(async (req,resp,next)=>{
    const {token}= req.cookies;

    if(!token) return next(new ErrorHandler("Not Logged IN",401))

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);

    next();
})

export default isAuthenticated;