import express from "express";
import { isAuthenticated } from "../middlewares/Auth.js";
import {buySubscription, cancelSubscription, getRazorpayKey, paymentVerification } from "../controllers/Payment.controller.js";

const router = express.Router();

//Buy Subscription
router.route('/subscribe').get(isAuthenticated,buySubscription);

//verify payment and save refrence in database
router.route('/paymentverification').post(isAuthenticated,paymentVerification);

//Get Razorpay key
router.route('/razorpaykey').get(getRazorpayKey);

//Cancel Subscription 
router.route('/subscribe/cancel').delete(isAuthenticated,cancelSubscription);

export default router;
