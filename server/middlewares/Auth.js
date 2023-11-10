import jwt from "jsonwebtoken";
import catchAsynError from "./catchAsynError.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/User.modal.js";


//Authentication logic 
const isAuthenticated = catchAsynError(async (req, resp, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Not Logged IN", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);

  next();
});


//authorisation logic 
const authorizedSubscribers = (req, resp, next) => {
  if (  req.user.subscription.status !=='active'  && req.user.role !== "admin")
    return next(
      new ErrorHandler(
        `Only Subscribers can access this resources`,
        403
      )
    );
    next();
};

//authorisation logic for user and admin role
const authorizedAdmin = (req, resp, next) => {
  if (req.user.role !== "admin")
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resources`,
        403
      )
    );
    next();
};


//export all the module
export {isAuthenticated,authorizedAdmin,authorizedSubscribers}
