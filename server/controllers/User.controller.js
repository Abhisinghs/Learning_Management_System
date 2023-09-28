import  catchAsynError  from "../middlewares/catchAsynError.js";
import User from "../models/User.modal.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";

const register = catchAsynError(async(req,resp,next)=>{
    const {name,email,password}=req.body;

    //const file = req.file;

    if(!name ||!email || !password )
      return next(new ErrorHandler("Please enter all fields",400));

    let user = await User.findOne({email});
    
    if(user) return next(new ErrorHandler("User Already Exist",409));

    //upload file on cloudinay 

    user = await User.create({
      name ,
      email,
      password,
      avatar:{
        public_id:"tempid",
        url:"tempurl",
      },
    });

    sendToken(resp,user,"Registered Successfully",201);
     
});


//logic for login 
const login = catchAsynError(async(req,resp,next)=>{
    const {name,email,password}=req.body;

    //const file = req.file;

    if(!name ||!email || !password )
      return next(new ErrorHandler("Please enter all fields",400));

    let user = await User.findOne({email});
    
    if(user) return next(new ErrorHandler("User Already Exist",409));

    //upload file on cloudinay 

    user = await User.create({
      name ,
      email,
      password,
      avatar:{
        public_id:"tempid",
        url:"tempurl",
      },
    });

    sendToken(resp,user,"Registered Successfully",201);
     
});

export {
  register,
  login
} ;