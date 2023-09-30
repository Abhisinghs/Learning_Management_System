import { Jwt } from "jsonwebtoken";
import catchAsynError from "./catchAsynError";
import ErrorHandler from "../utils/errorHandler";


const isAuthenticated = catchAsynError(async (req,resp,next)=>{
    const {token}= req.cookies;

    if(!token) return next(new ErrorHandler("Not Logged IN",401))

    const decoded = jwt.verify(token.process.evn.JWT_SECRET);

    req.user = await User.findById(decoded._id);

    next();
})