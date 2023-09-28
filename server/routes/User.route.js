import express from 'express'
import {register,login } from '../controllers/User.controller.js';


const router = express.Router();


//To register a new user 
router.route('/register').post(register);

//Login
router.route('/login').post(login)


export default router;