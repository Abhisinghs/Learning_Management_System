import  catchAsynError  from "../middlewares/catchAsynError.js";
import User from "../models/User.modal.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendEmail from "../utils/sendEmail.js";
import sendToken from "../utils/sendToken.js";


//logic for register user 
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

// logic for logout
const logout = catchAsynError(async(req,resp,next)=>{
  resp.status(200).cookie("token",null,{
    expires:new Date(Date.now()),
  }).json({
    success:true,
    message:"Logged out Successfully",
  });

});


//Logic for get profile data
const getMyProfile = catchAsynError(async(req,resp,next)=>{
  
  const user = await User.findById(req.user._id);
  
  resp.status(200).json({
    success:true,
    user,
  });

});


// logic for change password 
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
 

// logic for update details 
const updateProfile = catchAsynError(async(req,resp,next)=>{
  
  const {name,email}=req.body;
 
  const user = await User.findById(req.user._id);
  
  if(name) user.name=name;
  if(email) user.email= email;

  await user.save();
   
  resp.status(200).json({
    success:true,
    message:"Profile Updated Successfully",
     
  });
 
});



// update profile picture 
const updateProfilePicture = catchAsynError(async(req,res,next)=>{

  //cloudinary todo

  res.status(200).json({
    success:true,
    message:"Profile Picture Updated Successfully"
  })
})



//forget password logic 
const forgetPassword = catchAsynError(async(req,res,next)=>{

  const {email} = req.body;

  const user = await User.findOne({email});

  if(!user)
    return next(new ErrorHandler("User not found",400));

  const resetToken= await user.getResetToken();

  const url=`${process.env.FRONTEND_URL}/resetpassword/${resetToken}`
   
  const message = `Click on the link to reset your password. ${url}. If you have not request then please ignore.`


  //send token via email 
  await sendEmail(user.email,"LearnHub Reset Password",message);

  res.status(200).json({
    success:true,
    message:`Reset Token has been sent to ${user.email}`,
  })
})


const resetPassword = catchAsynError(async(req,res,next)=>{

  const {token}= req.params;

  res.status(200).json({
    success:true,
    message:"Profile Picture Updated Successfully",
    token
  })
})

export {
  register,
  login,
  logout,
  getMyProfile,
  changePassword,
  updateProfile,
  updateProfilePicture,
  forgetPassword,
  resetPassword
} ;