import express from 'express'
import {register,login, logout, getMyProfile } from '../controllers/User.controller.js';


const router = express.Router();


//To register a new user 
router.route('/register').post(register);

//Login
router.route('/login').post(login)

//Logout 
router.route('/logout').get(logout);


//get my profile
router.route('/me').get(getMyProfile);


export default router;