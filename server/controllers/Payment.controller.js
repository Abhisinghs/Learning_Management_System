import catchAsynError from "../middlewares/catchAsynError.js";
import Payment from "../models/Payment.modal.js";
import User from "../models/User.modal.js";
import { instance } from "../server.js";
import ErrorHandler from "../utils/errorHandler.js";
import crypto from "crypto";

const buySubscription = catchAsynError(async (req, resp, next) => {
  const user = await User.findById(req.user._id);

  if (user.role === "admin")
    return next(new ErrorHandler("Admin Can't buy Subscription", 400));

  const plan_id = process.env.PLAIN_ID;

  const subscription = await instance.subscriptions.create({
    plan_id: plan_id,
    customer_notify: 1,
    total_count: 12,
  });

  user.subscription.id = subscription.id;
  user.subscription.status = subscription.status;

  await user.save();

  resp.status(201).json({
    success: true,
    subscriptionId: subscription.id,
  });
});

const paymentVerification = catchAsynError(async (req, resp, next) => {
  const { razorpay_signature, razorpay_payment_id, razorpay_subscription_id } =
    req.body;

  const user = await User.findById(req.user._id);

  const subscription_id = user.subscription.id;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(razorpay_payment_id + "|" + subscription_id, "utf-8")
    .digest("hex");

  const isAuthentic = generated_signature === razorpay_signature;

  if (!isAuthentic)
    return resp.redirect(`${process.env.FRONTEND_URL}/paymentfailed`);

  //database comes here
  await Payment.create({
    razorpay_payment_id,
    razorpay_signature,
    razorpay_subscription_id,
  });

  user.subscription.status = "active";

  await user.save();

  resp.redirect(
    `${process.env.FRONTEND_URL}/paymentsuccess?reference = ${razorpay_payment_id}`
    );
});

const getRazorpayKey = catchAsynError(async(req,resp,next)=>{
    resp.status(200).json({
        success:true,
        key:process.env.RAZORPAY_API_KEY,
    })
})

export { buySubscription, paymentVerification,getRazorpayKey };
