import catchAsynError from "../middlewares/catchAsynError.js";
import User from "../models/User.modal.js";
import { instance } from "../server.js";
import ErrorHandler from "../utils/errorHandler.js";

const buySubscription = catchAsynError(async (req,resp,next)=>{
    const user = await User.findById(req.user._id);

    if(user.role==="admin")
      return next(new ErrorHandler("Admin Can't buy Subscription",400));

    const plan_id= process.env.PLAIN_ID;

    const subscription= await instance.subscriptions.create({
        plan_id: plan_id,
        customer_notify: 1,
        total_count: 12,
    })

    user.subscription.id= subscription.id;
    user.subscription.status= subscription.status;
})

export default buySubscription;