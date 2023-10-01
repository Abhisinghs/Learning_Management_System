import  catchAsynError  from "../middlewares/catchAsynError.js";
import User from "../models/User.modal.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";


const register= catchAsynError(async(req,resp,next)=>{
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
    const {email,password}=req.body;
    //const file = req.file;

    if(!email || !password )
      return next(new ErrorHandler("Please enter all fields",400));

    const user = await User.findOne({email}).select('+password');
    
    if(!user) return next(new ErrorHandler("User does not Exists",401));

    const isMatch = await user.comparePassword(password);

    if(!isMatch) 
      return next(new ErrorHandler("Incorrect Email or Password",401));

    sendToken(resp,user,`Welcome back,${user.name}`,200);
     
});

const logout = catchAsynError(async(req,resp,next)=>{
  resp.status(200).cookie("token",null,{
    expires:new Date(Date.now()),
  }).json({
    success:true,
    message:"Logged out Successfully",
  });

});


const getMyProfile = catchAsynError(async(req,resp,next)=>{
  
  const user = await User.findById(req.user._id);
  
  resp.status(200).json({
    success:true,
    user,
  });

});


const changePassword = catchAsynError(async(req,resp,next)=>{
  
 const {oldPassword,newPassword}=req.body;

 if(!oldPassword || !newPassword)
   return next(new ErrorHandler("Please enter all field",400));

 const user = await User.findById(req.user._id).select("+password");

 const isMatch=await user.comparePassword(oldPassword);

 if(!isMatch )
   return next(new ErrorHandler("Incorrect Old Password",400));

  user.password = newPassword;

  await user.save();
  
  resp.status(200).json({
    success:true,
    message:"Password Changed Successfully",
    
  });

});
 
const updateProfile = catchAsynError(async(req,resp,next)=>{
  
  const {name,email}=req.body;
 
  if(!name || !email)
    return next(new ErrorHandler("Please enter all field",400));
 
  const user = await User.findById(req.user._id);
  
  if(name) user.name=name;
  if(email) user.email= email;

  await user.save();
   
  resp.status(200).json({
    success:true,
    message:"Profile Updated Successfully",
     
  });
 
});

export {
  register,
  login,
  logout,
  getMyProfile,
  changePassword,
  updateProfile
} ;