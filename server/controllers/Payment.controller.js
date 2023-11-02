import catchAsynError from "../middlewares/catchAsynError.js";
import Payment from "../models/Payment.modal.js";
import User from "../models/User.modal.js";
import { instance } from "../server.js";
import ErrorHandler from "../utils/errorHandler.js";
import crypto from "crypto";

//logic for buy subscription
const buySubscription = catchAsynError(async (req, resp, next) => {
  //find user in database
  const user = await User.findById(req.user._id);

  //role admin no need to buy subscription
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

  //save detail in database
  await user.save();

  resp.status(201).json({
    success: true,
    subscriptionId: subscription.id,
  });
});

//logic for payment verification
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

  //save in database
  await user.save();

  resp.redirect(
    `${process.env.FRONTEND_URL}/paymentsuccess?reference = ${razorpay_payment_id}`
  );
});

const getRazorpayKey = catchAsynError(async (req, resp, next) => {
  resp.status(200).json({
    success: true,
    key: process.env.RAZORPAY_API_KEY,
  });
});


const cancelSubscription = catchAsynError(async (req, resp, next) => {

  const user= await User.findById(req.user._id);

  const subscriptionId= user.subscription.id;
  let refund= false;

  await instance.subscriptions.cancel(subscriptionId);

  // const payment = await Payment.findOne({
  //   razorpay_subscription_id:subscriptionId,
  // })

  // const gap = Date.now()-payment.createdAt;

  // const refundTime= process.env.REFUND_DAYS*24*60*60*1000;

  // if(refundTime>gap){
  //  // await instance.payments.refund(payment.razorpay_payment_id);
  //   refund = true;
  // }

  // await payment.remove();
  user.subscription.id= undefined;
  user.subscription.status= undefined;
  user.save();
  
  resp.status(200).json({
    success: true,
    message:
    refund?"Subscription Cancelled, You will receive full refund within 7 days."
    :"Subscription Cancelled, Now refund initiated as subscription was cancelled after 7 days."
  });
});

export { buySubscription, paymentVerification, getRazorpayKey,cancelSubscription };
