import catchAsynError from "../middlewares/catchAsynError.js";
import stats from "../models/Stats.modal.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendEmail from "../utils/sendEmail.js";

const contact= catchAsynError(async(req,resp,next)=>{

    const {name,email,message}=req.body;

    if(!name || !email || !message) 
        return next(new ErrorHandler("All Fields are madetory",401));

    const to=process.env.MY_MAIL;

    const subject="Contact From LearnHub";
    const text=`I am ${name} and my Email is ${email}. \n ${message}`;

    await sendEmail(to,subject,text);

    resp.status(200).json({
        success:true,
        message:"Your Message has been sent."
    })
})

const courseRequest= catchAsynError(async(req,resp,next)=>{
    const {name,email,course}=req.body;

    if(!name || !email || !course) 
        return next(new ErrorHandler("All Fields are madetory",401));

    const to=process.env.MY_MAIL;

    const subject="Request for a course on LearnHub";
    const text=`I am ${name} and my Email is ${email}. \n ${course}`;

    await sendEmail(to,subject,text);

    resp.status(200).json({
        success:true,
        message:"Your Request has been sent."
    })
});

const getDashboardStats = catchAsynError(async(req,resp,next)=>{
    
    const stats=await stats.find({}).sort({createdAt:"desc"}).limit(12);

    resp.status(200).json({

    })
})

export {
    contact,
    courseRequest,
    getDashboardStats,
}