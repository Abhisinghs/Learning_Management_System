import express from "express";
import { isAuthenticated } from "../middlewares/Auth.js";
import buySubscription, { paymentVerification } from "../controllers/Payment.controller.js";

const router = express.Router();

//Buy Subscription
router.route('/subscribe').get(isAuthenticated,buySubscription);

//Payment verification
router.route('/paymentverification').post(isAuthenticated,paymentVerification);

export default router;
