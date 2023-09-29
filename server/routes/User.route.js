import express from 'express'
import {register,login, logout } from '../controllers/User.controller.js';


const router = express.Router();


//To register a new user 
router.route('/register').post(register);

//Login
router.route('/login').post(login)

//Logout 
router.route('/logout').get(logout);


export default router;