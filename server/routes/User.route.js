import express from "express";
import {
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
} from "../controllers/User.controller.js";
import {isAuthenticated} from "../middlewares/Auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

//To register a new user
router.route("/register").post(singleUpload,register);

//Login
router.route("/login").post(login);

//Logout
router.route("/logout").get(logout);

//get my profile
router.route("/me").get(isAuthenticated, getMyProfile);

//change password
router.route("/changepassword").put(isAuthenticated, changePassword);

//update profile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

//update profile picture
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, updateProfilePicture);

//forgot password
router.route("/forgetpassword").post(forgetPassword);

//reset password
router.route("/resetpassword/:token").put(resetPassword);

//add to playlist 
router.route("/addtoplaylist").post(isAuthenticated,addToPlaylist);

//remove from playlist
router.route("/removefromplaylist").delete(isAuthenticated,removeFromPlaylist);

export default router;
