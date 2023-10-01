import express from 'express'
import {register,login, logout, getMyProfile, changePassword, updateProfile } from '../controllers/User.controller.js';
import isAuthenticated from '../middlewares/Auth.js';


const router = express.Router();


//To register a new user 
router.route('/register').post(register);

//Login
router.route('/login').post(login)

//Logout 
router.route('/logout').get(logout);


//get my profile
router.route('/me').get(isAuthenticated, getMyProfile);

//change password
router.route('/changepassword').put(isAuthenticated, changePassword);



export default router;