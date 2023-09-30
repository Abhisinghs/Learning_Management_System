import express from 'express'
<<<<<<< HEAD
import {register,login, logout, getMyProfile } from '../controllers/User.controller.js';
=======
import {register,login, logout } from '../controllers/User.controller.js';
>>>>>>> 23048b970767990faa8293acd487d3c7a36a6579


const router = express.Router();


//To register a new user 
router.route('/register').post(register);

//Login
router.route('/login').post(login)

//Logout 
router.route('/logout').get(logout);

<<<<<<< HEAD
//get my profile
router.route('/me').get(getMyProfile);
=======
//other pages
>>>>>>> 23048b970767990faa8293acd487d3c7a36a6579


export default router;