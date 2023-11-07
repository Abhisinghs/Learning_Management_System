import catchAsynError from "../middlewares/catchAsynError.js";
import User from "../models/User.modal.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendEmail from "../utils/sendEmail.js";
import sendToken from "../utils/sendToken.js";
import crypto from "crypto";
import Course from "../models/Course.modal.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import stats from "../models/Stats.modal.js";

//logic for register user
const register = catchAsynError(async (req, resp, next) => {
  const { name, email, password } = req.body;
  const file = req.file;

  if (!name || !email || !password || !file)
    return next(new ErrorHandler("Please enter all fields", 400));

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exist", 409));

  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  sendToken(resp, user, "Registered Successfully", 201);
});

//logic for login
const login = catchAsynError(async (req, resp, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please enter all fields", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("User does not Exists", 401));

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return next(new ErrorHandler("Incorrect Email or Password", 401));

  sendToken(resp, user, `Welcome back,${user.name}`, 200);
});

// logic for logout
const logout = catchAsynError(async (req, resp, next) => {
  resp
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged out Successfully",
    });
});

//Logic for get profile data
const getMyProfile = catchAsynError(async (req, resp, next) => {
  const user = await User.findById(req.user._id);

  resp.status(200).json({
    success: true,
    user,
  });
});

// logic for change password
const changePassword = catchAsynError(async (req, resp, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    return next(new ErrorHandler("Please enter all field", 400));

  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.comparePassword(oldPassword);

  if (!isMatch) return next(new ErrorHandler("Incorrect Old Password", 400));

  user.password = newPassword;

  await user.save();

  resp.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
});

// logic for update details
const updateProfile = catchAsynError(async (req, resp, next) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user._id);

  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();

  resp.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
  });
});

// update profile picture
const updateProfilePicture = catchAsynError(async (req, res, next) => {
  const file = req.file;
  const user = await User.findById(req.user._id);
  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  user.avatar = {
    public_id: mycloud.public_id,
    url: mycloud.secure_url,
  };

  res.status(200).json({
    success: true,
    message: "Profile Picture Updated Successfully",
  });
});

//forget password logic
const forgetPassword = catchAsynError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new ErrorHandler("User not found", 400));

  const resetToken = await user.getResetToken();

  await user.save();

  const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  const message = `Click on the link to reset your password. ${url}. If you have not request then please ignore.`;

  //send token via email
  await sendEmail(user.email, "LearnHub Reset Password", message);

  res.status(200).json({
    success: true,
    message: `Reset Token has been sent to ${user.email}`,
  });
});


//logic for reset password
const resetPassword = catchAsynError(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user)
    return next(new ErrorHandler("Token is invalid or has been expired"));

  if (!req.body.password)
    return next(new ErrorHandler("please enter new password"));
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  user.save();

  res.status(200).json({
    success: true,
    message: "Password Changed successfully",
    token,
  });
});


//add to playlist logic
const addToPlaylist = catchAsynError(async (req, resp, next) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.body.id);

  if (!course) return next(ErrorHandler("Invalid Course Id", 404));

  const itemExist = user.playlist.find((item) => {
    if (item.course.toString() === course._id.toString()) return true;
  });

  if (itemExist) return next(new ErrorHandler("Item Already Exist", 409));

  user.playlist.push({
    course: course._id,
    poster: course.poster.url,
  });

  await user.save();

  resp.status(200).json({
    success: true,
    message: "Added To Playlist",
  });
});


//remove from playlist logic 
const removeFromPlaylist = catchAsynError(async (req, resp, next) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.query.id);
  if (!course) return next(ErrorHandler("Invalid Course Id", 404));

  const newPlaylist = user.playlist.filter((item) => {
    if (item.course.toString() != course._id.toString()) return item;
  });

  user.playlist = newPlaylist;
  await user.save();

  resp.status(200).json({
    success: true,
    message: "Remove From Playlist",
  });
});

//Admin controllers
const getAllUsers = catchAsynError(async (req, resp, next) => {
  const users = await User.find({});

  resp.status(200).json({
    success: true,
    users,
  });
});


//Update user role 
const updateUserRole = catchAsynError(async (req, resp, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("User Not Found", 404));

  if (user.role === "user") user.role = "admin";
  else user.role = "user";

  await user.save();

  resp.status(200).json({
    success: true,
    message: "Role update Successfully",
  });
});

const deleteUser = catchAsynError(async (req, resp, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("User not found", 404));

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  //cancel subscription

  user.remove();
  await user.save();

  resp.status(200).cookie("token",null,{
    expires:new Date(Date.now()),
  }).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

const deleteMyProfile = catchAsynError(async (req, resp, next) => {
  const user = await User.findById(req.user._id);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  //cancel subscription

  await user.deleteOne(req.user._id);

  resp
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User Deleted Successfully",
    });
});

//time to time check
User.watch().on("change",async()=>{
  const Stats = await stats.find({}).sort({createdAt:"desc"}).limit(1);

  const subscription= await User.find({"subscription.status":"active"});

  Stats[0].users=await User.countDocuments();
  Stats[0].subscriptions=subscription.length;
  Stats[0].createdAt= new Date(Date.now());

   await Stats[0].save();
});

export {
  register,
  login,
  logout,
  getMyProfile,
  changePassword,
  updateProfile,
  updateProfilePicture,
  forgetPassword,
  resetPassword,
  addToPlaylist,
  removeFromPlaylist,
  getAllUsers,
  updateUserRole,
  deleteUser,
  deleteMyProfile,
};
